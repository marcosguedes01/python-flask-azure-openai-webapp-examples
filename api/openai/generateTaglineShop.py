from flask import request, jsonify
from service.openai_service import OpenaiService

def generateTaglineShop():
    data = request.get_json()
    input = data['input']
    azureOpenaiApiKey = data['azureOpenaiApiKey']
    azureOpenaiApiEndpoint = data['azureOpenaiApiEndpoint']
    modelDeployment = data['modelDeployment']

    openaiService = OpenaiService(azureOpenaiApiKey, azureOpenaiApiEndpoint)

    prompt = """Crie um slogan criativo para {} sem utilizar a palavra {} no slogan""".format(input, input)

    response = openaiService.execute(modelDeployment, prompt)

    code = """import openai
def generateTaglineShop():
    openai.api_key = AZURE_OPENAI_API_KEY
    openai.api_base = AZURE_OPENAI_API_ENDPOINT
    openai.api_type = 'azure'
    openai.api_version = '2023-05-15'

    modelDeployment = "{}"
    prompt="{}"

    response = openai.Completion.create(
        engine=modelDeployment,
        prompt=prompt,
        max_tokens=100
    )

    return response['choices'][0]['text'].replace('\n', '').replace(' .', '.').strip()""".format(modelDeployment, prompt)

    result = {
        'code': code,
        'result': response
    }

    return jsonify(result)