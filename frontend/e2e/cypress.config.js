const {defineConfig} = require('cypress');

module.exports = defineConfig({
    reporter: 'junit',
    reporterOptions: {
        mochaFile: 'cypress/results/output.xml',
    },
    e2e: {
        baseUrl: 'http://localhost:8080',
        setupNodeEvents(on, config) {
            const pluginFile = './cypress/plugins/index.js';

            if (require('fs').existsSync(pluginFile)) {
                return require(pluginFile)(on, config);
            }

            return config;
        },
    },
});
