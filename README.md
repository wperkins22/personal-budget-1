# Personal Budget

## Description
This is the Personal Budget 1 project from codecademy.com. Intended to allow users of the program to keep track of their budget using the envelope budgeting method. I learned a lot about using middleware in this project.

## Features
Project allows users to create budgeting envelopes, update them, delete them, and transfer money between them. 

## How to Use
1. Download code from GitHub
2. Navigate to directory that the project was downloaded to using Command Line Interface and run "npm install" to install dependencies. Dependencies needed are morgan, cors, and body-parser
3. To run the program, execute "node server.js" from the Command Line Interface
4. Currently, you must use an API platform to interact with the program. Postman is recommended. Use the URL http://localhost3000/api/envelopes. Some example operations are:
    * POST http://localhost3000/api/envelopes to create a new envelope (must add information to body in format: {"id":<id>, "envelopeName": <envelopeName>, "budget": <budget>})
    * GET http://localhost3000/api/envelopes to get all envelopes
    * GET http://localhost3000/api/envelopes/:envelopeId to get an envelope by ID
    * PUT http://localhost3000/api/enveloopes/:envelopeId to update an envelope by ID (must add information to body)
    * DELETE http://localhost3000/api/envelopes/:envelopId to delete an envelope by ID
    * PUT http://localhost3000/api/envelopes/:fromId/:toId to transfer budget between envelopes (must add amount to query: ?amount=<amount>)

## Technologies
JavaScript with node.js and express.js were used in this project

