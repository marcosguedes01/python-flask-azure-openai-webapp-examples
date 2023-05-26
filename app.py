from flask import Flask
from routes import routes_bp;
from example_routes import example_routes_bp;
from flask_scss import Scss

app = Flask(__name__)
Scss(app, static_dir='static/styles', asset_dir='assets/scss')

app.register_blueprint(routes_bp)
app.register_blueprint(example_routes_bp)