"""
Configuration settings for the Crop Advisory & Yield Prediction System
"""

import os
from datetime import datetime

# Application Settings
APP_NAME = "AgriTech Pro - Crop Advisory System"
VERSION = "1.0.0"
DEBUG = True

# Server Configuration
HOST = "0.0.0.0"
PORT = 5000

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
MODELS_DIR = os.path.join(BASE_DIR, "models", "trained")

# Model Configuration
MODEL_CONFIG = {
    "yield_predictor": {
        "algorithm": "ensemble",
        "n_estimators": 100,
        "max_depth": 10,
        "random_state": 42
    },
    "crop_recommender": {
        "n_recommendations": 5,
        "confidence_threshold": 0.6
    }
}

# Supported Crops
CROPS = [
    "Rice", "Wheat", "Maize", "Cotton", "Sugarcane",
    "Soybean", "Groundnut", "Potato", "Tomato", "Onion",
    "Mustard", "Sunflower", "Barley", "Millet", "Sorghum"
]

# Soil Types
SOIL_TYPES = [
    "Alluvial", "Black", "Red", "Laterite", "Desert",
    "Mountain", "Loamy", "Sandy", "Clay", "Peaty"
]

# Seasons
SEASONS = ["Kharif", "Rabi", "Zaid"]

# Weather API Configuration (placeholder - replace with actual API key)
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY", "demo_key")
WEATHER_API_URL = "https://api.openweathermap.org/data/2.5"

# Advisory Categories
ADVISORY_CATEGORIES = [
    "Planting", "Irrigation", "Fertilization", "Pest Control",
    "Harvesting", "Storage", "Market", "Weather Alert"
]

# Feature ranges for normalization
FEATURE_RANGES = {
    "temperature": (10, 45),  # Celsius
    "humidity": (20, 100),    # Percentage
    "rainfall": (0, 3000),    # mm per year
    "ph": (4.0, 9.0),         # Soil pH
    "nitrogen": (0, 150),     # kg/ha
    "phosphorus": (0, 100),   # kg/ha
    "potassium": (0, 250),    # kg/ha
    "area": (0.1, 100)        # hectares
}

# Current Season Detection
def get_current_season():
    month = datetime.now().month
    if month in [6, 7, 8, 9, 10]:
        return "Kharif"
    elif month in [11, 12, 1, 2, 3]:
        return "Rabi"
    else:
        return "Zaid"
