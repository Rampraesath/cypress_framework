# La Coco Crypto Exchange - QA

This file contains basic information regarding framework structure and execution instructions

## File Structure

There are 2 main folders in the e2e folder

```bash

├── ...
    ├── e2e
    │   ├── keywords          # keywords: stores all the logics and objects
    │   ├── testcases         # tescases: contains test steps
    │
    └── ...
```

In the keyword file, there are the following folders and files

```bash

├── ...
    ├── keywords
    │   ├── coinconvertor
    │   │    ├── coinconverter.ts      # coinconverter.ts: stores all the logics and objects of coinconvertor
    │   ├── landingpage
        │    ├── landingpage.ts        # landingpage.ts: stores all the logics and objects of landingpage
    │
    └── ...
```

In the testcases file, there are 5 test case files

```bash

├── ...
    ├── testcases
    │   ├── convert-btc-eth.cy.ts
    │   ├── switch-coins.cy.ts
    │   ├── validate-input1-mod-input2.cy.ts
    │   ├── validate-landing-page.cy.ts
    │   ├── validate-supported-coins.cy.ts
    └── ...
```

This framework structure is to demonstrate implementation of **Page Object Model(POM)**

## Test Cases

```python
1. convert-btc-eth : Validates the conversion price of 1 Bitcoin price to Ethereum againts price listed in CoinGecko API

2. switch-coins : Checks if able to change coin type in Swap input from Bitcoin to Ethereum and Buy input to Dogecoin

3. validate-input1-mod-input2 : Modifies value in Buy input, then checks if the value in Swap input gets updated correctly against the price in CoinGecko API

4. validate-landing-page : Validates the header and input fields on La Pepe scammer exchange website

5. validate-supported-coins : Validates the list of coins supported in Swap and Buy dropdown menu
```

## Installation

Ensure the following are installed in your machines:

[Cypress](https://www.cypress.io/)
[VSCode](https://code.visualstudio.com/)
[NodeJs](https://nodejs.org/en/)
[NPM](https://www.npmjs.com/)

## Execution

1. Git clone or fork the repo
2. Open the project repo in VSCode
3. In the terminal, launch Cypress using command **`npx cypress open`**
4. Select E2E Testing and select Start E2E testing in Chrome
5. In the Specs, click on any test cases of your choice and it will get executed

**Disclaimer** : All the test cases should be passing. In case any test case fails, please rerun after couple of seconds as there could be some delay in the CoinGecko API response time

## Author

[Rampraesath (Ram)](https://github.com/Rampraesath)
