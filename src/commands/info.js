const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "info",
    description: "Gives info about the bot",
    usage: "info",
    async execute(message) {
        const infoembed = new MessageEmbed()
            .setColor("#F5A623")
            .setTitle("Bot Info")
            .setURL("https://github.com/PhoenixGames-Phoenix/phoenix-bot")
            .addFields(
                {
                    name: "**Info**",
                    value: `This is the discord bot written by myself and all GitHub contributors that will be used for almost everything and will slowly replace the other bots on the server. If you want to contribute or report issues look at https://github.com/PhoenixGames-Phoenix/phoenix-bot`,
                    inline: false,
                },
                {
                    name: "**Language**",
                    value: "node.js v14.15.0 \nhttps://nodejs.org",
                    inline: true,
                },
                {
                    name: "**Discord API Lib**",
                    value: "Discord.js v12\nhttps://discord.js.org",
                    inline: true,
                }
            );
        return await message.channel.send(infoembed);
    },
};
