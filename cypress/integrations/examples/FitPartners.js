describe('Fit Partners page form', ()=>{
    beforeEach('Test Fit Partners form', ()=> {
       const url = Cypress.env('url') || 'https://fitzone.infominez.com/';

       cy.log(`URL: ${Cypress.env('url')}`);

       expect(url, 'baseUrl is required').to.be.a('string').that.is.not.empty;
       cy.visit(url);

       cy.url().should('include', url);
    });
    it('Test Fit Partners form', ()=>{
        cy.xpath('//*[@id="navbar"]/div/div[1]/div[1]').click();
        cy.xpath('//*[@id="navbar"]/div/div[2]/div[3]').click();
        cy.get('#Name').click();
        cy.get('#Name').type('test');
        cy.get('#email').click();
        cy.get('#email').type('test@email.com');
        cy.get('#phone').click();
        cy.get('#phone').type('1234567890');
        cy.xpath('//*[@id="root"]/div[1]/div[4]/div[2]/div/div[4]/div[2]/div[2]/button').click();
        cy.xpath('//*[@id="root"]/div[3]/div').should('be.visible');
        cy.xpath('//*[@id="root"]/div[3]/div/span').invoke('text').then((resp)=> {
            expect(resp).to.equal('Form Submitted Successfully!');
    })

    
})    
})
