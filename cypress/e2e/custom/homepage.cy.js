describe('Restful Booker Front end', () => {
    beforeEach(() => {
        cy.visit('https://automationintesting.online/');
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
          })
    })

    afterEach(() =>{

    })
    
    
    it('Homepage image displays', () => {
        //cy.get('img[alt="Hotel logoUrl"]').should('be.visible');
        cy.get('img[alt="Hotel logoUrl"]').as('logo');
        cy.get('@logo').should('have.attr', 'src', '/images/rbp-logo.jpg');
    });

    it('Website description displays on homepage', () =>{
        cy.get('.col-sm-10 > p').as('description');
        //the text is already logged into the console on the test runner
        cy.get('@description').contains('Welcome to Shady Meadows');
    })

    it('Room description displays on homepage', () => {
        cy.get('.col-sm-7 > p').as('description');
        cy.get('@description').should('not.be.empty');
    })

    it('Room image displays', () => {
        cy.get('img[alt="Preview image of room 101"]').as('room');
        cy.get('@room').should('have.attr', 'src', '/images/room2.jpg');
    })

    it('Danger alert when missing info', () => {
        cy.get('.btn.btn-outline-primary.float-right.openBooking').first().click();
    })

});