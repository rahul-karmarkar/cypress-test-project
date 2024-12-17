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
        const buyNow = '//*[@id="root"]/div[1]/div[4]/div[1]/div[3]/div/div/div[3]/div/div[2]/div/div[4]/div/div/div/div[3]/div[3]/button[2]';
        const membershipCardBuyNowButton = '//*[@id="packages"]/div/div[4]/div/swiper-container/swiper-slide[1]/div/div/div[2]/button';
        const verifyMobile = '//*[@id="root"]/div[1]/div[4]/div[1]/div[2]/div[2]/div[3]/div/button';
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

        cy.xpath('//*[@id="root"]/div[1]/div[4]/div[1]/div[3]/div/div/div[3]/div/div[2]/div/div[4]/div/div');

        cy.xpath(buyNow)
        .should('be.visible')
        .click();

        cy.xpath('//*[@id="packages"]/div/div[4]/div/swiper-container/swiper-slide[1]/div/div');
        cy.xpath(membershipCardBuyNowButton)
        .click();

        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth() + 1;  // Month is 0-based in JS
        const todayYear = today.getFullYear();

        // Format the date as needed, for example: "DD/MM/YYYY"
        const formattedTodayDate = `${todayMonth}/${todayDate}/${todayYear}`;

        cy.xpath('//*[@id="root"]/div[1]/div[4]/div[1]/div[2]/div[2]/div[3]/div/div/div[2]/div/div/table/tbody/tr[3]/td[2]/button').click();
        cy.xpath(verifyMobile)
        .click();

        cy.request({
            method: 'POST',
            url: 'https://user-management-service-fitzone-dev-app.azurewebsites.net/OTP/GenerateOTP',
            body: {
                mobileNumber: 'your_phone_number_or_email', // Replace with your test phone number or email
                // Include any other required parameters in the body
              },
              headers: {
                'Content-Type': 'application/json', // Adjust the content type if necessary
              }
            }).then((response) => {
              expect(response.status).to.eq(200);
        })
        const otp = response.body.otp; // Adjust depending on the response structure
        
        
    });
});