import { LandingPage } from "../landingpage/landingpage"
export class CoinConverter{

//Initializations
    landp_key = new LandingPage()

//Objects 
btn_swap_drp = '[data-testid="swap-dropdown"]'
btn_buy_drp = '[data-testid="buy-dropdown"]'

txt_bitcoin_price = 'data-sort#Bitcoin'
txt_current_rate = '[data-testid="exchange-rate"]'

lbl_swap = '[data-testid="swap-label"]'
lbl_buy = '[data-testid="buy-label"]'


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
    this.getCoinPriceFromGC("bitcoin","ethereum", "usd", "swap_buy")
    
   
}

getCoinPriceFromGC(coin1:string, coin2:string, curr:string, validate:string){
    
     
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
               

                if(validate == "swap_buy"){

                    var gc_rate = (this.coin1_rate/this.coin2_rate).toPrecision(4)
                    cy.get(this.txt_current_rate).then(function($elem) {
                        cy.log($elem.text())
                        assert.equal( $elem.text() , gc_rate, 'Pepe Current Exchange and GC rate should be the same')
                   })
                }else if(validate == "buy_swap"){

                    var gc_rate = (this.coin2_rate/this.coin1_rate).toPrecision(1)
                    cy.get(this.landp_key.inp_swap).invoke('val').then(function(swp_val:any) {
                        assert.equal( swp_val , gc_rate, 'Swap and GC rate should be the same')
                    })
                }
              
        }) 
         
    }) 
  

}

modifyBuyValidateSwap(){
    cy.get(this.landp_key.inp_buy).type("1")
    cy.get(this.btn_buy_drp).click()
    cy.get(this.ls_coin('buy','Ethereum')).click()
    this.getCoinPriceFromGC("bitcoin","ethereum", "usd", "buy_swap")
    
   
}

switchcoins(){
    // switch swap to eth
    cy.get(this.lbl_swap).invoke('text').then((first_swp_name: any) => {

        cy.get(this.landp_key.inp_swap).type("1")
        cy.get(this.btn_swap_drp).click()
        cy.get(this.ls_coin('swap','Ethereum')).click()
        cy.get(this.lbl_swap).invoke('text').then((second_swp_name:any) => {
            expect(first_swp_name).to.not.equal(second_swp_name)
            expect(second_swp_name).to.equal('eth to swap')
        })    
    })

    // switch buy to doge
    cy.get(this.lbl_buy).invoke('text').then((first_buy_name: any) => {

        cy.get(this.btn_buy_drp).click()
        cy.get(this.ls_coin('buy','Dogecoin')).click()
        cy.get(this.lbl_buy).invoke('text').then((second_buy_name:any) => {
            expect(first_buy_name).to.not.equal(second_buy_name)
            expect(second_buy_name).to.equal('doge to buy')
        })    
    })
   
}





}