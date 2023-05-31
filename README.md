# Create a new virtual environment:

   ```bash
   $ python -m venv webapp-venv
   $ # Linux:
   $ . webapp-venv/bin/activate
   $ # Windows:
   $ #. webapp-venv/Scripts/Activate
   ```

# Install requirements
```bash
$ pip install -r requirements.txt
```

# Executing examples
```bash
$ python examples/001.quickstart.py
$ python examples/002.suggest_animal_names.py
$ python examples/003.says_this_is_a_test.py
$ python examples/004.filter-data.py
$ python examples/005.filter-people-by-location.py
$ python examples/006.filter-people-by-friends.py
```

# Executing application
```bash
$ flask --app main run
$ # Debug mod
$ # flask --app app.py --debug run
```

# Modelos disponíveis no Azure Openai

1. code-davinci-002:
   - Indicação de uso: Este modelo é projetado especificamente para ajudar com tarefas relacionadas a código, como autocompletar código, escrever funções, fornecer sugestões de correção de erros e assim por diante.
   - Exemplo: "Dada uma função em Python que recebe uma lista de números como entrada, complete o código para retornar a soma de todos os números."

2. gpt-3.5-turbo:
   - Indicação de uso: Este modelo é uma versão turbo do GPT-3.5, que pode ser usado para uma ampla variedade de tarefas de linguagem natural, como geração de texto, respostas a perguntas, tradução, redação criativa, suporte ao cliente, chatbots e muito mais.
   - Exemplo: "Escreva um resumo sobre a importância da inteligência artificial na sociedade moderna."

3. text-ada-001:
   - Indicação de uso: Este modelo é uma versão da Ada, treinada para gerar respostas detalhadas e informativas em uma ampla gama de tópicos. É especialmente útil para consultas de pesquisa e tarefas que requerem uma compreensão profunda do assunto.
   - Exemplo: "Qual é a teoria da relatividade e quais são suas principais contribuições para a física?"

4. text-babbage-001:
   - Indicação de uso: Este modelo é uma versão do Babbage, projetada para fornecer explicações concisas e simplificadas sobre tópicos complexos. É útil quando se deseja uma resposta mais direta e fácil de entender.
   - Exemplo: "Explique o conceito de aprendizado de máquina de forma simples."

5. text-curie-001:
   - Indicação de uso: Este modelo é uma versão do Curie, desenvolvida para produzir respostas bem fundamentadas e detalhadas. Pode ser usado para várias tarefas de linguagem natural, como geração de texto, respostas a perguntas, resumos e muito mais.
   - Exemplo: "Qual é a diferença entre aprendizado supervisionado e não supervisionado?"

6. text-davinci-002:
   - Indicação de uso: Este modelo é uma versão do Davinci, que é o modelo mais poderoso disponível no Azure OpenAI. Ele pode ser usado para tarefas complexas de linguagem natural, como redação criativa, tradução avançada, respostas detalhadas a perguntas e muito mais.
   - Exemplo: "Escreva um ensaio persuasivo argumentando a favor da exploração espacial."

7. text-davinci-003:
   - Indicação de uso: Este modelo é uma versão mais recente e atualizada do Davinci. Possui capacidades semelhantes ao text-davinci-002, mas com possíveis melhorias e otimizações.
   - Exemplo: "Como os avanços recentes em inteligência artificial estão impactando a indústria da saúde?"

8. text-embedding-ada-002 (continuação):
   - Indicação de uso: Este modelo é treinado para gerar representações de texto em um espaço vetorial, permitindo que você compare e analise a similaridade entre diferentes textos com base em seu significado semântico.
   - Exemplo: "Compare a similaridade entre os seguintes pares de frases: 'O carro está na estrada' e 'O veículo está na via'."

9. text-similarity-ada-001:
   - Indicação de uso: Este modelo é especializado em avaliar a similaridade entre duas frases ou trechos de texto, fornecendo uma pontuação de similaridade como resultado.
   - Exemplo: "Determine a similaridade entre as seguintes duas frases: 'O cachorro correu no parque' e 'O cão estava correndo na área verde'."

10. text-similarity-curie-001:
   - Indicação de uso: Este modelo também é voltado para avaliar a similaridade entre frases ou trechos de texto, fornecendo uma pontuação de similaridade.
   - Exemplo: "Verifique a similaridade entre as seguintes duas declarações: 'O aquecimento global é um problema sério' e 'As mudanças climáticas são uma questão urgente'."