import { LandingPage } from "../landingpage/landingpage"
export class CoinConverter{

//Initializations
    landp_key = new LandingPage()

//Objects 
btn_swap_drp = '[data-testid="swap-dropdown"]'
btn_buy_drp = '[data-testid="buy-dropdown"]'

txt_bitcoin_price = 'data-sort#Bitcoin'



txt_current_rate = '[data-testid="exchange-rate"]'

 ls_coin(trade_type :string,coin :string){
    var ls_coin = `[data-testid="${trade_type}-dropdown-option-${coin}"] > .flex > [data-testid="${trade_type}-dropdown-options-list-name"]`
    
    return ls_coin
}


// Keywords

swap_coins = ["Bitcoin","Ethereum","Tether","Dogecoin", "Cardano", "Solana"] 
buy_coins = ["Ethereum","Tether","Dogecoin", "Cardano", "Solana", "DeFiChain"]

btc_price: any; coin1_rate: any; coin2_rate: any;


validateSwapDropdown(){

    cy.get(this.btn_swap_drp).click()
    for(var j in this.swap_coins) { 
        cy.get(this.ls_coin('swap', this.swap_coins[j])).contains(this.swap_coins[j])      
     } 
    cy.get(this.btn_swap_drp).click()

}

validateBuyDropDown(){
    cy.get(this.btn_buy_drp).click()
    for(var j in this.buy_coins) { 
        cy.get(this.ls_coin('buy', this.buy_coins[j])).contains(this.buy_coins[j])      
     }
     cy.get(this.btn_buy_drp).click() 
}

convertBtcToEtc(){
    cy.get(this.landp_key.inp_swap).type("1")
    cy.get(this.btn_buy_drp).click()
    cy.get(this.ls_coin('buy','Ethereum')).click()
    this.getCoinPriceFromGC("bitcoin","ethereum", "usd")
    
   
}

getCoinPriceFromGC(coin1:string, coin2:string, curr:string){
    
     
    cy.request({
    method : 'GET',
    url:`https://api.coingecko.com/api/v3/simple/price?ids=${coin1}&vs_currencies=${curr}`, 
    
    }).then((response) => {
        
       
         switch(coin1) { 
            case "bitcoin": {
                this.coin1_rate = response.body.bitcoin.usd 
               break; 
            } 
            case "ethereum": { 
                 this.coin1_rate = response.body.ethereum.usd 
               break; 
            } 
            case "tether": { 
                this.coin1_rate = response.body.tether.usd 
               break; 
            } 
           
         } 



         cy.request({
            method : 'GET',
            url:`https://api.coingecko.com/api/v3/simple/price?ids=${coin2}&vs_currencies=${curr}`, 
            
            }).then((response) => {

                switch(coin2) { 
                    case "bitcoin": {
                        this.coin2_rate =  response.body.bitcoin.usd 
                       break; 
                    } 
                    case "ethereum": { 
                        this.coin2_rate =   response.body.ethereum.usd 
                       break; 
                    } 
                    case "tether": { 
                        this.coin2_rate =  response.body.tether.usd 
                       break; 
                    } 
                }
               

                var gc_rate = (this.coin1_rate/this.coin2_rate).toPrecision(4)
                
                cy.get(this.txt_current_rate).then(function($elem) {
                    cy.log($elem.text())
                    assert.equal( $elem.text() , gc_rate, 'Pepe and GC rate matches!')
               })
              
        }) 
         
    }) 
  

}





}