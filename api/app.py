"""
Flask Application - Main Entry Point
API for Crop Advisory & Yield Prediction System
"""

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import sys

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import APP_NAME, VERSION, DEBUG, HOST, PORT
from api.routes import register_routes

def create_app():
    """Create and configure the Flask application"""
    
    # Initialize Flask app
    app = Flask(__name__, 
                static_folder='../dashboard',
                static_url_path='')
    
    # Enable CORS
    CORS(app)
    
    # Configuration
    app.config['APP_NAME'] = APP_NAME
    app.config['VERSION'] = VERSION
    app.config['DEBUG'] = DEBUG
    
    # Register API routes
    register_routes(app)
    
    # Serve dashboard
    @app.route('/')
    def serve_dashboard():
        """Serve the main dashboard page"""
        return send_from_directory(app.static_folder, 'index.html')
    
    @app.route('/health')
    def health_check():
        """Health check endpoint"""
        return jsonify({
            'status': 'healthy',
            'app': APP_NAME,
            'version': VERSION
        })
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404
    
    @app.errorhandler(500)
    def server_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    return app


# Create app instance
app = create_app()

if __name__ == '__main__':
    print(f"\n{'='*50}")
    print(f"  {APP_NAME}")
    print(f"  Version: {VERSION}")
    print(f"{'='*50}")
    print(f"\nStarting server at http://{HOST}:{PORT}")
    print("Press Ctrl+C to stop\n")
    
    app.run(host=HOST, port=PORT, debug=DEBUG)
