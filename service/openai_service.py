import openai

class OpenaiService:
    def __init__(self, apiKey, apiEndpoint) -> None:
        self.__apiKey = apiKey
        self.__apiEndpoint = apiEndpoint

    
    def execute(self, modelDeployment, prompt):
        openai.api_key = self.__apiKey
        openai.api_base = self.__apiEndpoint
        openai.api_type = 'azure'
        openai.api_version = '2023-05-15'

        response = openai.Completion.create(
            engine=modelDeployment,
            prompt=prompt,
            max_tokens=100
        )
        
        return response['choices'][0]['text'].replace('\n', '').replace(' .', '.').strip()