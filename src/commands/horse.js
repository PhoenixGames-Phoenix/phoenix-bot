const imgdownload = require('../utils/imgdownload');

module.exports = {
    name: 'horse',
    description: 'The funniest website on the Internet as a bot command',
    usage: 'horse',
    cooldown: 3,
    async execute(message) {
        await imgdownload('https://thishorsedoesnotexist.com','./imgcache/horse.jpg')
        return await message.channel.send("This is an AI generated Horse!",{files: [{attachment: './imgcache/horse.jpg', name: 'horse.jpg'}]});
    }
}