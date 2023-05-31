from flask import Blueprint, render_template
from api.openai.generateTaglineShop import generateTaglineShop
from api.openai.generateFriendshipSuggestions import generateFriendshipSuggestions
from api.openai.generateProductsSuggestions import generateProductsSuggestions

# Crie um objeto Blueprint
routes_api_bp = Blueprint('api_routes', __name__)

@routes_api_bp.route("/api/openai/generate-tagline-shop", methods=['POST'])
def taglineShop():
    return generateTaglineShop()

@routes_api_bp.route("/api/openai/friendship-suggestion", methods=['POST'])
def friendshipSuggestion():
    return generateFriendshipSuggestions()

@routes_api_bp.route("/api/openai/products-suggestion", methods=['POST'])
def productsSuggestion():
    return generateProductsSuggestions()