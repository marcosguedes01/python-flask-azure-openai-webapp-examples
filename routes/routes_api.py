from flask import Blueprint, render_template
from api.openai.generateTaglineShop import generateTaglineShop

# Crie um objeto Blueprint
routes_api_bp = Blueprint('api_routes', __name__)

@routes_api_bp.route("/api/openai/generate-tagline-shop", methods=['POST'])
def taglineShop():
    return generateTaglineShop()