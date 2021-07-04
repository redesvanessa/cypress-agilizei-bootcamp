/// <reference types= "cypress" />


Given(/^que o site nao possui registros$/, () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: {}
    }).as('getNewtable');

    
});

When(/^acessar a listagem$/, () => {
    cy.visit('WebTable.html');
});

Then(/^devo visualiazr a listagem vazia$/, () => {
    cy.get('div[role=row]').should('have.length', 1);
});




Given(/^que o site possua registro$/, () => {
    cy.server()
    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fx:webtable-get'
    }).as('getNewtable');
});


Then(/^devo visualizar o registro$/, () => {
	cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');
        cy.get('@gridCellPhone').should('contain.text', '3129876543')
});
