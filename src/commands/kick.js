const { MessageEmbed } = require("discord.js");
const config = require("../utils/config.js");
const log = require("../utils/log");

module.exports = {
    name: "kick",
    description: "Kicks the mentioned user from the server. Only available",
    usage: "kick <member> <reason>",
    async execute(message, args) {
        if (!args[1])
            return await message.channel.send(
                config.loadconfig().messages.notenoughargs +
                    " Usage: " +
                    this.usage
            );
        if (message.member.hasPermission("KICK_MEMBERS")) {
            let user = message.mentions.users.first();
            let member = message.mentions.members.first();
            if (!user) return await message.channel.send(`:x: Unknwon user!`);
            var logembed = new MessageEmbed()
                .setColor("#ff0000")
                .setTitle(
                    `${user.username} got kicked by ${message.author.username}`
                )
                .addFields({
                    name: `${user.username} got kicked by ${message.author.username}`,
                    value: `Moderator: ${message.author} (${message.author.id})\nUser: ${user} (${user.id})\nReason: ${args[1]}`,
                });
            await member.kick(args[1]);
            await log(logembed);
            return await message.channel.send(
                `:white_check_mark: Sucessfully kicked ${args[0]} for ${args[1]}`
            );
        } else {
            return await message.channel.send(
                `${config.loadconfig().messages.unauthorized}`
            );
        }
    },
};
