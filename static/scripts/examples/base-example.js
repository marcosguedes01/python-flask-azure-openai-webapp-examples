$(document).ready(function(){
    populateModelDeploymentSelect();
    loadData();
    buttonResetClick();

    function loadData() {
        let storageData;
        const storageName = $("input[name=storageName]").val();
        if (!storageName) return;

        storageData = localStorage.getItem(storageName);     
        if (!storageData) {
            fillControls();
            return;
        };   
    
        const dataLoaded = JSON.parse(storageData);
        if (!dataLoaded) return;
        
        $(".select-model-deployment-container select").val(dataLoaded.modelDeployment).change();

        fillControls(dataLoaded);
        fillResponse(dataLoaded);
    }

    function buttonResetClick() {
        $("form .reset-button").click(function(){
            resetLocalStorageData();
            $(".result-container").fadeOut();
        });
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
});

function resetLocalStorageData(resetControls=true) {
    const storageName = $("input[name=storageName]").val();
    if (storageName) {
        localStorage.removeItem(storageName);
    }
    $("form").removeClass("was-validated");
    
    if (resetControls) resetControls();
}

function fillResponse(response) {
    $(".result-container").fadeOut(function(){
        fillResultContainer(response.result);
        $(".executed-code").text(response.code)

        $(this).fadeIn();
    });
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

function submitForm(event) {
    event.preventDefault();

    validateFormData(event, 'form-example', function(){
        const modelDeployment = $(".select-model-deployment-container select").val();
        const azureOpenaiConfigStorage = localStorage.getItem('azureOpenaiConfig');
        
        if (!azureOpenaiConfigStorage) {
            showErrorMessage("main-container", "Por favor, configure os dados do Azure OpenAI.", false);
            return;
        }

        const azureOpenaiConfigData = JSON.parse(azureOpenaiConfigStorage);
        executeOpenai(azureOpenaiConfigData, modelDeployment);

    });
}

function executeOpenai(azureOpenaiConfigData, modelDeployment) {
    const inputData = getOpenaiInputData();
    const openaiEndpointName = $("input[name=openaiEndpointName]").val();
        
    const data = {
        input: inputData,
        azureOpenaiApiKey: azureOpenaiConfigData.azureOpenaiApiKey,
        azureOpenaiApiEndpoint: azureOpenaiConfigData.azureOpenaiApiEndpoint,
        modelDeployment: modelDeployment
    };

    enableSubmitButton(false);
    
    $.ajax({
        type: "POST",
        url: `/api/openai/${openaiEndpointName}`,
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            console.log("successo", response)
            enableSubmitButton(true);
            if (response) {
                response.input = inputData;
                response.modelDeployment = modelDeployment;

                const storageName = $("input[name=storageName]").val();
                if (storageName) {
                    localStorage.setItem(storageName, JSON.stringify(response));
                }
            }
            
            fillResponse(response);
        },
        error: function (jqXHR, textStatus, errorThrown) { 
            console.log("erro", jqXHR, textStatus, errorThrown)
            enableSubmitButton(true);
            $(".result-container").fadeOut();
            resetLocalStorageData(false);
            showErrorMessage("main-container", "Ocorreu um erro inesperado. Verifique as informações e tente novamente.");
        }
    });
}