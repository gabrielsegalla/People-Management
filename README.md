# People Management

Desenvolver uma aplicação de gerenciamento de pessoas. Deve ser levado em consideração o seguinte cenário: a aplicação é um módulo ou micro serviço de uma aplicação maior.

## Requirements

*NPM 8.3.0
Node.js v17.3.0*


## Run
Access the project root folder

    $cd people-management
Run the following command to install the dependencies:

    $npm install
Install JSON Server 

```
npm install -g json-server
```
Run the following command to run the database on port 3000

    $json-server --watch db.json
Then run this command to run the application on port 3001:

    $npm start
