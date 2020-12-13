const config = require("../utils/config.js");

module.exports = {
    name: "reload",
    description:
        "Reloads the specified command. Can only be executed by the bot owner",
    usage: "reload <command>",
    async execute(message, args) {
        if (message.author.tag != config.loadconfig().botowner.toString())
            return await message.channel.send(
                config.loadconfig().messages.unauthorized
            );
        if (!args.length)
            return await message.channel.send(
                config.loadconfig().messages.notenoughargs +
                    " Usage: " +
                    this.usage
            );
        const commandName = args[0].toLowerCase();
        const command =
            message.client.commands.get(commandName) ||
            message.client.commands.find(
                (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
            );

        if (!command)
            return await message.channel.send(
                config.loadconfig().messages.unknwoncommand
            );

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`);
            await message.client.commands.set(newCommand.name, newCommand);
            await message.channel.send(
                `Successfuly reloaded command ${commandName}`
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};
