
module.exports = {
    name: 'ping',
    description: 'Displays the delay between the API and the bot',
    async execute(message) {
        return await await message.channel.send(`Current Delay: ${message.client.ws.ping}ms :hourglass:`);
    }
}