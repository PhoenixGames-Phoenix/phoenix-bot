const discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const log = require("./utils/log");
const tempban = require("./models/tempban");
const tempmute = require("./models/tempmute");
const config = require("./utils/config.js");
const secrets = config.loadsecrets();

const client = new discord.Client();
client.commands = new discord.Collection();

const commandFiles = fs
    .readdirSync("./src/commands/")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("ready", async () => {
    console.log(
        `Bot Ready!\nRunning ${config.loadconfig().version} as ${
            client.user.username
        }`
    );
    client.user.setActivity(
        `https://github.com/PhoenixGames-Phoenix/phoenix-bot`,
        { type: "WATCHING" }
    );
    const mutetimers = [{ member: "", timeout: "" }];
    var i = 0;
    for await (const doc of tempmute.find({ punishmenttype: "tempmute" })) {
        const docject = doc.toObject();
        const guild = client.guilds.cache.get(
            await config.loadconfig().GuildID
        );
        const member = guild.members.cache.get(docject.offender);
        const role = guild.roles.cache.find(
            (role) => role.id == config.loadconfig().roles.MUTED
        );
        const moderator = guild.members.cache.get(docject.moderator);
        if (docject.duration.endTime > Date.now()) {
            mutetimers[i].member = member;
            mutetimers[i].timeout = setTimeout(async function () {
                await member.roles.remove(role);
                const unmuteembed = new discord.MessageEmbed()
                    .setTitle(`${member}'s tempmute expired!`)
                    .setDescription(
                        `${member}'s tempmute expired after ${ms(
                            Date.now() - docject.duration.startTime
                        )}`
                    )
                    .addFields(
                        {
                            name: "Offender: ",
                            value: member.user.tag,
                            inline: true,
                        },
                        {
                            name: "Moderator: ",
                            value: moderator.user.tag,
                            inline: true,
                        },
                        {
                            name: "Reason: ",
                            value: docject.reason,
                            inline: true,
                        },
                        {
                            name: "Duration: ",
                            value: ms(
                                docject.duration.endTime -
                                    docject.duration.startTime
                            ),
                        }
                    );
                await log(unmuteembed);
                await tempmute.deleteOne({
                    punishmenttype: "tempmute",
                    offender: member.id,
                });
            }, docject.duration.endTime - Date.now());
            i++;
        } else {
            const unmutembed = new discord.MessageEmbed()
                .setTitle(`${member}'s tempmute expired!`)
                .setDescription(
                    `${member}'s tempmute expired after ${ms(
                        Date.now() - docject.duration.startTime
                    )}`
                )
                .addFields(
                    {
                        name: "Offender: ",
                        value: member.user.tag,
                        inline: true,
                    },
                    {
                        name: "Moderator: ",
                        value: moderator.user.tag,
                        inline: true,
                    },
                    {
                        name: "Reason: ",
                        value: docject.reason,
                        inline: true,
                    },
                    {
                        name: "Duration: ",
                        value: ms(
                            docject.duration.endTime -
                                docject.duration.startTime
                        ),
                    }
                );
            await log(unmutembed);
            await tempmute.deleteOne({
                punishmenttype: "tempmute",
                offender: member.id,
            });
            await member.roles.remove(role);
        }
    }
    i = 0;
    const bantimers = [{ user: "", timeout: "" }];
    for await (const doc of tempban.find({ punishmenttype: "tempban" })) {
        const docject = doc.toObject();
        const guild = client.guilds.cache.get(
            await config.loadconfig().GuildID
        );
        const user = client.users.fetch(docject.offender);
        const moderator = client.users.cache.get(docject.moderator);
        if (docject.duration.endTime > Date.now()) {
            bantimers[i].user = user;
            bantimers[i].timeout = setTimeout(async function () {
                await tempban.deleteOne({
                    punishmenttype: "tempban",
                    offender: user.id,
                });
                await guild.members.unban(docject.offender, "Tempban expired!");
                const unbanembed = new discord.MessageEmbed()
                    .setTitle(`${user.tag}'s tempban expired`)
                    .setDescription(
                        `${user.tag}'s tempban expired after ${ms(
                            Date.now() - docject.duration.startTime
                        )}`
                    )
                    .addFields(
                        {
                            name: "Offender: ",
                            value: user.tag,
                            inline: true,
                        },
                        {
                            name: "Moderator: ",
                            value: moderator.tag,
                            inline: true,
                        },
                        {
                            name: "Reason: ",
                            value: docject.reason,
                            inline: true,
                        },
                        {
                            name: "Duration:",
                            value: ms(
                                docject.duration.endTime -
                                    docject.duration.startTime
                            ),
                        }
                    );
                await log(unbanembed);
            }, docject.duration.endTime - Date.now());
            i++;
        } else {
            await tempban.deleteOne({
                punishmenttype: "tempban",
                offender: user.id,
            });
            await guild.members.unban(docject.offender, "Tempban expired!");
            const unbanembed = new discord.MessageEmbed()
                .setTitle(`${user.tag}'s tempban expired`)
                .setDescription(
                    `${user.tag}'s tempban expired after ${ms(
                        Date.now() - docject.duration.startTime
                    )}`
                )
                .addFields(
                    {
                        name: "Offender: ",
                        value: user.tag,
                        inline: true,
                    },
                    {
                        name: "Moderator: ",
                        value: moderator.tag,
                        inline: true,
                    },
                    {
                        name: "Reason: ",
                        value: docject.reason,
                        inline: true,
                    },
                    {
                        name: "Duration:",
                        value: ms(
                            docject.duration.endTime -
                                docject.duration.startTime
                        ),
                    }
                );
            await log(unbanembed);
        }
    }
    module.exports.mutetimers = mutetimers;
    module.exports.bantimers = bantimers;
});

client.on("message", async (msg) => {
    if (!msg.content.startsWith(config.loadconfig().prefix) || msg.author.bot)
        return;

    const args = msg.content
        .slice(config.loadconfig().prefix.length)
        .trim()
        .split(" ");
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName))
        return await msg.channel.send(
            config.loadconfig().messages.unknwoncommand
        );

    const command = await client.commands.get(commandName);

    try {
        await command.execute(msg, args);
    } catch (error) {
        console.error(error);
        await msg.channel.send(config.loadconfig().messages.commanderror);
    }
});

client.login(secrets.DiscordToken);
