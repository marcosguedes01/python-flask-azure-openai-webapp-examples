$(document).ready(function(){
    loadConfigOpenaiData();
    loadModelDeploymentsData();
});

function submitConfigOpenaiForm(event) {
    event.preventDefault();

    validateFormData(event, 'form-config-openai', saveConfigOpenaiData);
}

function submitModelDeploymentsForm(event) {
    event.preventDefault();

    validateFormData(event, 'form-config-model-deployments', addModelDeploymentData);
}

function saveConfigOpenaiData() {
    const data = $("#form-config-openai").serializeObject();
    
    localStorage.setItem("azureOpenaiConfig", JSON.stringify(data))

    showSuccessMessage('config-openai-container');
}

function addModelDeploymentData() {
    let modelDeploymentsData = [];
    const modelDeploymentsStorage = localStorage.getItem("azureModelDeployments");
    if (modelDeploymentsStorage) modelDeploymentsData = JSON.parse(modelDeploymentsStorage);
    
    const data = $("#form-config-model-deployments").serializeObject();

    const filter = modelDeploymentsData.some(p => p.deploymentName == data.deploymentName);
    if (filter) {
        showErrorMessage('model-deployments-container', `Já existe um model deployment com o nome "${data.deploymentName}" cadastrado.`);
        return;
    }    

    modelDeploymentsData.push(data);
    
    localStorage.setItem("azureModelDeployments", JSON.stringify(modelDeploymentsData))

    showSuccessMessage('model-deployments-container');
    loadModelDeploymentsData();
    
    setTimeout(() => {
        $("#form-config-model-deployments").removeClass("was-validated");
        $("input[name=deploymentName]").val("");    
    }, 100);    
}

function loadConfigOpenaiData() {
    const azureOpenaiConfigStorage = localStorage.getItem("azureOpenaiConfig");
    if (!azureOpenaiConfigStorage) return;

    const azureOpenaiConfigData = JSON.parse(azureOpenaiConfigStorage);
    $("input[name=azureOpenaiApiKey]").val(azureOpenaiConfigData.azureOpenaiApiKey);
    $("input[name=azureOpenaiApiEndpoint]").val(azureOpenaiConfigData.azureOpenaiApiEndpoint);
}

function loadModelDeploymentsData() {
    let modelDeploymentsData = [];
    const modelDeploymentsStorage = localStorage.getItem("azureModelDeployments");
    if (modelDeploymentsStorage) modelDeploymentsData = JSON.parse(modelDeploymentsStorage);

    $("ul.model-deployments-options").empty();
    for (let index = 0; index < modelDeploymentsData.length; index++) {
        const element = modelDeploymentsData[index];
        
        $("ul.model-deployments-options").append(`<li class="list-group-item d-flex justify-content-between lh-condensed">\
                    <div>\
                        <h6 class="my-0">${element.deploymentName}</h6>\
                    </div>\
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
                        <span aria-hidden="true">&times;</span>\
                    </button>\
                </li>`);

        $("ul.model-deployments-options li button").last().one("click", function(){
            modelDeploymentsData.splice($(this).closest("li").index(), 1);
            localStorage.setItem("azureModelDeployments", JSON.stringify(modelDeploymentsData))
            $(this).closest("li").remove();
            showSuccessMessage('model-deployments-container');
        });
    }
}