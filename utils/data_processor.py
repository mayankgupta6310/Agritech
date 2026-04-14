"""
Data Processing Utilities
Functions for loading, cleaning, and preprocessing agricultural data
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Optional, Tuple
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import FEATURE_RANGES, CROPS, SOIL_TYPES


class DataProcessor:
    """
    Utility class for processing agricultural data.
    Handles data cleaning, validation, normalization, and feature engineering.
    """
    
    def __init__(self):
        self.feature_ranges = FEATURE_RANGES
        self.valid_crops = CROPS
        self.valid_soils = SOIL_TYPES
    
    def load_csv(self, filepath: str) -> pd.DataFrame:
        """Load data from CSV file"""
        if not os.path.exists(filepath):
            raise FileNotFoundError(f"File not found: {filepath}")
        
        df = pd.read_csv(filepath)
        print(f"Loaded {len(df)} records from {filepath}")
        return df
    
    def clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Clean and preprocess the dataset.
        - Handles missing values
        - Removes duplicates
        - Standardizes column names
        """
        # Create a copy
        df = df.copy()
        
        # Standardize column names (lowercase, replace spaces with underscores)
        df.columns = df.columns.str.lower().str.replace(' ', '_')
        
        # Remove duplicate rows
        initial_len = len(df)
        df = df.drop_duplicates()
        if len(df) < initial_len:
            print(f"Removed {initial_len - len(df)} duplicate rows")
        
        # Handle missing values
        for col in df.columns:
            if df[col].isnull().sum() > 0:
                if df[col].dtype in ['float64', 'int64']:
                    # Fill numeric columns with median
                    df[col].fillna(df[col].median(), inplace=True)
                else:
                    # Fill categorical columns with mode
                    df[col].fillna(df[col].mode()[0], inplace=True)
        
        return df
    
    def validate_input(self, data: Dict) -> Tuple[bool, List[str]]:
        """
        Validate input data for prediction.
        Returns tuple of (is_valid, list of error messages)
        """
        errors = []
        
        # Required fields for yield prediction
        required_fields = ['crop', 'area', 'soil_type', 'temperature', 'rainfall']
        for field in required_fields:
            if field not in data:
                errors.append(f"Missing required field: {field}")
        
        if errors:
            return False, errors
        
        # Validate crop
        if data['crop'] not in self.valid_crops:
            errors.append(f"Invalid crop. Must be one of: {', '.join(self.valid_crops)}")
        
        # Validate soil type
        if data['soil_type'] not in self.valid_soils:
            errors.append(f"Invalid soil type. Must be one of: {', '.join(self.valid_soils)}")
        
        # Validate numeric ranges
        validations = [
            ('temperature', 0, 50, '°C'),
            ('rainfall', 0, 5000, 'mm'),
            ('area', 0.01, 1000, 'hectares'),
            ('ph', 3.0, 10.0, ''),
            ('humidity', 0, 100, '%'),
            ('nitrogen', 0, 200, 'kg/ha'),
            ('phosphorus', 0, 150, 'kg/ha'),
            ('potassium', 0, 300, 'kg/ha')
        ]
        
        for field, min_val, max_val, unit in validations:
            if field in data:
                try:
                    value = float(data[field])
                    if value < min_val or value > max_val:
                        errors.append(f"{field} must be between {min_val} and {max_val} {unit}")
                except (ValueError, TypeError):
                    errors.append(f"{field} must be a numeric value")
        
        return len(errors) == 0, errors
    
    def normalize_features(self, df: pd.DataFrame, columns: List[str] = None) -> pd.DataFrame:
        """
        Normalize numeric features to 0-1 range.
        """
        df = df.copy()
        
        if columns is None:
            columns = df.select_dtypes(include=[np.number]).columns.tolist()
        
        for col in columns:
            if col in self.feature_ranges:
                min_val, max_val = self.feature_ranges[col]
            else:
                min_val, max_val = df[col].min(), df[col].max()
            
            if max_val > min_val:
                df[col] = (df[col] - min_val) / (max_val - min_val)
        
        return df
    
    def engineer_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """
        Create additional features from existing data.
        """
        df = df.copy()
        
        # Create nutrient balance ratio if NPK values exist
        if all(col in df.columns for col in ['nitrogen', 'phosphorus', 'potassium']):
            df['npk_total'] = df['nitrogen'] + df['phosphorus'] + df['potassium']
            df['n_ratio'] = df['nitrogen'] / (df['npk_total'] + 0.001)
            df['p_ratio'] = df['phosphorus'] / (df['npk_total'] + 0.001)
            df['k_ratio'] = df['potassium'] / (df['npk_total'] + 0.001)
        
        # Create temperature-rainfall interaction
        if 'temperature' in df.columns and 'rainfall' in df.columns:
            df['temp_rain_index'] = (df['temperature'] * df['rainfall']) / 1000
        
        # pH category
        if 'ph' in df.columns:
            df['ph_category'] = pd.cut(
                df['ph'], 
                bins=[0, 5.5, 6.5, 7.5, 14],
                labels=['Acidic', 'Slightly_Acidic', 'Neutral', 'Alkaline']
            )
        
        return df
    
    def prepare_for_prediction(self, data: Dict, fill_defaults: bool = True) -> Dict:
        """
        Prepare input data for model prediction.
        Fills in default values for missing optional fields.
        """
        prepared = data.copy()
        
        # Default values for optional fields
        defaults = {
            'humidity': 70,
            'ph': 6.5,
            'nitrogen': 50,
            'phosphorus': 30,
            'potassium': 60,
            'fertilizer_used': 100
        }
        
        if fill_defaults:
            for field, default in defaults.items():
                if field not in prepared or prepared[field] is None:
                    prepared[field] = default
        
        return prepared
    
    def generate_sample_data(self, n_samples: int = 100) -> pd.DataFrame:
        """Generate sample agricultural data for testing"""
        np.random.seed(42)
        
        data = {
            'crop': np.random.choice(self.valid_crops, n_samples),
            'area': np.random.uniform(0.5, 25, n_samples).round(2),
            'soil_type': np.random.choice(self.valid_soils, n_samples),
            'temperature': np.random.uniform(15, 38, n_samples).round(1),
            'humidity': np.random.uniform(40, 90, n_samples).round(1),
            'rainfall': np.random.uniform(400, 2200, n_samples).round(0),
            'ph': np.random.uniform(5.0, 8.0, n_samples).round(2),
            'nitrogen': np.random.uniform(20, 120, n_samples).round(1),
            'phosphorus': np.random.uniform(10, 80, n_samples).round(1),
            'potassium': np.random.uniform(20, 180, n_samples).round(1),
            'fertilizer_used': np.random.uniform(50, 250, n_samples).round(1)
        }
        
        return pd.DataFrame(data)
    
    def get_data_summary(self, df: pd.DataFrame) -> Dict:
        """Get statistical summary of the dataset"""
        summary = {
            'total_records': len(df),
            'columns': list(df.columns),
            'numeric_summary': {},
            'categorical_summary': {}
        }
        
        # Numeric columns
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        for col in numeric_cols:
            summary['numeric_summary'][col] = {
                'mean': round(df[col].mean(), 2),
                'std': round(df[col].std(), 2),
                'min': round(df[col].min(), 2),
                'max': round(df[col].max(), 2),
                'missing': int(df[col].isnull().sum())
            }
        
        # Categorical columns
        categorical_cols = df.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            summary['categorical_summary'][col] = {
                'unique': int(df[col].nunique()),
                'top_values': df[col].value_counts().head(5).to_dict(),
                'missing': int(df[col].isnull().sum())
            }
        
        return summary


# Example usage
if __name__ == "__main__":
    processor = DataProcessor()
    
    # Generate sample data
    sample_df = processor.generate_sample_data(50)
    print("Sample Data Generated:")
    print(sample_df.head())
    
    # Validate input
    test_input = {
        'crop': 'Rice',
        'area': 5.0,
        'soil_type': 'Alluvial',
        'temperature': 28,
        'rainfall': 1200
    }
    
    is_valid, errors = processor.validate_input(test_input)
    print(f"\nValidation Result: {'Valid' if is_valid else 'Invalid'}")
    if errors:
        print(f"Errors: {errors}")
    
    # Prepare for prediction
    prepared = processor.prepare_for_prediction(test_input)
    print(f"\nPrepared Input: {prepared}")
    
    # Get data summary
    summary = processor.get_data_summary(sample_df)
    print(f"\nData Summary: {summary['total_records']} records")
