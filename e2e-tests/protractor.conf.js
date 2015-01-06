exports.config = {

  specs: [
    'specs.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000',

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 2000
  }
};
