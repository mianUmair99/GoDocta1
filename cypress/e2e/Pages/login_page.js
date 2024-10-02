/// <reference types="Cypress" />
class login {
  // LOCATORS
  email = "[type='email']";
  password = "[type='password']";
  loginbtn = "[type='submit']";
  wrongpassword = "form div:nth-child(4) span";
  dashboard = '[href="/dashboard"]';
  popUp = '.swal2-popup';
  signupBtn = 'a[href="/register"]';

  // Function

  enterEmail(mail) {
    cy.get(this.email).should('be.visible').clear().type(mail);
  }


  enterPassword(password) {
    cy.get(this.password).should('be.visible').clear().type(password);
  }

  clickOnLoginButton() {
    cy.get(this.loginbtn).should('be.visible').click();
  }

  VerifythatErrorDisplayedwhenEnterWrongPassword() {
    cy.get(this.wrongpassword).contains('Password is invalid')
  }

  signIn(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickOnLoginButton();
    this.verifyUserLogin();
  }

  clickOnSignUpButton() {
    cy.get(this.signupBtn).should('be.visible').click();
  }

  verifyUserLogin() {
    cy.get(this.dashboard).should('be.visible');
    cy.url().should('match', /\/dashboard$/);
  }

  verifyErrorMessageDisplyed(loginErr) {
    cy.get(this.popUp).contains(loginErr).parent().contains('Ok').click();
  }

  verifyLoginPageLoaded() {
    cy.get(this.email).should('be.visible'),
      cy.get(this.password).should('be.visible'),
      cy.get(this.loginbtn).should('be.visible');
  }
}

module.exports = new login();
