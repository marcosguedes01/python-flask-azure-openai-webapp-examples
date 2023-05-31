from flask import request, jsonify, json
from service.openai_service import OpenaiService
from api.openai.generateCodeToResult import generateCodeToResult

def generateProductsSuggestions():
    data = request.get_json()
    productList = data['input']['productList']
    productName = data['input']['productName']
    azureOpenaiApiKey = data['azureOpenaiApiKey']
    azureOpenaiApiEndpoint = data['azureOpenaiApiEndpoint']
    modelDeployment = data['modelDeployment']

    openaiService = OpenaiService(azureOpenaiApiKey, azureOpenaiApiEndpoint)

    prompt = """Considere as seguintes itens: {}
retorne sugestões de itens que tenham alguma particularidade com {}
returne apenas um array de json no seguinte formato {{ "id": 1, "productName": "nome da item", "productType": "tipo do item" }}""".format(json.dumps(productList), productName)

    response = openaiService.execute(modelDeployment, prompt, 250)

    code = generateCodeToResult(modelDeployment, prompt)

    result = {
        'code': code,
        'result': json.loads(response)
    }

    return jsonify(result)