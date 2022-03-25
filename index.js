// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token, prefix, clientId, guildId } = require('./config.json');
const keepAlive = require('./keepalive.js');
var fs = require('fs');
const express = require('express');
const app = express();


// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS] });
client.commands = new Collection();



const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const commandFolders2 = fs.readdirSync('./slashcommands');

for (const folder of commandFolders2) {
    const commandFiles2 = fs.readdirSync(`./slashcommands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles2) {
        const commandl = require(`./slashcommands/${folder}/${file}`);
        client.commands.set(commandl.data.name, commandl);
        

    }
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const commandl = client.commands.get(interaction.commandName);

	if (!commandl) return;

	try {
		await commandl.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '<a:alert:928669407960526919> There was an error while executing this command! <a:alert:928669407960526919>', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(token);

app.listen(3000, () => {
	console.log('App listening on port 3000!');
});

app.get('/', (req, res) => res.send('Bot is Online and Well!'));

app.get('/guilds', (req, res) => {
	res.send(`${client.guilds.cache.size}`);
});