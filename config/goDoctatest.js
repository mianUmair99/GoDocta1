const { defineConfig } = require('cypress');
const path = require('path');
const users = require('../cypress/e2e/utils/users');
const urls = require('../cypress/e2e/utils/urls');
const today = new Date();
const formattedDate = `${today.getFullYear()}-${
  today.getMonth() + 1
}-${today.getDate()}`;
const formattedTime = `${today.getHours()}:${today.getMinutes()}`;
module.exports = defineConfig({
  env: {
    users: users,
    baseUrl:
      process.env.CYPRESS_BASE_URL ||
      'https://testing.v2.godocta.com',
  },
  e2e: {
    supportFile: 'support/e2e.js',
    specPattern: [

    ],
    chromeWebSecurity: false,
    video: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 20000,
    projectId: '9u4ki1',
    retries: 0,
    setupNodeEvents(on, config) {
      return require('../cypress/plugin/index')(on, config);
    },
  },
  
});
