it ('Assertion Demo', () => {

    cy.visit('https://cake-la-pepe-exchange.vercel.app/')

    cy.get('[data-testid="lepepe-company-title"]').should('contain','La Pepe scammer exchange')
})


// Display his store name and current date/time - La Coco Crypto Exchange