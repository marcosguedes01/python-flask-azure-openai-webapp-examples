def generateCodeToResult(modelDeployment, prompt):
    return """import openai
def generateFriendshipSuggestions():
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