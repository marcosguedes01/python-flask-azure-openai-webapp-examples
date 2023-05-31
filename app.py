from flask import Flask
from routes.routes_app import routes_app_bp;
from routes.routes_api import routes_api_bp
from flask_scss import Scss

app = Flask(__name__)
Scss(app, static_dir='static/styles', asset_dir='assets/scss')

app.register_blueprint(routes_app_bp)
app.register_blueprint(routes_api_bp)