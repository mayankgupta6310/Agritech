"""
Crop Recommendation Engine
Recommends optimal crops based on soil conditions, climate, and market factors
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import CROPS, SOIL_TYPES, SEASONS, get_current_season


class CropRecommender:
    """
    Intelligent crop recommendation system based on agricultural conditions.
    Uses Random Forest classifier to suggest suitable crops.
    """
    
    def __init__(self):
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=12,
            random_state=42,
            n_jobs=-1
        )
        self.scaler = StandardScaler()
        self.crop_encoder = LabelEncoder()
        self.crop_encoder.fit(CROPS)
        self.is_trained = False
        
        # Crop suitability database
        self.crop_profiles = self._build_crop_profiles()
        
        # Train with synthetic data
        self._train_with_synthetic_data()
    
    def _build_crop_profiles(self):
        """Define optimal growing conditions for each crop"""
        profiles = {
            'Rice': {
                'temp_range': (20, 35), 'rainfall_min': 1000, 'ph_range': (5.5, 7.0),
                'nitrogen': 80, 'phosphorus': 40, 'potassium': 40,
                'season': ['Kharif'], 'soil_types': ['Alluvial', 'Clay', 'Loamy'],
                'water_requirement': 'High', 'growth_days': 120
            },
            'Wheat': {
                'temp_range': (10, 25), 'rainfall_min': 400, 'ph_range': (6.0, 7.5),
                'nitrogen': 60, 'phosphorus': 30, 'potassium': 30,
                'season': ['Rabi'], 'soil_types': ['Alluvial', 'Loamy', 'Clay'],
                'water_requirement': 'Medium', 'growth_days': 150
            },
            'Maize': {
                'temp_range': (18, 32), 'rainfall_min': 500, 'ph_range': (5.5, 7.5),
                'nitrogen': 100, 'phosphorus': 50, 'potassium': 50,
                'season': ['Kharif', 'Rabi'], 'soil_types': ['Loamy', 'Alluvial', 'Sandy'],
                'water_requirement': 'Medium', 'growth_days': 90
            },
            'Cotton': {
                'temp_range': (25, 35), 'rainfall_min': 600, 'ph_range': (6.0, 8.0),
                'nitrogen': 60, 'phosphorus': 30, 'potassium': 30,
                'season': ['Kharif'], 'soil_types': ['Black', 'Alluvial', 'Loamy'],
                'water_requirement': 'Medium', 'growth_days': 180
            },
            'Sugarcane': {
                'temp_range': (20, 35), 'rainfall_min': 1200, 'ph_range': (6.0, 7.5),
                'nitrogen': 120, 'phosphorus': 60, 'potassium': 80,
                'season': ['Kharif', 'Zaid'], 'soil_types': ['Loamy', 'Alluvial', 'Clay'],
                'water_requirement': 'Very High', 'growth_days': 365
            },
            'Soybean': {
                'temp_range': (20, 30), 'rainfall_min': 600, 'ph_range': (6.0, 7.0),
                'nitrogen': 20, 'phosphorus': 60, 'potassium': 40,
                'season': ['Kharif'], 'soil_types': ['Loamy', 'Black', 'Alluvial'],
                'water_requirement': 'Medium', 'growth_days': 100
            },
            'Groundnut': {
                'temp_range': (25, 35), 'rainfall_min': 500, 'ph_range': (5.5, 7.0),
                'nitrogen': 20, 'phosphorus': 40, 'potassium': 40,
                'season': ['Kharif', 'Rabi'], 'soil_types': ['Sandy', 'Loamy', 'Red'],
                'water_requirement': 'Low', 'growth_days': 120
            },
            'Potato': {
                'temp_range': (15, 25), 'rainfall_min': 400, 'ph_range': (5.0, 6.5),
                'nitrogen': 100, 'phosphorus': 60, 'potassium': 120,
                'season': ['Rabi'], 'soil_types': ['Loamy', 'Sandy', 'Alluvial'],
                'water_requirement': 'Medium', 'growth_days': 90
            },
            'Tomato': {
                'temp_range': (18, 30), 'rainfall_min': 400, 'ph_range': (6.0, 7.0),
                'nitrogen': 80, 'phosphorus': 40, 'potassium': 60,
                'season': ['Kharif', 'Rabi', 'Zaid'], 'soil_types': ['Loamy', 'Sandy', 'Alluvial'],
                'water_requirement': 'Medium', 'growth_days': 75
            },
            'Onion': {
                'temp_range': (15, 30), 'rainfall_min': 350, 'ph_range': (6.0, 7.5),
                'nitrogen': 60, 'phosphorus': 40, 'potassium': 60,
                'season': ['Kharif', 'Rabi'], 'soil_types': ['Loamy', 'Alluvial', 'Sandy'],
                'water_requirement': 'Low', 'growth_days': 120
            },
            'Mustard': {
                'temp_range': (10, 25), 'rainfall_min': 300, 'ph_range': (6.0, 7.5),
                'nitrogen': 40, 'phosphorus': 20, 'potassium': 20,
                'season': ['Rabi'], 'soil_types': ['Loamy', 'Sandy', 'Alluvial'],
                'water_requirement': 'Low', 'growth_days': 120
            },
            'Sunflower': {
                'temp_range': (20, 30), 'rainfall_min': 400, 'ph_range': (6.0, 7.5),
                'nitrogen': 60, 'phosphorus': 30, 'potassium': 30,
                'season': ['Kharif', 'Rabi'], 'soil_types': ['Loamy', 'Black', 'Alluvial'],
                'water_requirement': 'Medium', 'growth_days': 100
            },
            'Barley': {
                'temp_range': (12, 25), 'rainfall_min': 300, 'ph_range': (6.0, 8.0),
                'nitrogen': 50, 'phosphorus': 25, 'potassium': 25,
                'season': ['Rabi'], 'soil_types': ['Loamy', 'Sandy', 'Alluvial'],
                'water_requirement': 'Low', 'growth_days': 130
            },
            'Millet': {
                'temp_range': (25, 35), 'rainfall_min': 300, 'ph_range': (5.5, 7.5),
                'nitrogen': 40, 'phosphorus': 20, 'potassium': 20,
                'season': ['Kharif'], 'soil_types': ['Sandy', 'Loamy', 'Red'],
                'water_requirement': 'Low', 'growth_days': 90
            },
            'Sorghum': {
                'temp_range': (25, 35), 'rainfall_min': 400, 'ph_range': (5.5, 8.0),
                'nitrogen': 50, 'phosphorus': 25, 'potassium': 25,
                'season': ['Kharif', 'Rabi'], 'soil_types': ['Black', 'Red', 'Loamy'],
                'water_requirement': 'Low', 'growth_days': 100
            }
        }
        return profiles
    
    def _generate_synthetic_data(self, n_samples=2000):
        """Generate synthetic training data"""
        np.random.seed(42)
        
        data = []
        for _ in range(n_samples):
            temp = np.random.uniform(10, 40)
            rainfall = np.random.uniform(200, 2500)
            humidity = np.random.uniform(30, 95)
            ph = np.random.uniform(4.5, 8.5)
            nitrogen = np.random.uniform(10, 140)
            phosphorus = np.random.uniform(5, 100)
            potassium = np.random.uniform(10, 220)
            
            # Find best matching crop
            best_crop = self._find_best_crop(temp, rainfall, ph, nitrogen, phosphorus, potassium)
            
            data.append({
                'temperature': temp,
                'rainfall': rainfall,
                'humidity': humidity,
                'ph': ph,
                'nitrogen': nitrogen,
                'phosphorus': phosphorus,
                'potassium': potassium,
                'crop': best_crop
            })
        
        return pd.DataFrame(data)
    
    def _find_best_crop(self, temp, rainfall, ph, nitrogen, phosphorus, potassium):
        """Find the best matching crop based on conditions"""
        scores = {}
        
        for crop, profile in self.crop_profiles.items():
            score = 0
            
            # Temperature match
            if profile['temp_range'][0] <= temp <= profile['temp_range'][1]:
                score += 25
            else:
                diff = min(abs(temp - profile['temp_range'][0]), abs(temp - profile['temp_range'][1]))
                score += max(0, 25 - diff * 2)
            
            # Rainfall match
            if rainfall >= profile['rainfall_min']:
                score += 20
            else:
                score += max(0, 20 - (profile['rainfall_min'] - rainfall) / 50)
            
            # pH match
            if profile['ph_range'][0] <= ph <= profile['ph_range'][1]:
                score += 20
            else:
                diff = min(abs(ph - profile['ph_range'][0]), abs(ph - profile['ph_range'][1]))
                score += max(0, 20 - diff * 5)
            
            # Nutrient match
            n_diff = abs(nitrogen - profile['nitrogen']) / profile['nitrogen']
            p_diff = abs(phosphorus - profile['phosphorus']) / profile['phosphorus']
            k_diff = abs(potassium - profile['potassium']) / profile['potassium']
            nutrient_score = 35 * (1 - (n_diff + p_diff + k_diff) / 3)
            score += max(0, nutrient_score)
            
            scores[crop] = score
        
        # Add some randomness for training variety
        for crop in scores:
            scores[crop] += np.random.uniform(-5, 5)
        
        return max(scores, key=scores.get)
    
    def _train_with_synthetic_data(self):
        """Train with synthetic data"""
        df = self._generate_synthetic_data(3000)
        
        X = df[['temperature', 'rainfall', 'humidity', 'ph', 'nitrogen', 'phosphorus', 'potassium']]
        y = self.crop_encoder.transform(df['crop'])
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        self.model.fit(X_train_scaled, y_train)
        
        self.accuracy = self.model.score(X_test_scaled, y_test)
        self.is_trained = True
        print(f"Crop Recommender trained - Accuracy: {self.accuracy:.2%}")
    
    def recommend(self, conditions, n_recommendations=5):
        """
        Recommend crops based on given conditions.
        
        Args:
            conditions: dict with keys: temperature, rainfall, humidity, ph, nitrogen, phosphorus, potassium
            n_recommendations: number of crops to recommend
            
        Returns:
            list of recommendations with confidence scores
        """
        if not self.is_trained:
            raise ValueError("Model is not trained")
        
        # Prepare input
        X = np.array([[
            conditions['temperature'],
            conditions['rainfall'],
            conditions.get('humidity', 70),
            conditions['ph'],
            conditions['nitrogen'],
            conditions['phosphorus'],
            conditions['potassium']
        ]])
        
        X_scaled = self.scaler.transform(X)
        
        # Get prediction probabilities
        probs = self.model.predict_proba(X_scaled)[0]
        
        # Get top N recommendations
        top_indices = np.argsort(probs)[::-1][:n_recommendations]
        
        recommendations = []
        current_season = get_current_season()
        
        for idx in top_indices:
            crop = self.crop_encoder.inverse_transform([idx])[0]
            confidence = probs[idx] * 100
            profile = self.crop_profiles.get(crop, {})
            
            # Check season suitability
            season_suitable = current_season in profile.get('season', [])
            
            recommendations.append({
                'crop': crop,
                'confidence': round(confidence, 1),
                'season_suitable': season_suitable,
                'current_season': current_season,
                'recommended_seasons': profile.get('season', []),
                'water_requirement': profile.get('water_requirement', 'Medium'),
                'growth_days': profile.get('growth_days', 100),
                'optimal_conditions': {
                    'temperature': profile.get('temp_range', (20, 30)),
                    'rainfall_min': profile.get('rainfall_min', 500),
                    'ph_range': profile.get('ph_range', (6.0, 7.0)),
                    'soil_types': profile.get('soil_types', [])
                }
            })
        
        return recommendations
    
    def get_crop_info(self, crop_name):
        """Get detailed information about a specific crop"""
        if crop_name in self.crop_profiles:
            profile = self.crop_profiles[crop_name]
            return {
                'crop': crop_name,
                'optimal_temperature': f"{profile['temp_range'][0]}-{profile['temp_range'][1]}°C",
                'minimum_rainfall': f"{profile['rainfall_min']} mm/year",
                'optimal_ph': f"{profile['ph_range'][0]}-{profile['ph_range'][1]}",
                'npk_requirements': {
                    'nitrogen': f"{profile['nitrogen']} kg/ha",
                    'phosphorus': f"{profile['phosphorus']} kg/ha",
                    'potassium': f"{profile['potassium']} kg/ha"
                },
                'growing_seasons': profile['season'],
                'suitable_soils': profile['soil_types'],
                'water_requirement': profile['water_requirement'],
                'growth_duration': f"{profile['growth_days']} days"
            }
        return None
    
    def get_all_crops_info(self):
        """Get summary info for all crops"""
        return [self.get_crop_info(crop) for crop in CROPS]


# Example usage
if __name__ == "__main__":
    recommender = CropRecommender()
    
    # Test recommendation
    conditions = {
        'temperature': 28,
        'rainfall': 1000,
        'humidity': 75,
        'ph': 6.5,
        'nitrogen': 80,
        'phosphorus': 45,
        'potassium': 90
    }
    
    print("Soil and Climate Conditions:")
    for key, value in conditions.items():
        print(f"  {key}: {value}")
    
    print("\nTop Crop Recommendations:")
    recommendations = recommender.recommend(conditions)
    for i, rec in enumerate(recommendations, 1):
        season_status = "✓" if rec['season_suitable'] else "✗"
        print(f"\n{i}. {rec['crop']}")
        print(f"   Confidence: {rec['confidence']}%")
        print(f"   Season Suitable: {season_status} (Current: {rec['current_season']})")
        print(f"   Water Need: {rec['water_requirement']}")
        print(f"   Growth Period: {rec['growth_days']} days")
