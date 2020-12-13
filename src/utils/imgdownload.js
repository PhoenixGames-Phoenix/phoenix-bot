const axios = require("axios");
const fs = require("fs");

module.exports = async function (url, dest) {
    const writer = fs.createWriteStream(dest);

    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });

    return response.data.pipe(writer);
};
