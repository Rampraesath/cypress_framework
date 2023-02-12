import { LandingPage } from "../keywords/landingpage/landingpage"

var landp_key = new LandingPage()

it('Validate Landing Page', function(){
    landp_key.launchWebsite('https://cake-la-pepe-exchange.vercel.app/')
    landp_key.validateHeader()
    landp_key.validateInputFields()
})
