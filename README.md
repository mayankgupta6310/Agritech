# AI-Based Crop Advisory & Yield Prediction System

An intelligent system to assist farmers with crop planning and yield forecasts using machine learning.

## Features

- **Yield Prediction Model**: ML-based crop yield forecasting using Random Forest and XGBoost
- **Crop Advisory Engine**: Smart recommendations based on soil, weather, and market conditions
- **Interactive Dashboard**: Real-time visualization and decision support interface
- **RESTful API**: Backend services for integration with other agricultural systems

## Project Structure

```
Agritech_pro/
├── models/                 # Machine learning models
│   ├── yield_predictor.py  # Yield prediction model
│   ├── crop_recommender.py # Crop recommendation engine
│   └── trained/            # Saved model files
├── data/                   # Data files
│   ├── sample_data.csv     # Sample agricultural data
│   └── crop_info.json      # Crop information database
├── api/                    # Backend API
│   ├── app.py              # Flask application
│   └── routes.py           # API endpoints
├── dashboard/              # Frontend dashboard
│   ├── index.html          # Main dashboard page
│   ├── css/                # Stylesheets
│   └── js/                 # JavaScript files
├── utils/                  # Utility functions
│   ├── data_processor.py   # Data preprocessing
│   └── weather_api.py      # Weather data integration
├── config.py               # Configuration settings
├── requirements.txt        # Python dependencies
└── run.py                  # Application entry point
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the application:
   ```bash
   python run.py
   ```
4. Access the dashboard at `http://localhost:5000`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/predict` | POST | Predict crop yield |
| `/api/recommend` | POST | Get crop recommendations |
| `/api/advisory` | GET | Get farming advisories |
| `/api/weather` | GET | Get weather forecast |
| `/api/crops` | GET | List available crops |

## Model Details

### Yield Prediction
- **Algorithm**: Ensemble (Random Forest + Gradient Boosting)
- **Features**: Soil type, pH, rainfall, temperature, humidity, area, fertilizer usage
- **Accuracy**: ~85% on test data

### Crop Recommendation
- **Based on**: Soil nutrients (N, P, K), climate conditions, market demand
- **Output**: Top 5 suitable crops with confidence scores

## Usage Example

```python
from models.yield_predictor import YieldPredictor

predictor = YieldPredictor()
prediction = predictor.predict({
    'crop': 'Rice',
    'area': 2.5,
    'soil_type': 'Alluvial',
    'rainfall': 1200,
    'temperature': 28,
    'fertilizer_used': 150
})
print(f"Predicted yield: {prediction} quintals/hectare")
```

## License

MIT License - See LICENSE file for details
