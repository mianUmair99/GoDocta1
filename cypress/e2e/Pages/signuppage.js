/// <reference types="Cypress" />

class signup {
    // Locators
    name = '[placeholder="Name"]';
    emailaddress = '[placeholder="Email Address"]';
    typePassword = '[placeholder="Enter Password"]';
    confirmPassword = '[placeholder="Confirm Password"]';
    createAccountBtn = '[type="submit"]';

    // Verification Code Locators
    firstDigitcode = '#digit-1';
    secondDigitcode = '#digit-2';
    thirdDigitcode = '#digit-3';
    fourthDigitcode = '#digit-4';
    enterButton = '[type="submit"]';

    // Functions and Methods
    enterName(username) {
        cy.get(this.name).should('be.visible').clear().type(username);
    }

    enterEmailAddress(mail) {
        cy.get(this.emailaddress).should('be.visible').clear().type(mail);
    }

    enterPassword(password) {
        cy.get(this.typePassword).should('be.visible').type(password);
    }

    enterConfirmPassword(password) {
        cy.get(this.confirmPassword).should('be.visible').clear().type(password);
    }

    clickOnCreateAccountBtn() {
        cy.intercept('POST', '/api/register').as('createAccount');
        cy.get(this.createAccountBtn).should('be.visible').click();
        cy.wait('@createAccount');
        cy.url().should('match', /\/email-verification$/);
    }
    enterVerificationCode(verificationCode) {
        const digits = verificationCode.split(''); // Split the code into digits
        cy.get(this.firstDigitcode).should('be.visible').type(digits[0]);
        cy.get(this.secondDigitcode).should('be.visible').type(digits[1]);
        cy.get(this.thirdDigitcode).should('be.visible').type(digits[2]);
        cy.get(this.fourthDigitcode).should('be.visible').type(digits[3]);
    }

    clickOnEnterBtn() {
        cy.get(this.enterButton).should('be.visible').click();
    }
}

module.exports = new signup();
