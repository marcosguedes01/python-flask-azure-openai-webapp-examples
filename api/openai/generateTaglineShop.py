from flask import request, jsonify
from service.openai_service import OpenaiService
from api.openai.generateCodeToResult import generateCodeToResult

def generateTaglineShop():
    data = request.get_json()
    input = data['input']
    azureOpenaiApiKey = data['azureOpenaiApiKey']
    azureOpenaiApiEndpoint = data['azureOpenaiApiEndpoint']
    modelDeployment = data['modelDeployment']

    openaiService = OpenaiService(azureOpenaiApiKey, azureOpenaiApiEndpoint)

    prompt = """Crie um slogan criativo para {} sem utilizar a palavra {} no slogan""".format(input, input)

    response = openaiService.execute(modelDeployment, prompt)

    code = generateCodeToResult(modelDeployment, prompt)

    result = {
        'code': code,
        'result': response
    }

    return jsonify(result)