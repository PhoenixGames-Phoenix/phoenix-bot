const fs = require('fs');

module.exports = {
    loadconfig: function loadconfig() {
        return JSON.parse(fs.readFileSync('./config/config.json'));
    },
    loadsecrets: function loadsecrets() {
        return JSON.parse(fs.readFileSync('./config/secrets.json'));
    },
    loadranks: function loadranks() {
        return JSON.parse(fs.readFileSync('./config/ranks.json'));
    }
}