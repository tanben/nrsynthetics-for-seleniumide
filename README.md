# New Relic Synthetics Web extension
New Relic Synthetics formatter for Selenium IDE code export.

## How to use ?
1. Install the [Selenium IDE web extension](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd).
2. Install this web extension.
3. Start the Selenium IDE and start recording or load an existing project
4. Select the test or test suite to [export](https://www.seleniumhq.org/selenium-ide/docs/en/introduction/code-export/). 

For details on how to record and export test and test suite refer to the [Selenium IDE documentation](https://www.seleniumhq.org/selenium-ide/docs/en/introduction/getting-started/).

This project was created using [Selenium-IDE boiler plate](https://github.com/SeleniumHQ/selenium-ide/tree/v3/packages/extension-boilerplate)


## How to build?

1.) install node modules
```$xslt
npm install
```
2.) set [Selenium IDE web extension ID](https://www.seleniumhq.org/selenium-ide/docs/en/plugins/extension-id/) for your browser.

```$xslt
export SIDE_ID='<webextension ID>'
```
3.) build for production
```$xslt
npm run build

```
