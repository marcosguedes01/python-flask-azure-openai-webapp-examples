// função obrigatória
function getOpenaiInputData() {
    const shopName = $("input[name=shopName]").val();
    return shopName;
}

// função obrigatória
function fillControls(dataLoaded) {
    if (!dataLoaded) return;

    $("input[name=shopName]").val(dataLoaded.input);
}

// função obrigatória
function resetControls() {
    $("input[name=shopName]").val("");
}

// função obrigatório
function fillResultContainer(data) {
    $(".result-text-container").text(data);
}