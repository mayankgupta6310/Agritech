"""
Advisory Engine
Generates smart farming advisories based on multiple factors
"""

import os
import sys
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import random

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import CROPS, SEASONS, ADVISORY_CATEGORIES, get_current_season


class AdvisoryEngine:
    """
    Intelligent advisory system for farmers.
    Provides recommendations for planting, irrigation, pest control, and more.
    """
    
    def __init__(self):
        self.current_season = get_current_season()
        self.advisories_db = self._build_advisory_database()
        self.pest_database = self._build_pest_database()
        self.fertilizer_guide = self._build_fertilizer_guide()
    
    def _build_advisory_database(self) -> Dict:
        """Build comprehensive advisory database"""
        return {
            'Kharif': {
                'general': [
                    "Prepare fields for monsoon sowing by May-June",
                    "Ensure proper bunding to retain rainwater",
                    "Apply pre-emergence herbicides before monsoon onset",
                    "Complete sowing within 2 weeks of monsoon arrival"
                ],
                'crops': {
                    'Rice': [
                        "Transplant seedlings 20-25 days old",
                        "Maintain 2-3 inches water level initially",
                        "Apply nitrogen in 3 split doses",
                        "Watch for stem borer and leaf folder"
                    ],
                    'Cotton': [
                        "Sow after first proper monsoon shower",
                        "Maintain plant spacing of 90x60 cm",
                        "Scout for bollworm weekly",
                        "Apply growth regulators at 60 DAS"
                    ],
                    'Maize': [
                        "Sow at onset of monsoon",
                        "Thin plants to 20 cm spacing",
                        "Earthing up at 30 DAS",
                        "Watch for Fall Armyworm"
                    ],
                    'Soybean': [
                        "Treat seeds with Rhizobium before sowing",
                        "Sow in rows 30-45 cm apart",
                        "Avoid water logging",
                        "Harvest when 95% pods turn brown"
                    ]
                }
            },
            'Rabi': {
                'general': [
                    "Start field preparation in October",
                    "Apply basal dose of fertilizers before sowing",
                    "Plan irrigation schedule carefully",
                    "Protect crops from frost in December-January"
                ],
                'crops': {
                    'Wheat': [
                        "Sow by mid-November for best yields",
                        "First irrigation at crown root initiation (21 DAS)",
                        "Apply nitrogen at tillering and heading stages",
                        "Watch for rust diseases"
                    ],
                    'Potato': [
                        "Plant in October-November",
                        "Maintain soil moisture consistently",
                        "Earth up at 30 and 45 days",
                        "Spray fungicides preventively for late blight"
                    ],
                    'Mustard': [
                        "Sow in first fortnight of October",
                        "First irrigation at 30-35 DAS",
                        "Apply sulfur for better oil content",
                        "Harvest when 75% pods turn yellow"
                    ],
                    'Onion': [
                        "Transplant seedlings at 6-8 weeks",
                        "Stop irrigation 10 days before harvest",
                        "Cure bulbs in shade for 3-4 days",
                        "Watch for thrips and purple blotch"
                    ]
                }
            },
            'Zaid': {
                'general': [
                    "Plan for quick-maturing varieties",
                    "Ensure adequate irrigation facility",
                    "Protect from hot winds (Loo)",
                    "Harvest before monsoon onset"
                ],
                'crops': {
                    'Watermelon': [
                        "Sow in February-March",
                        "Train vines in one direction",
                        "Reduce irrigation as fruits mature",
                        "Harvest when tendril near fruit dries"
                    ],
                    'Muskmelon': [
                        "Provide support for trailing",
                        "Remove male flowers to promote fruiting",
                        "Watch for fruit fly",
                        "Harvest when aroma develops"
                    ],
                    'Cucumber': [
                        "Sow seeds directly in field",
                        "Provide trellis for better quality",
                        "Harvest young for best quality",
                        "Pick frequently for continuous bearing"
                    ]
                }
            }
        }
    
    def _build_pest_database(self) -> Dict:
        """Build pest identification and management database"""
        return {
            'Rice': {
                'Stem Borer': {
                    'symptoms': ['Dead hearts in vegetative stage', 'White ears at flowering'],
                    'management': [
                        'Use light traps to monitor moth population',
                        'Release Trichogramma parasitoids',
                        'Apply Cartap hydrochloride granules'
                    ],
                    'severity': 'High'
                },
                'Brown Plant Hopper': {
                    'symptoms': ['Hopper burn', 'Circular yellowing patches'],
                    'management': [
                        'Avoid excessive nitrogen',
                        'Drain water from field',
                        'Spray Imidacloprid if severe'
                    ],
                    'severity': 'High'
                }
            },
            'Cotton': {
                'Bollworm': {
                    'symptoms': ['Bore holes on bolls', 'Frass visible on bolls'],
                    'management': [
                        'Install pheromone traps',
                        'Use Bt cotton varieties',
                        'Apply Spinosad or Emamectin benzoate'
                    ],
                    'severity': 'Critical'
                },
                'Whitefly': {
                    'symptoms': ['Sticky leaves', 'Black sooty mould', 'Leaf curl'],
                    'management': [
                        'Use yellow sticky traps',
                        'Spray neem oil',
                        'Apply Diafenthiuron'
                    ],
                    'severity': 'Medium'
                }
            },
            'Wheat': {
                'Rust': {
                    'symptoms': ['Orange-brown pustules on leaves', 'Yellowing of foliage'],
                    'management': [
                        'Grow resistant varieties',
                        'Early sowing to escape',
                        'Spray Propiconazole'
                    ],
                    'severity': 'High'
                },
                'Aphids': {
                    'symptoms': ['Curled leaves', 'Honeydew secretion', 'Stunted growth'],
                    'management': [
                        'Encourage ladybird beetles',
                        'Spray Dimethoate if heavy',
                        'Remove alternate hosts'
                    ],
                    'severity': 'Medium'
                }
            },
            'Potato': {
                'Late Blight': {
                    'symptoms': ['Water-soaked lesions', 'White fungal growth', 'Tuber rot'],
                    'management': [
                        'Use certified disease-free seed',
                        'Prophylactic spray of Mancozeb',
                        'Apply Metalaxyl + Mancozeb if disease appears'
                    ],
                    'severity': 'Critical'
                }
            },
            'Tomato': {
                'Fruit Borer': {
                    'symptoms': ['Bore holes in fruits', 'Rotting of fruits'],
                    'management': [
                        'Install pheromone traps',
                        'Spray NPV (Nuclear Polyhedrosis Virus)',
                        'Apply Spinosad'
                    ],
                    'severity': 'High'
                },
                'Leaf Curl Virus': {
                    'symptoms': ['Upward curling of leaves', 'Stunting', 'Reduced yield'],
                    'management': [
                        'Grow resistant varieties',
                        'Control whitefly vector',
                        'Rogue out infected plants'
                    ],
                    'severity': 'High'
                }
            }
        }
    
    def _build_fertilizer_guide(self) -> Dict:
        """Build fertilizer recommendation database"""
        return {
            'Rice': {
                'N': 120, 'P': 60, 'K': 40,
                'application': [
                    {'stage': 'Basal', 'N%': 50, 'P%': 100, 'K%': 50},
                    {'stage': 'Tillering (21 DAS)', 'N%': 25, 'P%': 0, 'K%': 0},
                    {'stage': 'Panicle Initiation', 'N%': 25, 'P%': 0, 'K%': 50}
                ],
                'micronutrients': ['Zinc Sulphate @ 25 kg/ha']
            },
            'Wheat': {
                'N': 120, 'P': 60, 'K': 40,
                'application': [
                    {'stage': 'Basal', 'N%': 50, 'P%': 100, 'K%': 100},
                    {'stage': 'First Irrigation (21 DAS)', 'N%': 25, 'P%': 0, 'K%': 0},
                    {'stage': 'Second Irrigation', 'N%': 25, 'P%': 0, 'K%': 0}
                ],
                'micronutrients': ['Zinc Sulphate @ 25 kg/ha in Zn deficient soils']
            },
            'Cotton': {
                'N': 150, 'P': 60, 'K': 60,
                'application': [
                    {'stage': 'Basal', 'N%': 33, 'P%': 100, 'K%': 50},
                    {'stage': 'Square Formation', 'N%': 33, 'P%': 0, 'K%': 25},
                    {'stage': 'Boll Development', 'N%': 34, 'P%': 0, 'K%': 25}
                ],
                'micronutrients': ['Magnesium Sulphate spray', 'Boron @ 0.5 kg/ha']
            },
            'Potato': {
                'N': 180, 'P': 80, 'K': 100,
                'application': [
                    {'stage': 'Basal', 'N%': 50, 'P%': 100, 'K%': 75},
                    {'stage': 'First Earthing (30 DAS)', 'N%': 25, 'P%': 0, 'K%': 25},
                    {'stage': 'Second Earthing (45 DAS)', 'N%': 25, 'P%': 0, 'K%': 0}
                ],
                'micronutrients': ['Zinc Sulphate @ 25 kg/ha', 'Sulphur @ 40 kg/ha']
            },
            'Maize': {
                'N': 150, 'P': 60, 'K': 40,
                'application': [
                    {'stage': 'Basal', 'N%': 33, 'P%': 100, 'K%': 100},
                    {'stage': 'Knee High (30 DAS)', 'N%': 33, 'P%': 0, 'K%': 0},
                    {'stage': 'Tasseling', 'N%': 34, 'P%': 0, 'K%': 0}
                ],
                'micronutrients': ['Zinc Sulphate @ 25 kg/ha']
            }
        }
    
    def get_seasonal_advisory(self, season: str = None) -> Dict:
        """Get advisory for a specific season"""
        season = season or self.current_season
        
        if season not in self.advisories_db:
            return {'error': f"Invalid season: {season}"}
        
        advisory_data = self.advisories_db[season]
        
        return {
            'season': season,
            'general_advisories': advisory_data['general'],
            'crop_specific': advisory_data['crops'],
            'generated_at': datetime.now().isoformat()
        }
    
    def get_crop_advisory(self, crop: str, conditions: Dict = None) -> Dict:
        """Get comprehensive advisory for a specific crop"""
        if crop not in CROPS:
            return {'error': f"Unknown crop: {crop}"}
        
        # Get season-specific advice
        crop_advice = []
        for season, data in self.advisories_db.items():
            if crop in data['crops']:
                crop_advice.extend([
                    {'season': season, 'advice': adv}
                    for adv in data['crops'][crop]
                ])
        
        # Get pest information
        pest_info = self.pest_database.get(crop, {})
        
        # Get fertilizer guide
        fert_info = self.fertilizer_guide.get(crop, {})
        
        # Condition-based recommendations
        condition_advice = []
        if conditions:
            condition_advice = self._generate_condition_based_advice(crop, conditions)
        
        return {
            'crop': crop,
            'current_season': self.current_season,
            'seasonal_advisories': crop_advice,
            'pest_management': pest_info,
            'fertilizer_plan': fert_info,
            'condition_based_advice': condition_advice,
            'generated_at': datetime.now().isoformat()
        }
    
    def _generate_condition_based_advice(self, crop: str, conditions: Dict) -> List[str]:
        """Generate advice based on current conditions"""
        advice = []
        
        # Temperature based
        temp = conditions.get('temperature', 25)
        if temp > 35:
            advice.append("Apply mulching to reduce soil temperature")
            advice.append("Irrigate during cooler hours (evening/early morning)")
        elif temp < 15:
            advice.append("Protect crops with row covers or mulch")
            advice.append("Delay cold-sensitive operations")
        
        # Humidity based
        humidity = conditions.get('humidity', 70)
        if humidity > 85:
            advice.append("Monitor for fungal diseases (powdery mildew, blight)")
            advice.append("Ensure good air circulation")
        elif humidity < 40:
            advice.append("Increase irrigation frequency")
            advice.append("Apply anti-transpirant sprays if needed")
        
        # pH based
        ph = conditions.get('ph', 6.5)
        if ph < 5.5:
            advice.append("Apply lime to raise soil pH")
            advice.append("Micronutrient availability may be affected")
        elif ph > 7.5:
            advice.append("Apply gypsum or sulfur to lower pH")
            advice.append("Iron and zinc deficiency likely")
        
        # Rainfall based
        rainfall = conditions.get('rainfall', 1000)
        if rainfall < 500:
            advice.append("Plan supplemental irrigation")
            advice.append("Consider drought-tolerant practices")
        elif rainfall > 2000:
            advice.append("Ensure proper drainage")
            advice.append("Watch for waterlogging issues")
        
        return advice
    
    def get_pest_alert(self, crop: str, symptoms: List[str] = None) -> Dict:
        """Get pest/disease identification and management advice"""
        if crop not in self.pest_database:
            return {
                'crop': crop,
                'message': 'No pest data available for this crop',
                'pests': []
            }
        
        pests = self.pest_database[crop]
        identified = []
        
        if symptoms:
            # Try to match symptoms
            for pest_name, pest_data in pests.items():
                for symptom in symptoms:
                    if any(symptom.lower() in s.lower() for s in pest_data['symptoms']):
                        identified.append({
                            'name': pest_name,
                            'match_confidence': 'High',
                            'symptoms': pest_data['symptoms'],
                            'management': pest_data['management'],
                            'severity': pest_data['severity']
                        })
                        break
        
        return {
            'crop': crop,
            'identified_pests': identified if identified else None,
            'all_pests': [
                {
                    'name': name,
                    'symptoms': data['symptoms'],
                    'severity': data['severity']
                }
                for name, data in pests.items()
            ],
            'generated_at': datetime.now().isoformat()
        }
    
    def get_fertilizer_recommendation(self, crop: str, area: float, soil_test: Dict = None) -> Dict:
        """Calculate fertilizer requirements"""
        if crop not in self.fertilizer_guide:
            return {'error': f"No fertilizer data for {crop}"}
        
        guide = self.fertilizer_guide[crop]
        
        # Base requirements per hectare
        base_n = guide['N']
        base_p = guide['P']
        base_k = guide['K']
        
        # Adjust based on soil test if available
        if soil_test:
            if soil_test.get('nitrogen', 50) > 80:
                base_n *= 0.8
            if soil_test.get('phosphorus', 30) > 50:
                base_p *= 0.8
            if soil_test.get('potassium', 100) > 150:
                base_k *= 0.8
        
        # Calculate total requirements
        total_n = base_n * area
        total_p = base_p * area
        total_k = base_k * area
        
        # Convert to common fertilizers
        urea = (total_n / 0.46)  # Urea is 46% N
        dap = (total_p / 0.46)   # DAP is 46% P2O5
        mop = (total_k / 0.60)   # MOP is 60% K2O
        
        # Application schedule
        schedule = []
        for app in guide['application']:
            schedule.append({
                'stage': app['stage'],
                'urea_kg': round(urea * app['N%'] / 100, 1),
                'dap_kg': round(dap * app['P%'] / 100, 1),
                'mop_kg': round(mop * app['K%'] / 100, 1)
            })
        
        return {
            'crop': crop,
            'area_hectares': area,
            'total_requirement': {
                'nitrogen_kg': round(total_n, 1),
                'phosphorus_kg': round(total_p, 1),
                'potassium_kg': round(total_k, 1)
            },
            'fertilizer_quantities': {
                'urea_kg': round(urea, 1),
                'dap_kg': round(dap, 1),
                'mop_kg': round(mop, 1)
            },
            'application_schedule': schedule,
            'micronutrients': guide.get('micronutrients', []),
            'generated_at': datetime.now().isoformat()
        }
    
    def get_daily_tip(self) -> Dict:
        """Get daily farming tip"""
        tips = [
            {"tip": "Test soil every 2-3 years to optimize fertilizer use", "category": "Soil"},
            {"tip": "Water plants deeply but less frequently to encourage deep root growth", "category": "Irrigation"},
            {"tip": "Rotate crops to break pest and disease cycles", "category": "Crop Management"},
            {"tip": "Use organic mulch to conserve moisture and suppress weeds", "category": "Soil"},
            {"tip": "Scout fields weekly for early pest detection", "category": "Pest Control"},
            {"tip": "Keep records of all farming activities for better planning", "category": "Management"},
            {"tip": "Plant cover crops in fallow periods to improve soil health", "category": "Soil"},
            {"tip": "Calibrate sprayers regularly for effective pesticide application", "category": "Equipment"},
            {"tip": "Harvest crops at optimal moisture for better storage", "category": "Harvest"},
            {"tip": "Integrate trees (agroforestry) for sustainable farming", "category": "Sustainability"}
        ]
        
        # Select tip based on day of year
        day_index = datetime.now().timetuple().tm_yday % len(tips)
        selected_tip = tips[day_index]
        
        return {
            'date': datetime.now().strftime('%Y-%m-%d'),
            'tip': selected_tip['tip'],
            'category': selected_tip['category']
        }
    
    def generate_comprehensive_advisory(self, farmer_data: Dict) -> Dict:
        """Generate a comprehensive advisory based on farmer's situation"""
        crop = farmer_data.get('crop', 'Rice')
        area = farmer_data.get('area', 1.0)
        location = farmer_data.get('location', 'Unknown')
        conditions = farmer_data.get('conditions', {})
        
        # Compile all advisories
        crop_advisory = self.get_crop_advisory(crop, conditions)
        fertilizer = self.get_fertilizer_recommendation(crop, area, conditions)
        pest_alert = self.get_pest_alert(crop)
        daily_tip = self.get_daily_tip()
        
        # Priority actions
        priority_actions = self._generate_priority_actions(crop, conditions)
        
        return {
            'farmer_location': location,
            'crop': crop,
            'area': area,
            'season': self.current_season,
            'priority_actions': priority_actions,
            'crop_advisory': crop_advisory,
            'fertilizer_plan': fertilizer,
            'pest_alerts': pest_alert,
            'daily_tip': daily_tip,
            'generated_at': datetime.now().isoformat()
        }
    
    def _generate_priority_actions(self, crop: str, conditions: Dict) -> List[Dict]:
        """Generate priority actions for immediate attention"""
        actions = []
        
        # Season-based priority
        if self.current_season == 'Kharif':
            actions.append({
                'priority': 'High',
                'action': 'Prepare fields with proper bunding for monsoon',
                'timeline': 'This week'
            })
        elif self.current_season == 'Rabi':
            actions.append({
                'priority': 'High',
                'action': 'Plan irrigation schedule for winter crops',
                'timeline': 'This week'
            })
        
        # Temperature-based
        temp = conditions.get('temperature', 25)
        if temp > 35:
            actions.append({
                'priority': 'Critical',
                'action': 'Implement heat stress management measures',
                'timeline': 'Immediate'
            })
        elif temp < 10:
            actions.append({
                'priority': 'Critical',
                'action': 'Protect crops from frost damage',
                'timeline': 'Immediate'
            })
        
        # Add default action
        if not actions:
            actions.append({
                'priority': 'Normal',
                'action': 'Continue regular monitoring and maintenance',
                'timeline': 'Ongoing'
            })
        
        return actions


# Example usage
if __name__ == "__main__":
    engine = AdvisoryEngine()
    
    # Get seasonal advisory
    print("=== Seasonal Advisory ===")
    seasonal = engine.get_seasonal_advisory()
    print(f"Season: {seasonal['season']}")
    print("\nGeneral Advisories:")
    for adv in seasonal['general_advisories']:
        print(f"  - {adv}")
    
    # Get crop advisory
    print("\n=== Crop Advisory for Rice ===")
    crop_adv = engine.get_crop_advisory('Rice', {'temperature': 30, 'humidity': 80, 'ph': 6.5})
    print(f"Current Season: {crop_adv['current_season']}")
    print("\nCondition-based Advice:")
    for adv in crop_adv['condition_based_advice']:
        print(f"  - {adv}")
    
    # Get fertilizer recommendation
    print("\n=== Fertilizer Recommendation ===")
    fert = engine.get_fertilizer_recommendation('Rice', 2.5)
    print(f"For {fert['area_hectares']} hectares of {fert['crop']}:")
    print(f"  Urea: {fert['fertilizer_quantities']['urea_kg']} kg")
    print(f"  DAP: {fert['fertilizer_quantities']['dap_kg']} kg")
    print(f"  MOP: {fert['fertilizer_quantities']['mop_kg']} kg")
    
    # Daily tip
    print("\n=== Daily Tip ===")
    tip = engine.get_daily_tip()
    print(f"[{tip['category']}] {tip['tip']}")
