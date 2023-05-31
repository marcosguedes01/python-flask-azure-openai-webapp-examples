const DEFAULT_INPUT_FRIENDSHIP_SUGGESTIONS = [
    {
      "id": 1,
      "name": "João",
      "friendsId": [2, 3, 4],
      "localization": "Brasília"
    },
    {
      "id": 2,
      "name": "Maria",
      "friendsId": [1, 3, 5],
      "localization": "São Paulo"
    },
    {
      "id": 3,
      "name": "Pedro",
      "friendsId": [1, 2, 4, 5],
      "localization": "Rio de Janeiro"
    },
    {
      "id": 4,
      "name": "Ana",
      "friendsId": [1, 3, 5],
      "localization": "Salvador"
    },
    {
      "id": 5,
      "name": "Lucas",
      "friendsId": [2, 3, 4],
      "localization": "Belo Horizonte"
    },
    {
      "id": 6,
      "name": "Mariana",
      "friendsId": [7, 8],
      "localization": "Recife"
    },
    {
      "id": 7,
      "name": "Carlos",
      "friendsId": [6, 8],
      "localization": "Fortaleza"
    },
    {
      "id": 8,
      "name": "Juliana",
      "friendsId": [6, 7],
      "localization": "Manaus"
    },
    {
      "id": 9,
      "name": "Rafael",
      "friendsId": [10],
      "localization": "Porto Alegre"
    },
    {
      "id": 10,
      "name": "Fernanda",
      "friendsId": [9],
      "localization": "Curitiba"
    }
];

// função obrigatório
function fillResultContainer(data) {
    $(".result-text-container").html("<pre style='text-align: left'>" + JSON.stringify(data, undefined, 4) + "</pre>");
}

// função obrigatória
function getOpenaiInputData() {
    return {
        peopleList: JSON.parse($("textarea[name=peopleList]").val()),
        personName: $("input[name=name]").val()
    };
}

// função obrigatória
function fillControls(dataLoaded) {
    if (!dataLoaded) {
        $("textarea[name=peopleList]").val(JSON.stringify(DEFAULT_INPUT_FRIENDSHIP_SUGGESTIONS, undefined, 4)); 
        return;
    };

    $("textarea[name=peopleList]").val(JSON.stringify(dataLoaded.input.peopleList, undefined, 4));
    $("input[name=name]").val(dataLoaded.input.personName);
    $(".select-model-deployment-container select").val(dataLoaded.modelDeployment).change();
}

// função obrigatória
function resetControls() {
    $("textarea[name=peopleList]").val(JSON.stringify(DEFAULT_INPUT_FRIENDSHIP_SUGGESTIONS, undefined, 4));
    $("input[name=name]").val("");
}