describe('Restful Booker Front end', () => {
    
    beforeEach(() => {
        cy.visit('https://automationintesting.online/');
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
          })
    })
    
    
    it('Homepage image displays', () => {
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

    it('Danger alert when missing booking info', () => {
        cy.get('h2').contains('Rooms').scrollIntoView();
        cy.get('.btn.btn-outline-primary.float-right.openBooking').first().click();

        cy.get('input[name="firstname"]').type('Test');
        cy.get('input[name="lastname"]').type('User');
        cy.get('input[name="email"]').type('testuser123@email.com');
        cy.get('input[name="phone"]').type('123456789000');

        cy.get('.btn.btn-outline-primary.float-right.book-room').click();
        cy.get('.alert-danger').should('be.visible');
    })

    it('Danger alert appears when missing contact info', () => {
        cy.get('.contact').scrollIntoView();
        
        cy.get('#submitContact').click();
        
        cy.get('.alert-danger').should('be.visible');
    })

    it('Contact sucessfully submits message', () => {
        cy.get('.contact').scrollIntoView();
        cy.get('input[id="name"]').type('Test');
        cy.get('input[id="email"]').type('testuser@email.com');
        cy.get('input[id="phone"]').type('123456789000');
        cy.get('input[id="subject"]').type('This is a test');
        cy.get('textarea[id="description"]')
          .type('This is a test message for testing out the contact fields at the bottom');

        cy.get('#submitContact').click();
                          
        cy.get(':nth-child(2) > div > h2').contains("Thanks for getting in touch");
    })

    it('Booking can sucessfully be submitted', () => {
        cy.get('.contact').scrollIntoView();
        cy.get('.btn.btn-outline-primary.float-right.openBooking').first().click();

        cy.get('input[name="firstname"]').type('Test');
        cy.get('input[name="lastname"]').type('User');
        cy.get('input[name="email"]').type('testuser123@email.com');
        cy.get('input[name="phone"]').type('123456789000');
        //fetch the dates for the calendar. May fail depending on date positions
        cy.get('button[class="rbc-button-link"]').contains('09').as('date1');
        cy.get('button[class="rbc-button-link"]').contains('10').as('date2');
        cy.get('button[class="rbc-button-link"]').contains('11').as('date3');
        cy.get('button[class="rbc-button-link"]').contains('12').as('date4');

        cy.get('@date1').trigger('mousedown',{which:1}, {force: true});
        cy.get('@date2').trigger('mousemove');
        cy.get('@date3').trigger('mousemove');
        cy.get('@date4').trigger('mousemove').trigger('mouseup', {which:1}, {force:true});

        cy.get('.btn.btn-outline-primary.float-right.book-room').click();
        cy.get('.col-sm-6 > h3').contains('Booking Successful');
    })

});