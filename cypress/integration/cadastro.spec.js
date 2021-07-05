/// <reference types= "cypress" />

let Chance = require('chance');
let chance = new Chance();


context('Cadastro', () => {
    it('Cadastro de usuario no site', () => {
        //rotas
        //POST (aborted) /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //POST (aborted) /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //GET (aborted) /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        cy.intercept('POST', '**/api/1/databases/userdetails/collections/newtable?**', {
            statusCode: 200,
            body: {}
          }).as('postNewtable');
      
          cy.intercept('POST', '**/api/1/databases/userdetails/collections/usertable?**', {
            statusCode: 200, 
            body: {}
          }).as('postUsertable');
      
          cy.intercept('GET', '**/api/1/databases/userdetails/collections/newtable?**', {
            statusCode: 200,
            body: {}
          }).as('getNewtable');


        cy.visit('Register.html');
        cy.get('input[placeholder="First Name"]').type(chance.first());
        cy.get('input[ng-model^=Last]').type(chance.last());
        cy.get('input[ng-model^=Email]').type(chance.email());
        cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false }));
        //Radios e Checks
        cy.get('input[value=FeMale]').check();
        cy.get('input[type=checkbox]').check('Cricket');
        cy.get('input[type=checkbox]').check('Hockey');
        //Combo -- Select
        cy.get('select#Skills').select('APIs');
        cy.get('select#countries').select('Argentina');
        cy.get('select#country').select('Australia', { force: true });
        cy.get('select#yearbox').select('1988');
        cy.get('select[ng-model^=month]').select('November');
        cy.get('select#daybox').select('18');

        cy.get('input#firstpassword').type('Ab@123456');
        cy.get('input#secondpassword').type('Ab@123456');
        //Upload Imagem
        cy.get('input#imagesrc').attachFile('upload.png');
        //click
        cy.get('#submitbtn').click();
        
        
        cy.wait('@postNewtable').then((resNewtable) => {
            expect(resNewtable.response.statusCode).to.eq(200)
          })
      
          cy.wait('@postUsertable').then((resUsertable) => {
            expect(resUsertable.response.statusCode).to.eq(200)
          })
      
          cy.wait('@getNewtable').then((resNewtable) => {
            expect(resNewtable.response.statusCode).to.eq(200)
          })
        cy.url().should('contain','WebTable');

    });
});

// input[placeholder="First Name"]
// input[ng-model^=Last]
// input[ng-model^=Email]
// input[ng-model^=Phone]
// input[ng-model^=]