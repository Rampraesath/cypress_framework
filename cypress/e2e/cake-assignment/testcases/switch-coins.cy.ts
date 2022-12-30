import { CoinConverter } from "../keywords/coinconvertor/coinconverter";
import { LandingPage } from "../keywords/landingpage/landingpage";

var cconv_key = new CoinConverter()
var landp_key = new LandingPage()

it('Validate Supported Coins', function(){
    landp_key.launchWebsite('https://cake-la-pepe-exchange.vercel.app/')
    cconv_key.switchcoins()
   
})