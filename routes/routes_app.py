from flask import Blueprint, render_template

# Crie um objeto Blueprint
routes_app_bp = Blueprint('routes', __name__)

@routes_app_bp.route("/")
def hello_world():
    return render_template("index.html")

@routes_app_bp.route('/config-openai')
def about():
    return render_template("config-openai.html")