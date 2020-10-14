class HomePage {

    openSaved() {
        cy.log('Open "Saved Item" channel');

        const channel = cy.get('[data-qa="channel_sidebar_name_page_psaved"]')
        channel.click()
    }

    openChannel(name) {
        cy.log('Open ' + name + ' channel');

        const channel = cy.get('[data-qa="channel_sidebar_name_' + name + '"]')
        channel.click()
    }

    sendMessage(value) {
        cy.log('Send message:' + value);

        const field = cy.get('[data-qa="message_input"]')
        field.type(value + '{enter}');
        cy.wait(2000)
    }

    saveMessage(value) {
        cy.log('Save message');
        const messages = cy.get('[role="listitem"] .c-message_kit__actions .p-rich_text_section')
        const el = messages.contains(value)
        el.click()

        const callAction = cy.get('.c-message__actions [type="bookmark"]').last()
        callAction.click()

        cy.wait(1000)
        const savedMessage = cy.get('[role="listitem"] .c-message_kit__actions').contains(value).parentsUntil('[data-qa="message_container"]').last();
        return savedMessage;
    }

    unmarkMessage(value) {
        cy.log('Delete message from saved item');
        const savedMessages = cy.get('[role="listitem"] .c-message_kit__actions')
        const val = savedMessages.contains(value)
        val.click()

        const mark = cy.get('.c-message__actions [type="bookmark-filled"]').last()
        mark.click()
    }

    deleteMessage(value) {
        cy.log('Delete message')
        const savedMessages = cy.get('[role="listitem"] .c-message_kit__actions').contains(value)
        savedMessages.click()

        const threeDot = cy.get('.c-message__actions [type="vertical-ellipsis"]').last()
        threeDot.click()

        const deleteButton = cy.get('[data-qa="delete_message"]')
        deleteButton.click()
        const confirm = cy.get('[data-qa="dialog_go"]')
        confirm.click()
    }

    searchFor(value) {
        cy.log('Search for message in search field')
        const searchButton = cy.get('button.p-top_nav__search')
        searchButton.click()

        cy.wait(2000)
        const search = cy.get('div[aria-label="Search"]').last()
        search.type(value + '{enter}');
    }

    closeSearch(){
        cy.log('Close search result')
        const closeButton = cy.get('div[aria-label="Search"] .c-icon--times')
        closeButton.click()
    }

    getSearchResult() {
        cy.log('Get message from search result')
        return cy.get('[aria-label="Search"] [data-qa="search_message_group"]');
    }

    getSavedMessage() {
        cy.log('Get message from Saved Item channel')
        return cy.get('[data-qa="block-kit-renderer"]')
    }
}

export default HomePage;