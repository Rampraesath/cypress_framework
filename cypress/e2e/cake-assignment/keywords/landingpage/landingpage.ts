export class LandingPage{
    // Objects

    header = '[data-testid="lepepe-company-title"]'



    // Keywords

    launchWebsite(url :string){
            cy.visit(url)     
    }

    validateHeader(){
        cy.get(this.header).should('contain','La Pepe scammer exchange')
    }


}