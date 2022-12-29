export class CoinConverter{

//Objects 
btn_swap_drp = '[data-testid="swap-dropdown"]'
btn_buy_drp = '[data-testid="buy-dropdown"]'

 ls_coin(trade_type :string,coin :string){
    var ls_coin = `[data-testid="${trade_type}-dropdown-option-${coin}"] > .flex > [data-testid="${trade_type}-dropdown-options-list-name"]`
    
    return ls_coin
}


// Keywords

swap_coins = ["Bitcoin","Ethereum","Tether","Dogecoin", "Cardano", "Solana"] 
buy_coins = ["Ethereum","Tether","Dogecoin", "Cardano", "Solana", "DeFiChain"] 


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

}