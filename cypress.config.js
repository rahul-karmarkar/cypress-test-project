const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "url": "https://fitzone.infominez.com",
  "chromeWebSecurity": false,
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        // If it's Chrome, launch it in incognito mode
        if (browser.family === 'chrome') {
          launchOptions.args.push('--incognito');
        }
        return launchOptions;
      });
    },
    specPattern: 'cypress/integrations/examples/*.js'
  },
});
