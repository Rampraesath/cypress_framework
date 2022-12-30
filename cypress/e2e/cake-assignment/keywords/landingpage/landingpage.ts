export class LandingPage{

    // Objects

    header = '[data-testid="lepepe-company-title"]'
    txt_moto = '[data-testid="lepepe-company-motto"]'
    
    inp_swap = '[data-testid="swap-input"]'
    inp_buy = '[data-testid="buy"]'


    // Keywords

    launchWebsite(url :string){
            cy.visit(url)     
    }

    validateHeader(){
        cy.get(this.header).should('contain','La Pepe scammer exchange')
        cy.get(this.txt_moto).should('contain', 'We love stonk and make monies')
    }

    validateInputFields(){
        cy.get(this.inp_buy).should('exist')
        cy.get(this.inp_swap).should('exist')
    }


}