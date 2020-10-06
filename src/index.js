const discord = require('discord.js');
const fs = require('fs');
const cfg = require('./config.js');
const config = cfg.loadconfig();
const secrets = cfg.loadsecrets();

const client = new discord.Client();
client.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(``);
    client.user.setActivity(`https://github.com/PhoenixGames-Phoenix/phoenix-bot`, { type: 'WATCHING'});
})

client.on('message', async msg => {
    if (!msg.content.startsWith(cfg.loadconfig().prefix) || msg.author.bot) return;

    const args = msg.content.slice(cfg.loadconfig().prefix.length).trim().split(' ');
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return await msg.channel.send(config.loadconfig().messages.unknwoncommand);

    const command = await client.commands.get(commandName);

    try {
        command.execute(msg, args);
    } catch (error) {
        console.error(error);
        msg.channel.send(cfg.loadconfig().messages.commanderror);
    }
});

client.login(secrets.DiscordToken);