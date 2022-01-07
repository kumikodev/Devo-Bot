const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./Settings/config');
var fs = require('fs');

const commandsl = [];

const commandFolders = fs.readdirSync('./slashcommands');

for (const folder of commandFolders) {

    const commandFiles = fs.readdirSync(`./slashcommands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {

	const commandl = require(`./slashcommands/${folder}/${file}`);
	commandsl.push(commandl.data.toJSON());

    }
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commandsl })
	.then(() => console.log('(/) Successfully registered application commands. (/)'))
	.catch(console.error);