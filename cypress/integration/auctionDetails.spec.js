describe('auctionDetails', () => {

    // basic search bar
    it('check details', () => {
        cy.visit('https://sky.flou21.de/auction/f3973e5daa584afbaefc84f5648aa619')
        // title
        cy.contains("Fabled Midas' Sword", {
            timeout: 15000
        })
        cy.contains("BIN")
        // Auctioneer
        cy.contains("Nikewrayy")
        cy.contains("Dragon Hunter 5")
        cy.contains("Item-Details")
            .click()
        //.scrollTo('bottom')

        cy.contains("Item Ability: Greed")
        // bidder
        cy.contains("Ish_Water")
        // bid
        cy.contains("94.556.250 Coins")
        cy.contains("Starting bid: 21.540 Coins")


    })

    // check no search result
})