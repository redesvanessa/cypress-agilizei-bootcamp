#language: pt
Funcionalidade: listagem

Como usuario, desejo acessar a listagem
Para que possa visualizar o sistema

Cenario: Listagem sem registro
    Dado que o site nao possui registros
    Quando acessar a listagem
    Entao devo visualiazr a listagem vazia

Cenario: Listagem com um registro'
    Dado que o site possua registro
    Quando acessar a listagem
    Entao devo visualizar o registro