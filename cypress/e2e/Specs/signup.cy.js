/// <reference types="Cypress" />
/**
 * @author Umair <mianumair6922@gmail.com>
 */
import loginPage from '../Pages/login_page';
import signup from '../Pages/signuppage';
const MailSlurp = require('mailslurp-client').MailSlurp;

describe('Login Functionality Scenarios with MailSlurp', () => {
    const mailslurp = new MailSlurp({ apiKey: '4f42cdd6facdf765efd65bf4febb8a78198212487f0f871f1d7c7bb0d9a26d5c' });
    let inbox;

    beforeEach(() => {
        cy.visit('https://testing.v2.godocta.com');
    });

    it('Verify that user should be able to signup with valid credentials and fetch verification code from email.', () => {
        // Step 1: Create a new MailSlurp inbox
        mailslurp.createInbox().then(newInbox => {
            inbox = newInbox; // Store the inbox for later use
            cy.log(`Generated email address: ${inbox.emailAddress}`);

            // Step 2: Start the signup process with the generated email
            loginPage.clickOnSignUpButton(); // Assuming this opens the signup form
            signup.enterName('Test');
            signup.enterEmailAddress(inbox.emailAddress); // Use the MailSlurp email
            signup.enterPassword('Hello!@1234');
            signup.enterConfirmPassword('Hello!@1234');
            signup.clickOnCreateAccountBtn();
            cy.pause();
            // Step 3: Fetch the verification code from the email
            mailslurp.waitForLatestEmail(inbox.id, 120000).then(email => { // Wait for the email (120 seconds timeout)
                cy.log(`Received email with subject: ${email.subject}`);
                cy.log(`Email body: ${email.body}`); // Log the email body for debugging

                // Step 4: Parse the email body as HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(email.body, 'text/html');
                
                // Step 5: Find the verification code span
                const verificationCodeElement = doc.getElementById('verificationCode');
                const verificationCodeText = verificationCodeElement ? verificationCodeElement.nextSibling.textContent.trim() : null;
                
                if (verificationCodeText) {
                    const verificationCode = verificationCodeText; // Get the code directly
                    cy.log(`Verification code: ${verificationCode}`);

                    // Step 6: Enter the verification code in the form
                    signup.enterVerificationCode(verificationCode);
                    
                    // Click the enter button
                    signup.clickOnEnterBtn();
                } else {
                    throw new Error('Verification code not found in the email');
                }
            });
        });
    });
});
