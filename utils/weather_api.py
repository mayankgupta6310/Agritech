"""
Weather API Integration
Provides weather data and forecasts for agricultural planning
Uses Open-Meteo API (free, no API key required)
"""

import requests
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class WeatherService:
    """
    Weather data service for agricultural advisory.
    Uses Open-Meteo API (free, no authentication required).
    """
    
    def __init__(self, api_key: str = None):
        self.geocoding_url = "https://geocoding-api.open-meteo.com/v1/search"
        self.weather_url = "https://api.open-meteo.com/v1/forecast"
        self.use_mock = False
        print("Weather service initialized with Open-Meteo API (real data)")
    
    def _get_coordinates(self, location: str) -> tuple:
        """Get latitude and longitude for a location name"""
        try:
            response = requests.get(
                self.geocoding_url,
                params={"name": location, "count": 1, "language": "en"},
                timeout=10
            )
            response.raise_for_status()
            data = response.json()
            
            if data.get("results"):
                result = data["results"][0]
                return result["latitude"], result["longitude"], result.get("name", location)
            return None, None, location
        except Exception as e:
            print(f"Geocoding error: {e}")
            return None, None, location
    
    def get_current_weather(self, location: str = None, lat: float = None, lon: float = None) -> Dict:
        """
        Get current weather conditions.
        
        Args:
            location: City name (e.g., "Delhi", "Mumbai", "Pune")
            lat, lon: Latitude and longitude coordinates
            
        Returns:
            Dict with weather data
        """
        try:
            location_name = location
            
            # Get coordinates if location name provided
            if location and (lat is None or lon is None):
                lat, lon, location_name = self._get_coordinates(location)
            
            if lat is None or lon is None:
                print(f"Could not find coordinates for {location}, using default")
                return self._mock_current_weather(location)
            
            # Fetch real weather data from Open-Meteo
            params = {
                "latitude": lat,
                "longitude": lon,
                "current": "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,surface_pressure",
                "timezone": "auto"
            }
            
            response = requests.get(self.weather_url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            current = data.get("current", {})
            
            # Map weather code to description
            weather_desc = self._get_weather_description(current.get("weather_code", 0))
            
            return {
                'location': location_name,
                'latitude': lat,
                'longitude': lon,
                'temperature': current.get("temperature_2m", 25),
                'feels_like': current.get("apparent_temperature", 25),
                'humidity': current.get("relative_humidity_2m", 70),
                'pressure': current.get("surface_pressure", 1013),
                'wind_speed': current.get("wind_speed_10m", 5),
                'precipitation': current.get("precipitation", 0),
                'description': weather_desc,
                'icon': '01d',
                'timestamp': datetime.now().isoformat(),
                'source': 'Open-Meteo API (Real Data)'
            }
        except Exception as e:
            print(f"Weather API error: {e}")
            return self._mock_current_weather(location)
    
    def _get_weather_description(self, code: int) -> str:
        """Convert WMO weather code to description"""
        weather_codes = {
            0: "Clear sky",
            1: "Mainly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Foggy",
            48: "Depositing rime fog",
            51: "Light drizzle",
            53: "Moderate drizzle",
            55: "Dense drizzle",
            61: "Slight rain",
            63: "Moderate rain",
            65: "Heavy rain",
            71: "Slight snow",
            73: "Moderate snow",
            75: "Heavy snow",
            80: "Slight rain showers",
            81: "Moderate rain showers",
            82: "Violent rain showers",
            95: "Thunderstorm",
            96: "Thunderstorm with hail",
            99: "Thunderstorm with heavy hail"
        }
        return weather_codes.get(code, "Unknown")
    
    def get_forecast(self, location: str = None, days: int = 7) -> List[Dict]:
        """
        Get weather forecast for upcoming days.
        
        Args:
            location: City name
            days: Number of days to forecast (max 7)
            
        Returns:
            List of daily forecasts
        """
        try:
            lat, lon, location_name = self._get_coordinates(location)
            
            if lat is None or lon is None:
                return self._mock_forecast(location, days)
            
            params = {
                "latitude": lat,
                "longitude": lon,
                "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code,relative_humidity_2m_mean",
                "timezone": "auto",
                "forecast_days": min(days, 7)
            }
            
            response = requests.get(self.weather_url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()
            
            daily = data.get("daily", {})
            dates = daily.get("time", [])
            temps_max = daily.get("temperature_2m_max", [])
            temps_min = daily.get("temperature_2m_min", [])
            weather_codes = daily.get("weather_code", [])
            humidity = daily.get("relative_humidity_2m_mean", [])
            precipitation = daily.get("precipitation_sum", [])
            
            forecast = []
            for i in range(min(len(dates), days)):
                date_obj = datetime.strptime(dates[i], "%Y-%m-%d")
                forecast.append({
                    'date': dates[i],
                    'day_name': date_obj.strftime('%A'),
                    'temp_high': temps_max[i] if i < len(temps_max) else 30,
                    'temp_low': temps_min[i] if i < len(temps_min) else 20,
                    'humidity': humidity[i] if i < len(humidity) else 70,
                    'description': self._get_weather_description(weather_codes[i] if i < len(weather_codes) else 0),
                    'precipitation': precipitation[i] if i < len(precipitation) else 0,
                    'rain_chance': min(100, (precipitation[i] if i < len(precipitation) else 0) * 10)
                })
            
            return forecast
        except Exception as e:
            print(f"Forecast API error: {e}")
            return self._mock_forecast(location, days)
    
    def get_agricultural_weather(self, location: str) -> Dict:
        """
        Get weather data formatted for agricultural use.
        Includes farming-specific metrics and recommendations.
        """
        current = self.get_current_weather(location)
        forecast = self.get_forecast(location, 7)
        
        # Calculate agricultural metrics
        avg_temp = sum(f.get('temp_high', 25) + f.get('temp_low', 15) for f in forecast) / (len(forecast) * 2)
        avg_humidity = sum(f.get('humidity', 70) for f in forecast) / len(forecast)
        
        # Rain probability estimation (simplified)
        rain_keywords = ['rain', 'shower', 'drizzle', 'storm', 'thunder']
        rainy_days = sum(1 for f in forecast if any(kw in f.get('description', '').lower() for kw in rain_keywords))
        rain_probability = rainy_days / len(forecast) * 100
        
        # Agricultural recommendations
        recommendations = self._generate_weather_recommendations(current, forecast, rain_probability)
        
        return {
            'location': location,
            'current': current,
            'forecast': forecast,
            'agricultural_metrics': {
                'avg_temperature': round(avg_temp, 1),
                'avg_humidity': round(avg_humidity, 1),
                'rain_probability': round(rain_probability, 1),
                'frost_risk': avg_temp < 5,
                'heat_stress_risk': any(f.get('temp_high', 25) > 38 for f in forecast),
                'suitable_for_spraying': rain_probability < 30 and current.get('wind_speed', 5) < 15
            },
            'recommendations': recommendations
        }
    
    def _generate_weather_recommendations(self, current: Dict, forecast: List, rain_prob: float) -> List[str]:
        """Generate farming recommendations based on weather"""
        recommendations = []
        
        temp = current.get('temperature', 25)
        humidity = current.get('humidity', 70)
        wind = current.get('wind_speed', 5)
        
        # Temperature-based
        if temp > 35:
            recommendations.append("High temperature alert: Increase irrigation frequency")
            recommendations.append("Consider shade nets for sensitive crops")
        elif temp < 10:
            recommendations.append("Low temperature warning: Protect frost-sensitive crops")
            recommendations.append("Delay sowing of summer crops")
        
        # Rain-based
        if rain_prob > 60:
            recommendations.append("High rain probability: Postpone pesticide spraying")
            recommendations.append("Ensure proper field drainage")
        elif rain_prob < 20:
            recommendations.append("Low rain expected: Plan irrigation schedule")
        
        # Humidity-based
        if humidity > 85:
            recommendations.append("High humidity: Monitor for fungal diseases")
        elif humidity < 40:
            recommendations.append("Low humidity: Check soil moisture regularly")
        
        # Wind-based
        if wind > 20:
            recommendations.append("Strong winds: Avoid spraying operations")
            recommendations.append("Secure protective structures")
        
        if not recommendations:
            recommendations.append("Weather conditions are favorable for normal farming activities")
        
        return recommendations
    
    def _mock_current_weather(self, location: str = None) -> Dict:
        """Generate mock weather data for demo"""
        import random
        random.seed(datetime.now().hour)
        
        return {
            'location': location or 'Demo Location',
            'temperature': round(random.uniform(20, 35), 1),
            'feels_like': round(random.uniform(22, 38), 1),
            'humidity': random.randint(50, 85),
            'pressure': random.randint(1000, 1020),
            'wind_speed': round(random.uniform(2, 15), 1),
            'description': random.choice(['Clear sky', 'Partly cloudy', 'Scattered clouds', 'Light rain']),
            'icon': '01d',
            'timestamp': datetime.now().isoformat()
        }
    
    def _mock_forecast(self, location: str = None, days: int = 7) -> List[Dict]:
        """Generate mock forecast data"""
        import random
        random.seed(42)
        
        forecast = []
        base_date = datetime.now()
        
        for i in range(days):
            date = base_date + timedelta(days=i)
            temp_high = round(random.uniform(25, 38), 1)
            temp_low = round(temp_high - random.uniform(8, 15), 1)
            
            forecast.append({
                'date': date.strftime('%Y-%m-%d'),
                'day_name': date.strftime('%A'),
                'temp_high': temp_high,
                'temp_low': temp_low,
                'humidity': random.randint(45, 85),
                'description': random.choice([
                    'Sunny', 'Partly cloudy', 'Cloudy', 
                    'Light rain', 'Clear', 'Scattered clouds'
                ]),
                'rain_chance': random.randint(0, 60)
            })
        
        return forecast


# Example usage
if __name__ == "__main__":
    weather = WeatherService()
    
    # Get current weather
    current = weather.get_current_weather("Delhi")
    print("Current Weather:")
    print(f"  Location: {current['location']}")
    print(f"  Temperature: {current['temperature']}°C")
    print(f"  Humidity: {current['humidity']}%")
    print(f"  Conditions: {current['description']}")
    
    # Get forecast
    print("\n7-Day Forecast:")
    forecast = weather.get_forecast("Delhi", 7)
    for day in forecast:
        print(f"  {day['date']}: {day['temp_low']}°C - {day['temp_high']}°C, {day['description']}")
    
    # Get agricultural weather
    print("\nAgricultural Weather Advisory:")
    agri_weather = weather.get_agricultural_weather("Delhi")
    print(f"  Avg Temperature: {agri_weather['agricultural_metrics']['avg_temperature']}°C")
    print(f"  Rain Probability: {agri_weather['agricultural_metrics']['rain_probability']}%")
    print("\n  Recommendations:")
    for rec in agri_weather['recommendations']:
        print(f"    - {rec}")
