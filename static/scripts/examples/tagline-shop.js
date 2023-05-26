function submitForm(event) {
    event.preventDefault();

    validateFormData(event, 'form-config-openai', executeOpenai);
}

function executeOpenai() {
    const shopName = $("input[name=shopName]").val();
    const azureOpenaiConfigStorage = localStorage.getItem('azureOpenaiConfig');
    const modelDeploymentsStorage = localStorage.getItem("azureModelDeployments");

    if (!azureOpenaiConfigStorage || !modelDeploymentsStorage) {
        alert("Por favor, configure os dados do Azure OpenAI.");
        return;
    }

    const azureOpenaiConfigData = JSON.parse(azureOpenaiConfigStorage);
    const modelDeploymentsData = JSON.parse(modelDeploymentsStorage);

    const data = {
        shopName,
        azureOpenaiApiKey: azureOpenaiConfigData.azureOpenaiApiKey,
        azureOpenaiApiEndpoint: azureOpenaiConfigData.azureOpenaiApiEndpoint,
        modelDeployment: modelDeploymentsData[0].deploymentName
    };

    console.log("data", data);
}