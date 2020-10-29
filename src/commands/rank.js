const config = require('../config')

module.exports = {
    name: 'rank',
    description: 'Add or remove a group of roles (rank) from a Member',
    usage: 'rank <add || remove> <member> <rank>',
    async execute(message, args) {
        if (!args[2]) return await message.channel.send(config.loadconfig().messages.notenoughargs);
        if (!message.member.hasPermission('MANAGE_ROLES')) return await message.channel.send(config.loadconfig().messages.unauthorized);
        let member = await message.mentions.members.first();
        if (!member) return await message.channel.send(':x: Error 422: Wrong argument type! You need to mention a member');
        if (!config.loadranks()[args[2]]) return await message.channel.send(':x: Error 404: Unknwon rank!');

        if (args[0] == "add") {
            for (let index = 0; index < await config.loadranks()[args[2]].length; index++) {
                await member.roles.add(message.guild.roles.cache.get(config.loadranks()[args[2]][index]));
            }
            return await message.channel.send(`:white_check_mark: Successfully added rank ${args[2]} to ${message.mentions.members.first().displayName}`);
        } else if (args[0] == "remove") {
            for (let index = 0; index < await config.loadranks()[args[2]].length; index++) {
                if (!member.roles.cache.has(await config.loadranks()[args[2]][index])){
                    return await message.channel.send(`:x: Error 404: ${message.mentions.members.first().displayName} doesn't have ${args[2]}`);
                }
                await member.roles.remove(message.guild.roles.cache.get(config.loadranks()[args[2]][index]));
            }
            return await message.channel.send(`:white_check_mark: Successfully removed rank ${args[2]} from ${message.mentions.members.first().displayName}`);
        }
    } 
}