# phoenix-bot

![GitHub](https://img.shields.io/github/license/PhoenixGames-Phoenix/phoenix-bot) [![CodeFactor](https://www.codefactor.io/repository/github/phoenixgames-phoenix/phoenix-bot/badge)](https://www.codefactor.io/repository/github/phoenixgames-phoenix/phoenix-bot) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/PhoenixGames-Phoenix/phoenix-bot/phoenix-bot%20eslint%20CI?label=ESLint%20CI) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/PhoenixGames-Phoenix/phoenix-bot/phoenix-bot%20docker%20CI?label=docker%20build%20CI)

## About

Well First of, thank you for your Interest in this project!
phoenix-bot is a Discord bot written in node.js using [discord.js](https://discord.js.org) v12. It's used for my public [discord server](https://discord.gg/gTwuaHW) and i'll slowly try to replace every feature on the discord with this discord bot, mostly for learning purposes but also for features that i could actually use that are, as far as i know, correct me if im wrong, unique like the rank system.

## Setup

### Prerequisites

To be able to use and develop this project you need to have the following programs installed:

- [Node.js LTS](https://nodejs.org/en/download/) (v14.15.0) Note: Any version above 14.x will probably not work, as node 15 uses npm v7 which changes a lot of things
- [Docker](https://www.docker.com/) (Only required if you're building and using docker containers)

### Dependency & Tool Installation

To Install all depencies required (+ ESLint for linting), just run

```sh
npm i
```

in the base directory. All Dependencies and ESLint are now installed and you should be able to start the bot with no problem.

To Use eslint, run

```sh
npx eslint ./src/
```

in the base directory. Don't worry if it doesn't give any output, that just means that it found no errors.

### Config

To use the bot properly, you'll have to change and add some config files in the config folder.

1. Create a secrets.json file with your bot token

Format:

```json
{
  "DiscordToken": "YourDiscordToken"
}
```

2. Change the config.json file to match your settings

Format:

```json
{
  "prefix": "-",
  "version": "vMajor.Minor.Patch-Branch",
  "messages": {
    // Messages as seen in the config.json file in the repo
  },
  "channels": {
    // Channel IDs as seen in the config.json file in the repo
  },
  "botowner": "YourDiscordName#1337"
}
```

3. Change the ranks.json file to match your servers Ranks

If you want to "disable" this feature, just clear the file

Format:

```json
{
  "friend": ["ID1", "ID2", "ID3"],
  "moderator": ["ID1", "ID2", "ID3"]
}
```

#### IDE / Text Editor

You can code in node with almost every IDE or Text Editor. My Personal favorite is vscode because of IntelliSense and the ton of Extensions available, but you should be good with every other IDE or Text Editor

## End

Thank you for reading through this and your Interest in the project. Be Sure to just suggest or add things through Issues and Pull Requests!

\- Phoenix
