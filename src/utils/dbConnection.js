const mongoose = require("mongoose");
const secrets = require("./config").loadsecrets();

module.exports = mongoose.createConnection(secrets.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
