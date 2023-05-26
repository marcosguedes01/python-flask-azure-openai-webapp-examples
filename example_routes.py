from flask import Blueprint, request, jsonify, render_template
from examples.getLocalstorage import getLocalstorage

# Crie um objeto Blueprint
example_routes_bp = Blueprint('example_routes', __name__)

@example_routes_bp.route("/examples/tagline-shop")
def taglineShop():
    return render_template("examples/tagline-shop.html")