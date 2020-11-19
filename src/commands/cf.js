

module.exports = {
    name: 'cf',
    description: 'Coinflip',
    usage: 'cf',
    async execute(message) {
        var rndm = Math.floor(Math.random() * 2);
        if (rndm == 1) {
            await message.channel.send("Heads!");
        } else {
            await message.channel.send("Tails!");
        }
    }
}