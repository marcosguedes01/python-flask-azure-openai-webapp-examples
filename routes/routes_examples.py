from flask import Blueprint, render_template

# Crie um objeto Blueprint
routes_examples_bp = Blueprint('example_routes', __name__)

@routes_examples_bp.route("/examples/tagline-shop")
def taglineShop():
    return render_template("examples/tagline-shop.html")