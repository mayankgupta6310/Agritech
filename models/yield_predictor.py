"""
Yield Prediction Model
Uses ensemble learning (Random Forest + Gradient Boosting) to predict crop yields
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
import joblib
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import CROPS, SOIL_TYPES, FEATURE_RANGES, MODELS_DIR


class YieldPredictor:
    """
    Machine Learning model for predicting crop yields based on various agricultural factors.
    Uses an ensemble of Random Forest and Gradient Boosting regressors.
    """
    
    def __init__(self, model_path=None):
        self.rf_model = RandomForestRegressor(
            n_estimators=100,
            max_depth=10,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42,
            n_jobs=-1
        )
        self.gb_model = GradientBoostingRegressor(
            n_estimators=100,
            max_depth=6,
            learning_rate=0.1,
            random_state=42
        )
        
        self.scaler = StandardScaler()
        self.crop_encoder = LabelEncoder()
        self.soil_encoder = LabelEncoder()
        
        self.is_trained = False
        self.feature_names = [
            'crop_encoded', 'area', 'soil_encoded', 'rainfall',
            'temperature', 'humidity', 'ph', 'nitrogen',
            'phosphorus', 'potassium', 'fertilizer_used'
        ]
        
        # Pre-fit encoders with known categories
        self.crop_encoder.fit(CROPS)
        self.soil_encoder.fit(SOIL_TYPES)
        
        if model_path and os.path.exists(model_path):
            self.load_model(model_path)
        else:
            # Train with synthetic data if no model exists
            self._train_with_synthetic_data()
    
    def _generate_synthetic_data(self, n_samples=1000):
        """Generate synthetic training data for demonstration"""
        np.random.seed(42)
        
        data = {
            'crop': np.random.choice(CROPS, n_samples),
            'area': np.random.uniform(0.5, 50, n_samples),
            'soil_type': np.random.choice(SOIL_TYPES, n_samples),
            'rainfall': np.random.uniform(500, 2500, n_samples),
            'temperature': np.random.uniform(15, 38, n_samples),
            'humidity': np.random.uniform(40, 90, n_samples),
            'ph': np.random.uniform(5.0, 8.5, n_samples),
            'nitrogen': np.random.uniform(20, 120, n_samples),
            'phosphorus': np.random.uniform(10, 80, n_samples),
            'potassium': np.random.uniform(20, 200, n_samples),
            'fertilizer_used': np.random.uniform(50, 300, n_samples)
        }
        
        df = pd.DataFrame(data)
        
        # Generate yield based on features (realistic relationships)
        base_yields = {
            'Rice': 40, 'Wheat': 35, 'Maize': 50, 'Cotton': 15, 'Sugarcane': 700,
            'Soybean': 25, 'Groundnut': 20, 'Potato': 200, 'Tomato': 250, 'Onion': 180,
            'Mustard': 12, 'Sunflower': 18, 'Barley': 30, 'Millet': 22, 'Sorghum': 28
        }
        
        yields = []
        for _, row in df.iterrows():
            base = base_yields.get(row['crop'], 30)
            
            # Apply modifiers based on conditions
            temp_factor = 1 - abs(row['temperature'] - 25) / 50
            rain_factor = min(row['rainfall'] / 1200, 1.2)
            ph_factor = 1 - abs(row['ph'] - 6.5) / 10
            nutrient_factor = (row['nitrogen'] + row['phosphorus'] + row['potassium']) / 300
            fert_factor = min(row['fertilizer_used'] / 200, 1.1)
            
            # Calculate yield with some randomness
            calculated_yield = base * temp_factor * rain_factor * ph_factor * nutrient_factor * fert_factor
            calculated_yield *= np.random.uniform(0.85, 1.15)  # Add variance
            calculated_yield = max(calculated_yield, base * 0.3)  # Minimum yield
            
            yields.append(calculated_yield)
        
        df['yield'] = yields
        return df
    
    def _train_with_synthetic_data(self):
        """Train model with synthetic data for demonstration"""
        df = self._generate_synthetic_data(2000)
        self.train(df)
    
    def _prepare_features(self, df):
        """Prepare features for model training/prediction"""
        X = pd.DataFrame()
        
        # Encode categorical variables
        X['crop_encoded'] = self.crop_encoder.transform(df['crop'])
        X['area'] = df['area']
        X['soil_encoded'] = self.soil_encoder.transform(df['soil_type'])
        X['rainfall'] = df['rainfall']
        X['temperature'] = df['temperature']
        X['humidity'] = df['humidity']
        X['ph'] = df['ph']
        X['nitrogen'] = df['nitrogen']
        X['phosphorus'] = df['phosphorus']
        X['potassium'] = df['potassium']
        X['fertilizer_used'] = df['fertilizer_used']
        
        return X
    
    def train(self, df, target_col='yield'):
        """
        Train the ensemble model on agricultural data.
        
        Args:
            df: DataFrame with features and target
            target_col: Name of the target column
        """
        X = self._prepare_features(df)
        y = df[target_col]
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train models
        self.rf_model.fit(X_train_scaled, y_train)
        self.gb_model.fit(X_train_scaled, y_train)
        
        # Evaluate
        rf_pred = self.rf_model.predict(X_test_scaled)
        gb_pred = self.gb_model.predict(X_test_scaled)
        ensemble_pred = (rf_pred + gb_pred) / 2
        
        self.metrics = {
            'r2_score': r2_score(y_test, ensemble_pred),
            'rmse': np.sqrt(mean_squared_error(y_test, ensemble_pred)),
            'mae': mean_absolute_error(y_test, ensemble_pred)
        }
        
        self.is_trained = True
        print(f"Model trained - R²: {self.metrics['r2_score']:.4f}, RMSE: {self.metrics['rmse']:.2f}")
        
        return self.metrics
    
    def predict(self, input_data):
        """
        Predict crop yield for given input parameters.
        
        Args:
            input_data: dict or DataFrame with required features
            
        Returns:
            dict with prediction and confidence
        """
        if not self.is_trained:
            raise ValueError("Model is not trained. Call train() first.")
        
        # Convert dict to DataFrame if needed
        if isinstance(input_data, dict):
            input_data = pd.DataFrame([input_data])
        
        # Prepare features
        X = self._prepare_features(input_data)
        X_scaled = self.scaler.transform(X)
        
        # Get predictions from both models
        rf_pred = self.rf_model.predict(X_scaled)
        gb_pred = self.gb_model.predict(X_scaled)
        
        # Ensemble prediction (average)
        ensemble_pred = (rf_pred + gb_pred) / 2
        
        # Calculate confidence based on model agreement
        pred_std = np.std([rf_pred, gb_pred], axis=0)
        confidence = max(0, min(1, 1 - (pred_std / ensemble_pred)))
        
        result = {
            'predicted_yield': round(float(ensemble_pred[0]), 2),
            'unit': 'quintals/hectare',
            'confidence': round(float(confidence[0]) * 100, 1),
            'model_metrics': self.metrics
        }
        
        return result
    
    def predict_batch(self, df):
        """Predict yields for multiple samples"""
        if not self.is_trained:
            raise ValueError("Model is not trained. Call train() first.")
        
        X = self._prepare_features(df)
        X_scaled = self.scaler.transform(X)
        
        rf_pred = self.rf_model.predict(X_scaled)
        gb_pred = self.gb_model.predict(X_scaled)
        ensemble_pred = (rf_pred + gb_pred) / 2
        
        return ensemble_pred.tolist()
    
    def get_feature_importance(self):
        """Get feature importance from the Random Forest model"""
        if not self.is_trained:
            return {}
        
        importance = dict(zip(self.feature_names, self.rf_model.feature_importances_))
        return dict(sorted(importance.items(), key=lambda x: x[1], reverse=True))
    
    def save_model(self, path=None):
        """Save trained model to disk"""
        if path is None:
            os.makedirs(MODELS_DIR, exist_ok=True)
            path = os.path.join(MODELS_DIR, 'yield_predictor.joblib')
        
        model_data = {
            'rf_model': self.rf_model,
            'gb_model': self.gb_model,
            'scaler': self.scaler,
            'crop_encoder': self.crop_encoder,
            'soil_encoder': self.soil_encoder,
            'metrics': self.metrics,
            'feature_names': self.feature_names
        }
        joblib.dump(model_data, path)
        print(f"Model saved to {path}")
    
    def load_model(self, path):
        """Load trained model from disk"""
        model_data = joblib.load(path)
        self.rf_model = model_data['rf_model']
        self.gb_model = model_data['gb_model']
        self.scaler = model_data['scaler']
        self.crop_encoder = model_data['crop_encoder']
        self.soil_encoder = model_data['soil_encoder']
        self.metrics = model_data['metrics']
        self.feature_names = model_data['feature_names']
        self.is_trained = True
        print(f"Model loaded from {path}")


# Example usage
if __name__ == "__main__":
    # Create predictor (auto-trains with synthetic data)
    predictor = YieldPredictor()
    
    # Make a prediction
    sample_input = {
        'crop': 'Rice',
        'area': 5.0,
        'soil_type': 'Alluvial',
        'rainfall': 1200,
        'temperature': 28,
        'humidity': 75,
        'ph': 6.5,
        'nitrogen': 80,
        'phosphorus': 40,
        'potassium': 100,
        'fertilizer_used': 150
    }
    
    result = predictor.predict(sample_input)
    print(f"\nPrediction Result:")
    print(f"  Yield: {result['predicted_yield']} {result['unit']}")
    print(f"  Confidence: {result['confidence']}%")
    
    # Feature importance
    print("\nFeature Importance:")
    for feature, importance in predictor.get_feature_importance().items():
        print(f"  {feature}: {importance:.4f}")
    
    # Save model
    predictor.save_model()
