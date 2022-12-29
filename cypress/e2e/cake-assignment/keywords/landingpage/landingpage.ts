export class LandingPage{

    // Objects

    header = '[data-testid="lepepe-company-title"]'

    lnk_coingecko = 'a'

    inp_swap = '[data-testid="swap"]'
    inp_buy = '[data-testid="buy"]'


    // Keywords

    launchWebsite(url :string){
            cy.visit(url)     
    }

    validateHeader(){
        cy.get(this.header).should('contain','La Pepe scammer exchange')
    }

    validateInputFields(){
        cy.get(this.inp_buy).should('exist')
        cy.get(this.inp_swap).should('exist')
    }


}