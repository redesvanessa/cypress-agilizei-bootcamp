/// <reference types= "cypress" />

let Chance = require('chance');
let chance = new Chance();

Given(/^que acesso o site$/, () => {
	cy.server()
        cy.route({
            method: 'POST',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: {}
        }).as('postNewtable');

        cy.route({
            method: 'POST', 
            url: '**/api/1/databases/userdetails/collections/usertable?**', 
            status: 200, 
            response: {}
        }).as('postUsertable');

        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: {}
        }).as('getNewtable');


        cy.visit('Register.html');
});


When(/^informar meus dados$/, () => {
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
});


And(/^salvar$/, () => {
    cy.get('#submitbtn').click();
});


Then(/^devo ser cadastrado com sucesso$/, () => {
    cy.wait('@postNewtable').then((resNewtable) => {
        expect(resNewtable.status).to.eq(200)
    })
  
      cy.wait('@postUsertable').then((resUsertable) => {
        expect(resUsertable.status).to.eq(200)
    })
  
    cy.wait('@getNewtable').then((resNewtable) => {
        expect(resNewtable.status).to.eq(200)
    })
    cy.url().should('contain','WebTable');
});
