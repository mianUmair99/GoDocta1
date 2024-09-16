/// <reference types="Cypress" />

class signup {
    //Locators
    name = '[placeholder="Name"]';
    emailaddress = '[placeholder="Email Address"]';
    typePassword = '[placeholder="Enter Password"]';
    confirmPassword = '[placeholder="Confirm Password"]';
    createAccountBtn = '[type="submit"]';


    enterName(username) {
        cy.get(this.name).should('be.visible').clear().type(username)
    }

    enterEmailaddress(mail){
        cy.get(this.emailaddress).should('be.visible').clear().type(mail)
    }

    enterPassword(password){
        cy.get(this.typePassword).should('be.visible').type(password);
    }

    


}