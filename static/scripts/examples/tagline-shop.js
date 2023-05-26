$(document).ready(function(){
    populateModelDeploymentSelect();
    loadData();
    buttonResetClick();
});

function buttonResetClick() {
    $("form button[type=button]").click(function(){
        resetLocalStorageData();
        $(".result-container").fadeOut();
    });
}

function resetLocalStorageData() {
    localStorage.removeItem("lastTaglineShop");
}

function submitForm(event) {
    event.preventDefault();

    validateFormData(event, 'form-config-openai', executeOpenai);
}

function enableSubmitButton(enable) {
    const submitButton = $("form button[type=submit]");
    const buttonText = enable ? "Executar" : "Executando...";

    $(submitButton).prop("disabled", !enable);
    $(submitButton).children(".text").text(buttonText);

    if (enable) {        
        $(submitButton).children(".spinner").addClass("d-none");        
    } else {
        $(submitButton).children(".spinner").removeClass("d-none");
    }
}

function executeOpenai() {
    const shopName = $("input[name=shopName]").val();
    const modelDeployment = $(".select-model-deployment-container select").val();
    const azureOpenaiConfigStorage = localStorage.getItem('azureOpenaiConfig');
    
    if (!azureOpenaiConfigStorage) {
        showErrorMessage("main-container", "Por favor, configure os dados do Azure OpenAI.", false);
        return;
    }

    const azureOpenaiConfigData = JSON.parse(azureOpenaiConfigStorage);
    
    const data = {
        input: shopName,
        azureOpenaiApiKey: azureOpenaiConfigData.azureOpenaiApiKey,
        azureOpenaiApiEndpoint: azureOpenaiConfigData.azureOpenaiApiEndpoint,
        modelDeployment: modelDeployment
    };

    enableSubmitButton(false);
    
    $.ajax({
        type: "POST",
        url: '/api/openai/generate-tagline-shop',
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            enableSubmitButton(true);
            if (response) {
                response.input = shopName;
                response.modelDeployment = modelDeployment;
                localStorage.setItem("lastTaglineShop", JSON.stringify(response));
            }
            
            fillResponse(response);
        },
        error: function (jqXHR, textStatus, errorThrown) { 
            enableSubmitButton(true);
            $(".result-container").fadeOut();
            resetLocalStorageData();
            showErrorMessage("main-container", "Ocorreu um erro inesperado. Verifique as informações e tente novamente.");
            // console.log("jqXHR", jqXHR);
            // console.log("jqXHR.responseJSON", jqXHR.responseJSON);
            // console.log("textStatus", textStatus);
            // console.log("errorThrown", errorThrown);
        }
    });
}

function fillResponse(response) {
    $(".result-container").fadeOut(function(){
        $(".result-text-container").text(response.result);
        $(".executed-code").text(response.code)

        $(this).fadeIn();
    });
}

function loadData() {
    const lastTaglineShopStorage = localStorage.getItem("lastTaglineShop");
    if (!lastTaglineShopStorage) return;

    lastTaglineShop = JSON.parse(lastTaglineShopStorage);

    console.log("lastTaglineShop", lastTaglineShop)

    $("input[name=shopName]").val(lastTaglineShop.input);
    $(".select-model-deployment-container select").val(lastTaglineShop.modelDeployment).change();
    fillResponse(lastTaglineShop);
}

function populateModelDeploymentSelect() {
    const modelDeploymentsStorage = localStorage.getItem("azureModelDeployments");
    if (!modelDeploymentsStorage) return;
    
    const modelDeploymentsData = JSON.parse(modelDeploymentsStorage);

    for (let index = 0; index < modelDeploymentsData.length; index++) {
        const element = modelDeploymentsData[index];
        $(".select-model-deployment-container select").append(`"<option value="${element.deploymentName}">${element.deploymentName}</option>"`);
    }
}