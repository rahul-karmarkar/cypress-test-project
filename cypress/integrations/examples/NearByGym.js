describe('Near By Gym Functionality', () => {
    beforeEach('Setup and Visit URL', () => {
        // Set the URL from environment or default to a given URL
        const url = Cypress.env('url') || 'https://fitzone.infominez.com/';
        
        cy.log(`URL: ${url}`);

        // Ensure the URL is a valid string and not empty
        expect(url, 'baseUrl is required').to.be.a('string').that.is.not.empty;
        
        // Visit the URL
        cy.visit(url);
        
        // Verify the URL contains the expected base URL
        cy.url().should('include', url);
    });

    it('Near By Gym Functionality', () => {
        // Get pincode from environment variable or use default value
        const pincode = Cypress.env('pincode') || '560018';

        // Log pincode for debugging purposes
        cy.log(`pincode: ${pincode}`);

        // Validate that the pincode contains only digits (matching a number pattern)
        expect(pincode, 'pincode must be a valid number').to.match(/^\d+$/);  

        // Define the selectors for the input field and button
        const inputField = '//*[@id="root"]/div[1]/div[4]/div[1]/div[3]/div/div/div[2]/input';
        const submitButton = '//*[@id="root"]/div[1]/div[4]/div[1]/div[3]/div/div/div[2]/button/span';
        const gymSelection = '//*[@id="root"]/div[1]/div[4]/div[1]/div[3]/div/div/div[3]/div/div[3]';

        // Click on the input field
        cy.xpath(inputField).click();

        // Clear the input field and type the pincode
        cy.xpath(inputField)
            .clear()
            .type(pincode);  

        // Assert the pincode is entered correctly
        cy.xpath(inputField)
            .should('have.value', pincode);

        // Click on the submit button
        cy.xpath(submitButton).click();

        // Wait for the gym selection to be visible and clickable
        cy.xpath(gymSelection)
            .should('be.visible')  // Ensure it's visible
            .click();
    });
});