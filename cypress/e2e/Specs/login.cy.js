/// <reference types="Cypress" />
/**
 * @author Umair <mianumair6922@gmail.com>
 */
import loginPage from '../Pages/login_page';
const genericFunctions = require('../utils/users');

describe('Login Functionality Scenarios', () => {
  beforeEach(() => {
    cy.visit('https://testing.v2.godocta.com/');
  });

  it('Verify that user should be able to login with valid credientials.', () => {
    loginPage.verifyLoginPageLoaded();
    loginPage.enterEmail('donnelly.devonte@example.net');
    loginPage.enterPassword('password');
    loginPage.clickOnLoginButton();
    loginPage.verifyUserLogin();
  });

  it('verify that user shouldnot be login with invalid credientials' , () =>{
    loginPage.verifyLoginPageLoaded();
    loginPage.enterEmail('mianumair6922+21@gmail.com');
    loginPage.enterPassword('jdid888fk');
    loginPage.clickOnLoginButton();
    loginPage.VerifythatErrorDisplayedwhenEnterWrongPassword();

  })
});
