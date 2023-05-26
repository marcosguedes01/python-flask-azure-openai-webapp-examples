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

    const data = {
        azureOpenaiConfig: localStorage.getItem('azureOpenaiConfig')
    };

    $.ajax({
        type: "POST",
        url: '/get_localstorage',
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            console.log("response config:", response)
        }
    });
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

        $("ul.model-deployments-options li").last().one("click", function(){
            modelDeploymentsData.splice($(this).index(), 1);
            localStorage.setItem("azureModelDeployments", JSON.stringify(modelDeploymentsData))
            $(this).remove();
            showSuccessMessage('model-deployments-container');
        });
    }
}

function showSuccessMessage(containerClassName) {
    let messageClosed = false;
    $(`.${containerClassName} .alert.alert-success`).removeClass('d-none');
    setTimeout(() => {
        $('.alert.alert-success').addClass('show');
    }, 100);

    $(`.${containerClassName} .alert.alert-success .close`).one( "click", function() {
        $('.alert.alert-success').removeClass('show');
        messageClosed = true;

        setTimeout(() => {
            $('.alert.alert-success').addClass('d-none')
        }, 100);
    });

    setTimeout(() => {
        if (messageClosed) return;

        $(`.${containerClassName} .alert.alert-success`).removeClass('show');
        setTimeout(() => {
            $(`.${containerClassName} .alert.alert-success`).addClass('d-none')
        }, 100);
    }, 3000);
}

function showErrorMessage(containerClassName, errorMessage) {
    let messageClosed = false;

    $(`.${containerClassName} .alert.alert-danger .errorMessage`).text(errorMessage);
    
    $(`.${containerClassName} .alert.alert-danger`).removeClass('d-none');
    setTimeout(() => {
        $('.alert.alert-danger').addClass('show');
    }, 100);

    $(`.${containerClassName} .alert.alert-danger .close`).one( "click", function() {
        $('.alert.alert-danger').removeClass('show');
        messageClosed = true;

        setTimeout(() => {
            $('.alert.alert-danger').addClass('d-none')
        }, 100);
    });

    setTimeout(() => {
        if (messageClosed) return;

        $(`.${containerClassName} .alert.alert-danger`).removeClass('show');
        setTimeout(() => {
            $(`.${containerClassName} .alert.alert-danger`).addClass('d-none')
        }, 100);
    }, 3000);
}