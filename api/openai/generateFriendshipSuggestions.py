from flask import request, jsonify, json
from service.openai_service import OpenaiService
from api.openai.generateCodeToResult import generateCodeToResult

def generateFriendshipSuggestions():
    data = request.get_json()
    peopleList = data['input']['peopleList']
    personName = data['input']['personName']
    azureOpenaiApiKey = data['azureOpenaiApiKey']
    azureOpenaiApiEndpoint = data['azureOpenaiApiEndpoint']
    modelDeployment = data['modelDeployment']

    openaiService = OpenaiService(azureOpenaiApiKey, azureOpenaiApiEndpoint)

    prompt = """Considere as seguintes pessoas: {}
retorne sugestões de pessoas que podem conhecer {}
returne apenas um array de json no seguinte formato {{ "id": 1, "name": "nome da pessoa" }}
não inclua {} no retorno""".format(json.dumps(peopleList), personName, personName)

    response = openaiService.execute(modelDeployment, prompt)

    code = generateCodeToResult(modelDeployment, prompt)

    result = {
        'code': code,
        'result': json.loads(response)
    }

    return jsonify(result)