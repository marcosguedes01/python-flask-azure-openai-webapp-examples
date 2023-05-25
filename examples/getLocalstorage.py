from flask import request, jsonify, json

def getLocalstorage():
    data = request.get_json()  # Se você estiver enviando dados JSON
    # ou use request.args para obter parâmetros GET

    # Acesse os dados do localStorage
    value = data['azureOpenaiConfig']  # Substitua 'key' pela chave específica que você deseja obter

    # Faça o processamento necessário
    # ...
    data = json.loads(value)
    azureOpenaiConfig = data["azureOpenaiApiKey"]

    # Retorne a resposta ao JavaScript
    return jsonify(value)