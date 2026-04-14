"""
AgriTech Pro - Application Entry Point
Run this file to start the Crop Advisory & Yield Prediction System
"""

import sys
import os

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from api.app import app
from config import HOST, PORT, DEBUG, APP_NAME, VERSION


def main():
    """Main entry point for the application"""
    
    print("\n" + "=" * 60)
    print(f"  {APP_NAME}")
    print(f"  Version: {VERSION}")
    print("=" * 60)
    print("\n  Starting server...")
    print(f"  Dashboard URL: http://localhost:{PORT}")
    print(f"  API Base URL: http://localhost:{PORT}/api")
    print("\n  Available API Endpoints:")
    print("    POST /api/predict          - Yield prediction")
    print("    POST /api/recommend        - Crop recommendations")
    print("    GET  /api/advisory         - Seasonal advisory")
    print("    GET  /api/weather          - Weather data")
    print("    GET  /api/crops            - List all crops")
    print("\n  Press Ctrl+C to stop the server")
    print("=" * 60 + "\n")
    
    try:
        app.run(host=HOST, port=PORT, debug=DEBUG)
    except KeyboardInterrupt:
        print("\n\nServer stopped.")
        sys.exit(0)


if __name__ == '__main__':
    main()
