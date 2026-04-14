"""
API Routes
Defines all REST API endpoints for the system
"""

from flask import Blueprint, jsonify, request
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.yield_predictor import YieldPredictor
from models.crop_recommender import CropRecommender
from models.advisory_engine import AdvisoryEngine
from utils.data_processor import DataProcessor
from utils.weather_api import WeatherService
from config import CROPS, SOIL_TYPES, SEASONS

# Initialize services
yield_predictor = None
crop_recommender = None
advisory_engine = None
data_processor = None
weather_service = None


def get_services():
    """Lazy initialization of services"""
    global yield_predictor, crop_recommender, advisory_engine, data_processor, weather_service
    
    if yield_predictor is None:
        print("Initializing prediction models...")
        yield_predictor = YieldPredictor()
        crop_recommender = CropRecommender()
        advisory_engine = AdvisoryEngine()
        data_processor = DataProcessor()
        weather_service = WeatherService()
        print("Models initialized successfully!")
    
    return {
        'yield_predictor': yield_predictor,
        'crop_recommender': crop_recommender,
        'advisory_engine': advisory_engine,
        'data_processor': data_processor,
        'weather_service': weather_service
    }


def register_routes(app):
    """Register all API routes with the Flask app"""
    
    api = Blueprint('api', __name__, url_prefix='/api')
    
    # ==================== Prediction Endpoints ====================
    
    @api.route('/predict', methods=['POST'])
    def predict_yield():
        """
        Predict crop yield based on input parameters.
        
        Expected JSON body:
        {
            "crop": "Rice",
            "area": 5.0,
            "soil_type": "Alluvial",
            "temperature": 28,
            "rainfall": 1200,
            "humidity": 75,
            "ph": 6.5,
            "nitrogen": 80,
            "phosphorus": 40,
            "potassium": 100,
            "fertilizer_used": 150
        }
        """
        services = get_services()
        
        try:
            data = request.get_json()
            
            if not data:
                return jsonify({'error': 'No input data provided'}), 400
            
            # Validate input
            is_valid, errors = services['data_processor'].validate_input(data)
            if not is_valid:
                return jsonify({'error': 'Validation failed', 'details': errors}), 400
            
            # Prepare data with defaults
            prepared_data = services['data_processor'].prepare_for_prediction(data)
            
            # Make prediction
            result = services['yield_predictor'].predict(prepared_data)
            
            return jsonify({
                'success': True,
                'prediction': result,
                'input': prepared_data
            })
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @api.route('/predict/batch', methods=['POST'])
    def predict_batch():
        """Predict yields for multiple inputs"""
        services = get_services()
        
        try:
            data = request.get_json()
            
            if not data or 'inputs' not in data:
                return jsonify({'error': 'No inputs provided'}), 400
            
            results = []
            for idx, input_data in enumerate(data['inputs']):
                try:
                    prepared = services['data_processor'].prepare_for_prediction(input_data)
                    prediction = services['yield_predictor'].predict(prepared)
                    results.append({
                        'index': idx,
                        'success': True,
                        'prediction': prediction
                    })
                except Exception as e:
                    results.append({
                        'index': idx,
                        'success': False,
                        'error': str(e)
                    })
            
            return jsonify({
                'success': True,
                'results': results,
                'total': len(results)
            })
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    # ==================== Recommendation Endpoints ====================
    
    @api.route('/recommend', methods=['POST'])
    def recommend_crops():
        """
        Get crop recommendations based on conditions.
        
        Expected JSON body:
        {
            "temperature": 28,
            "rainfall": 1200,
            "humidity": 75,
            "ph": 6.5,
            "nitrogen": 80,
            "phosphorus": 40,
            "potassium": 100
        }
        """
        services = get_services()
        
        try:
            data = request.get_json()
            
            if not data:
                return jsonify({'error': 'No conditions provided'}), 400
            
            # Required fields for recommendation
            required = ['temperature', 'rainfall', 'ph', 'nitrogen', 'phosphorus', 'potassium']
            missing = [f for f in required if f not in data]
            
            if missing:
                return jsonify({
                    'error': 'Missing required fields',
                    'missing': missing
                }), 400
            
            # Get recommendations
            n_recommendations = data.get('n_recommendations', 5)
            recommendations = services['crop_recommender'].recommend(data, n_recommendations)
            
            return jsonify({
                'success': True,
                'conditions': data,
                'recommendations': recommendations
            })
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    # ==================== Advisory Endpoints ====================
    
    @api.route('/advisory', methods=['GET'])
    def get_advisory():
        """Get general seasonal advisory"""
        services = get_services()
        
        try:
            season = request.args.get('season')
            advisory = services['advisory_engine'].get_seasonal_advisory(season)
            
            return jsonify({
                'success': True,
                'advisory': advisory
            })
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @api.route('/advisory/crop/<crop_name>', methods=['GET', 'POST'])
    def get_crop_advisory(crop_name):
        """Get advisory for a specific crop"""
        services = get_services()
        
        try:
            conditions = None
            if request.method == 'POST':
                conditions = request.get_json()
            
            advisory = services['advisory_engine'].get_crop_advisory(crop_name, conditions)
            
            if 'error' in advisory:
                return jsonify({'success': False, 'error': advisory['error']}), 400
            
            return jsonify({
                'success': True,
                'advisory': advisory
            })
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @api.route('/advisory/comprehensive', methods=['POST'])
    def get_comprehensive_advisory():
        """Get comprehensive advisory for farmer's situation"""
        services = get_services()
        
        try:
            data = request.get_json()
            
            if not data:
                return jsonify({'error': 'No farmer data provided'}), 400
            
            advisory = services['advisory_engine'].generate_comprehensive_advisory(data)
            
            return jsonify({
                'success': True,
                'advisory': advisory
            })
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @api.route('/advisory/fertilizer', methods=['POST'])
    def get_fertilizer_plan():
        """Get fertilizer recommendation"""
        services = get_services()
        
        try:
            data = request.get_json()
            
            crop = data.get('crop')
            area = data.get('area', 1.0)
            soil_test = data.get('soil_test')
            
            if not crop:
                return jsonify({'error': 'Crop name required'}), 400
            
            recommendation = services['advisory_engine'].get_fertilizer_recommendation(
                crop, area, soil_test
            )
            
            if 'error' in recommendation:
                return jsonify({'success': False, 'error': recommendation['error']}), 400
            
            return jsonify({
                'success': True,
                'recommendation': recommendation
            })
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @api.route('/advisory/pest', methods=['POST'])
    def get_pest_info():
        """Get pest identification and management info"""
        services = get_services()
        
        try:
            data = request.get_json()
            
            crop = data.get('crop')
            symptoms = data.get('symptoms', [])
            
            if not crop:
                return jsonify({'error': 'Crop name required'}), 400
            
            pest_info = services['advisory_engine'].get_pest_alert(crop, symptoms)
            
            return jsonify({
                'success': True,
                'pest_info': pest_info
            })
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @api.route('/advisory/tip', methods=['GET'])
    def get_daily_tip():
        """Get daily farming tip"""
        services = get_services()
        
        try:
            tip = services['advisory_engine'].get_daily_tip()
            return jsonify({
                'success': True,
                'tip': tip
            })
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    # ==================== Weather Endpoints ====================
    
    @api.route('/weather', methods=['GET'])
    def get_weather():
        """Get current weather for a location"""
        services = get_services()
        
        try:
            location = request.args.get('location', 'Delhi')
            weather = services['weather_service'].get_current_weather(location)
            
            return jsonify({
                'success': True,
                'weather': weather
            })
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @api.route('/weather/forecast', methods=['GET'])
    def get_forecast():
        """Get weather forecast"""
        services = get_services()
        
        try:
            location = request.args.get('location', 'Delhi')
            days = int(request.args.get('days', 7))
            
            forecast = services['weather_service'].get_forecast(location, days)
            
            return jsonify({
                'success': True,
                'location': location,
                'forecast': forecast
            })
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @api.route('/weather/agricultural', methods=['GET'])
    def get_agricultural_weather():
        """Get weather data formatted for agricultural use"""
        services = get_services()
        
        try:
            location = request.args.get('location', 'Delhi')
            agri_weather = services['weather_service'].get_agricultural_weather(location)
            
            return jsonify({
                'success': True,
                'data': agri_weather
            })
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    # ==================== Reference Data Endpoints ====================
    
    @api.route('/crops', methods=['GET'])
    def list_crops():
        """List all supported crops"""
        services = get_services()
        
        crops_info = services['crop_recommender'].get_all_crops_info()
        
        return jsonify({
            'success': True,
            'crops': CROPS,
            'details': crops_info
        })
    
    @api.route('/crops/<crop_name>', methods=['GET'])
    def get_crop_info(crop_name):
        """Get detailed information about a specific crop"""
        services = get_services()
        
        info = services['crop_recommender'].get_crop_info(crop_name)
        
        if info is None:
            return jsonify({'error': f'Crop not found: {crop_name}'}), 404
        
        return jsonify({
            'success': True,
            'crop': info
        })
    
    @api.route('/soil-types', methods=['GET'])
    def list_soil_types():
        """List all supported soil types"""
        return jsonify({
            'success': True,
            'soil_types': SOIL_TYPES
        })
    
    @api.route('/seasons', methods=['GET'])
    def list_seasons():
        """List all seasons"""
        services = get_services()
        current = services['advisory_engine'].current_season
        
        return jsonify({
            'success': True,
            'seasons': SEASONS,
            'current_season': current
        })
    
    @api.route('/model/metrics', methods=['GET'])
    def get_model_metrics():
        """Get model performance metrics"""
        services = get_services()
        
        yield_metrics = services['yield_predictor'].metrics
        recommender_accuracy = services['crop_recommender'].accuracy
        
        return jsonify({
            'success': True,
            'yield_predictor': yield_metrics,
            'crop_recommender': {
                'accuracy': recommender_accuracy
            },
            'feature_importance': services['yield_predictor'].get_feature_importance()
        })
    
    # ==================== Market Prices Endpoints ====================
    
    @api.route('/market/prices', methods=['GET'])
    def get_market_prices():
        """
        Get live market prices for crops.
        Simulates real-time mandi prices with fluctuations.
        """
        import random
        from datetime import datetime
        
        # Base MSP prices (2025-26) with market variations
        base_prices = {
            'Rice': {'msp': 2300, 'unit': 'quintal', 'category': 'cereals'},
            'Wheat': {'msp': 2275, 'unit': 'quintal', 'category': 'cereals'},
            'Maize': {'msp': 2090, 'unit': 'quintal', 'category': 'cereals'},
            'Barley': {'msp': 1850, 'unit': 'quintal', 'category': 'cereals'},
            'Bajra': {'msp': 2625, 'unit': 'quintal', 'category': 'cereals'},
            'Jowar': {'msp': 3180, 'unit': 'quintal', 'category': 'cereals'},
            'Cotton': {'msp': 7020, 'unit': 'quintal', 'category': 'cash_crops'},
            'Sugarcane': {'msp': 315, 'unit': 'quintal', 'category': 'cash_crops'},
            'Groundnut': {'msp': 6377, 'unit': 'quintal', 'category': 'oilseeds'},
            'Soybean': {'msp': 4892, 'unit': 'quintal', 'category': 'oilseeds'},
            'Mustard': {'msp': 5650, 'unit': 'quintal', 'category': 'oilseeds'},
            'Sunflower': {'msp': 6760, 'unit': 'quintal', 'category': 'oilseeds'},
            'Gram': {'msp': 5440, 'unit': 'quintal', 'category': 'pulses'},
            'Tur/Arhar': {'msp': 7550, 'unit': 'quintal', 'category': 'pulses'},
            'Moong': {'msp': 8682, 'unit': 'quintal', 'category': 'pulses'},
            'Urad': {'msp': 7400, 'unit': 'quintal', 'category': 'pulses'},
            'Masoor': {'msp': 6425, 'unit': 'quintal', 'category': 'pulses'},
            'Potato': {'msp': 1200, 'unit': 'quintal', 'category': 'vegetables'},
            'Onion': {'msp': 1800, 'unit': 'quintal', 'category': 'vegetables'},
            'Tomato': {'msp': 2500, 'unit': 'quintal', 'category': 'vegetables'},
        }
        
        # Major mandis with location
        mandis = {
            'Delhi': {'state': 'Delhi', 'variation': 1.05},
            'Mumbai': {'state': 'Maharashtra', 'variation': 1.08},
            'Ahmedabad': {'state': 'Gujarat', 'variation': 1.02},
            'Indore': {'state': 'Madhya Pradesh', 'variation': 0.98},
            'Ludhiana': {'state': 'Punjab', 'variation': 1.03},
            'Jaipur': {'state': 'Rajasthan', 'variation': 0.97},
            'Nagpur': {'state': 'Maharashtra', 'variation': 1.01},
            'Kolkata': {'state': 'West Bengal', 'variation': 1.04},
            'Chennai': {'state': 'Tamil Nadu', 'variation': 1.06},
            'Hyderabad': {'state': 'Telangana', 'variation': 1.03},
        }
        
        location = request.args.get('location', 'Delhi')
        crop = request.args.get('crop', None)
        category = request.args.get('category', None)
        
        # Get mandi variation factor
        mandi_info = mandis.get(location, mandis['Delhi'])
        variation_factor = mandi_info['variation']
        
        # Generate prices with random market fluctuation
        prices = []
        current_time = datetime.now()
        
        for crop_name, info in base_prices.items():
            # Skip if filtering by specific crop
            if crop and crop.lower() != crop_name.lower():
                continue
            # Skip if filtering by category
            if category and category.lower() != info['category'].lower():
                continue
                
            # Calculate market price with variations
            base = info['msp']
            # Random daily fluctuation (-5% to +15% above MSP)
            random.seed(hash(crop_name + str(current_time.date())))
            daily_variation = random.uniform(0.95, 1.15)
            # Time-based micro fluctuation (simulates live updates)
            micro_variation = random.uniform(0.99, 1.01)
            
            market_price = round(base * variation_factor * daily_variation * micro_variation)
            
            # Calculate change from yesterday
            random.seed(hash(crop_name + str(current_time.date()) + "yesterday"))
            yesterday_variation = random.uniform(0.95, 1.15)
            yesterday_price = round(base * variation_factor * yesterday_variation)
            price_change = market_price - yesterday_price
            change_percent = round((price_change / yesterday_price) * 100, 2)
            
            # Determine trend
            if change_percent > 1:
                trend = 'up'
            elif change_percent < -1:
                trend = 'down'
            else:
                trend = 'stable'
            
            prices.append({
                'crop': crop_name,
                'msp': info['msp'],
                'market_price': market_price,
                'price_change': price_change,
                'change_percent': change_percent,
                'trend': trend,
                'unit': info['unit'],
                'category': info['category'],
                'mandi': location,
                'state': mandi_info['state'],
                'updated_at': current_time.strftime('%Y-%m-%d %H:%M:%S')
            })
        
        # Sort by category and name
        prices.sort(key=lambda x: (x['category'], x['crop']))
        
        return jsonify({
            'success': True,
            'location': location,
            'state': mandi_info['state'],
            'prices': prices,
            'total_crops': len(prices),
            'last_updated': current_time.strftime('%Y-%m-%d %H:%M:%S'),
            'categories': ['cereals', 'cash_crops', 'oilseeds', 'pulses', 'vegetables']
        })
    
    @api.route('/market/mandis', methods=['GET'])
    def get_mandis():
        """Get list of available mandis"""
        mandis = [
            {'name': 'Delhi', 'state': 'Delhi'},
            {'name': 'Mumbai', 'state': 'Maharashtra'},
            {'name': 'Ahmedabad', 'state': 'Gujarat'},
            {'name': 'Indore', 'state': 'Madhya Pradesh'},
            {'name': 'Ludhiana', 'state': 'Punjab'},
            {'name': 'Jaipur', 'state': 'Rajasthan'},
            {'name': 'Nagpur', 'state': 'Maharashtra'},
            {'name': 'Kolkata', 'state': 'West Bengal'},
            {'name': 'Chennai', 'state': 'Tamil Nadu'},
            {'name': 'Hyderabad', 'state': 'Telangana'},
        ]
        
        return jsonify({
            'success': True,
            'mandis': mandis
        })
    
    @api.route('/market/price-history', methods=['GET'])
    def get_price_history():
        """Get price history for a crop (last 7 days)"""
        import random
        from datetime import datetime, timedelta
        
        crop = request.args.get('crop', 'Wheat')
        location = request.args.get('location', 'Delhi')
        
        base_prices = {
            'Rice': 2300, 'Wheat': 2275, 'Maize': 2090, 'Cotton': 7020,
            'Sugarcane': 315, 'Groundnut': 6377, 'Soybean': 4892,
            'Mustard': 5650, 'Gram': 5440, 'Potato': 1200,
            'Onion': 1800, 'Tomato': 2500
        }
        
        base_price = base_prices.get(crop, 2000)
        history = []
        
        for i in range(7, -1, -1):
            date = datetime.now() - timedelta(days=i)
            random.seed(hash(crop + str(date.date())))
            variation = random.uniform(0.92, 1.12)
            price = round(base_price * variation)
            
            history.append({
                'date': date.strftime('%Y-%m-%d'),
                'day': date.strftime('%a'),
                'price': price,
                'volume': random.randint(100, 500)  # Trading volume in tonnes
            })
        
        # Calculate stats
        prices_list = [h['price'] for h in history]
        
        return jsonify({
            'success': True,
            'crop': crop,
            'location': location,
            'history': history,
            'stats': {
                'min': min(prices_list),
                'max': max(prices_list),
                'avg': round(sum(prices_list) / len(prices_list)),
                'current': prices_list[-1],
                'week_change': round(((prices_list[-1] - prices_list[0]) / prices_list[0]) * 100, 2)
            }
        })
    
    @api.route('/market/alerts', methods=['GET'])
    def get_price_alerts():
        """Get price alerts - crops with significant price changes"""
        import random
        from datetime import datetime
        
        alerts = []
        crops = ['Rice', 'Wheat', 'Cotton', 'Soybean', 'Onion', 'Tomato', 'Potato']
        
        random.seed(hash(str(datetime.now().date())))
        
        for crop in crops:
            change = random.uniform(-8, 12)
            if abs(change) > 3:  # Only significant changes
                alerts.append({
                    'crop': crop,
                    'change_percent': round(change, 2),
                    'type': 'price_increase' if change > 0 else 'price_decrease',
                    'recommendation': 'Good time to sell' if change > 5 else 'Consider holding' if change > 0 else 'Monitor prices',
                    'priority': 'high' if abs(change) > 6 else 'medium'
                })
        
        alerts.sort(key=lambda x: abs(x['change_percent']), reverse=True)
        
        return jsonify({
            'success': True,
            'alerts': alerts,
            'generated_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        })
    
    # Register blueprint
    app.register_blueprint(api)
    
    print(f"Registered {len([r for r in app.url_map.iter_rules()])} routes")
