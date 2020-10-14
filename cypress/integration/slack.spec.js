import LoginPage from '../pages/login.page';

describe("Slack test", () => {
    let loginPage
    let homePage
    const testMessage = 'message to test'
    const userData = require('../fixtures/user.json');

    before(() => {
        cy.visit("/")

        loginPage = new LoginPage();
        homePage = loginPage
            .login(userData.email, userData.password)

    })

   beforeEach(() => {
        // Preserve cookie in every test
        Cypress.Cookies.defaults({
            preserve: (cookie) => {
                return true;
            }
        })
    });

    it("1. Verify save message from Channel", () => {
        homePage.openChannel('test')
        homePage.sendMessage(testMessage)
        const savedMessage = homePage.saveMessage(testMessage)

        savedMessage.should(($ms) => {
            expect($ms.text()).to.include('Added to your saved items')
        })
    })

    it("2. Verify search functionality", () => {
        homePage.searchFor('has:star')
        const searchRes = homePage.getSearchResult()

        searchRes.should(($ms) => {
            expect($ms.text()).to.include(testMessage)
        })
    })

    it("3. Verify message present in Saved Channel", () => {
        homePage.closeSearch()
        homePage.openSaved()
        const message = homePage.getSavedMessage()

        message.should(($ms) => {
            expect($ms.text()).to.include(testMessage)
        })
    })

    after(() => {
        homePage.openChannel('test')
        homePage.unmarkMessage(testMessage)
        homePage.deleteMessage(testMessage)
        Cypress.Cookies.defaults({
            preserve: (cookie) => {
                return false;
            }
        })
    })
});