import HomePage from './home.page.js';

class SignInPage {

    fillEmail(value) {
        const field = cy.get(`#email`);
        field.clear();
        field.type(value);

    }

    fillPassword(value) {
        const field = cy.get(`#password`);
        field.clear();
        field.type(value);
    }

    login(email, pass) {
        cy.log('Login with user credentials')
        this.fillEmail(email)
        this.fillPassword(pass)
        cy.get(`#signin_btn`).click();
        cy.wait(2000)

        return new HomePage();
    }
}

export default SignInPage;