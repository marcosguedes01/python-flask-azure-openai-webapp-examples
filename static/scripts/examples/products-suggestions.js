const DEFAULT_INPUT_PRODUCTS_SUGGESTIONS = [
  {
    "id": 1,
    "productName": "Smart TV Samsung",
    "productType": "Eletrônico"
  },
  {
    "id": 2,
    "productName": "Televisor Philco",
    "productType": "Eletrônico"
  },
  {
    "id": 3,
    "productName": "Aparelho de Som",
    "productType": "Eletrônico"
  },
  {
    "id": 4,
    "productName": "Som Automotivo",
    "productType": "Eletrônico"
  },
  {
    "id": 5,
    "productName": "Mesa para Cozinha",
    "productType": "Móveis"
  },
  {
    "id": 6,
    "productName": "Mesa para Jardim",
    "productType": "Móveis"
  },
  {
    "id": 7,
    "productName": "Celular Samsung",
    "productType": "Eletrônico"
  },
  {
    "id": 8,
    "productName": "Celular iPhone",
    "productType": "Eletrônico"
  },
  {
    "id": 9,
    "productName": "Notebook Dell",
    "productType": "Eletrônico"
  },
  {
    "id": 10,
    "productName": "Notebook HP",
    "productType": "Eletrônico"
  },
  {
    "id": 11,
    "productName": "Mouse Logitech",
    "productType": "Acessórios de Computador"
  },
  {
    "id": 12,
    "productName": "Teclado Microsoft",
    "productType": "Acessórios de Computador"
  },
  {
    "id": 13,
    "productName": "Fone de Ouvido Sony",
    "productType": "Eletrônico"
  },
  {
    "id": 14,
    "productName": "Caixa de Som Bluetooth",
    "productType": "Eletrônico"
  },
  {
    "id": 15,
    "productName": "Câmera Canon",
    "productType": "Eletrônico"
  },
  {
    "id": 16,
    "productName": "Câmera Nikon",
    "productType": "Eletrônico"
  },
  {
    "id": 17,
    "productName": "Relógio Casio",
    "productType": "Acessórios"
  },
  {
    "id": 18,
    "productName": "Relógio Rolex",
    "productType": "Acessórios"
  },
  {
    "id": 19,
    "productName": "Tênis Nike",
    "productType": "Calçados"
  },
  {
    "id": 20,
    "productName": "Tênis Adidas",
    "productType": "Calçados"
  },
  {
    "id": 21,
    "productName": "Bolsa Louis Vuitton",
    "productType": "Acessórios"
  },
  {
    "id": 22,
    "productName": "Bolsa Gucci",
    "productType": "Acessórios"
  },
  {
    "id": 23,
    "productName": "Camiseta Polo",
    "productType": "Roupas"
  },
  {
    "id": 24,
    "productName": "Camiseta Nike",
    "productType": "Roupas"
  },
  {
    "id": 25,
    "productName": "Calça Jeans Levi's",
    "productType": "Roupas"
  },
  {
    "id": 26,
    "productName": "Calça Jeans Diesel",
    "productType": "Roupas"
  },
  {
    "id": 27,
    "productName": "Óculos de Sol Ray-Ban",
    "productType": "Acessórios"
  },
  {
    "id": 28,
    "productName": "Óculos de Sol Oakley",
    "productType": "Acessórios"
  },
  {
    "id": 29,
    "productName": "Perfume Chanel",
    "productType": "Perfumes"
  },
  {
    "id": 30,
    "productName": "Perfume Dior",
    "productType": "Perfumes"
  }
]
;

// função obrigatório
function fillResultContainer(data) {
    $(".result-text-container").html("<pre style='text-align: left'>" + JSON.stringify(data, undefined, 4) + "</pre>");
}

// função obrigatória
function getOpenaiInputData() {
    return {
        productList: JSON.parse($("textarea[name=productList]").val()),
        productName: $("input[name=productName]").val()
    };
}

// função obrigatória
function fillControls(dataLoaded) {
    if (!dataLoaded) {
        $("textarea[name=productList]").val(JSON.stringify(DEFAULT_INPUT_PRODUCTS_SUGGESTIONS, undefined, 4)); 
        return;
    };

    $("textarea[name=productList]").val(JSON.stringify(dataLoaded.input.productList, undefined, 4));
    $("input[name=productName]").val(dataLoaded.input.productName);
    $(".select-model-deployment-container select").val(dataLoaded.modelDeployment).change();
}

// função obrigatória
function resetControls() {
    $("textarea[name=productList]").val(JSON.stringify(DEFAULT_INPUT_PRODUCTS_SUGGESTIONS, undefined, 4));
    $("input[name=productName]").val("");
}