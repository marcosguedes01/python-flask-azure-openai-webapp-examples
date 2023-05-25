from flask import Blueprint, request, jsonify, render_template
from examples.getLocalstorage import getLocalstorage

# Crie um objeto Blueprint
routes_bp = Blueprint('routes', __name__)

@routes_bp.route("/")
def hello_world():
    return render_template("index.html")

@routes_bp.route('/config-openai')
def about():
    return render_template("config-openai.html")

@routes_bp.route('/get_localstorage', methods=['GET', 'POST'])
def get_localstorage():
    return getLocalstorage()