// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token, prefix, clientId } = require('./Settings/config');
const fs = require('fs');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES] });



client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);


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

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
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
		await interaction.reply({ content: '<a:alert:910987519934468106> There was an error while executing this command! <a:alert:910987519934468106>', ephemeral: true });
	}
});

client.on("messageCreate", message => {
    if (message.content === prefix + "help") {
        client.commands.get("help").execute(message)
    }
});

client.on("messageCreate", message => {
    if (message.content === prefix + "map") {
        client.commands.get("map").execute(message)
    }
});

client.on("messageCreate", message => {
    if (message.content === prefix + "token") {
        client.commands.get("token").execute(message)
    }
});

client.on("messageCreate", message => {
    if (message.content === prefix + "shop") {
        client.commands.get("shop").execute(message)
    }
});

client.on("messageCreate", message => {
    if (message.content === prefix + "news") {
        client.commands.get("news").execute(message)
    }
});

client.on("messageCreate", message => {
    if (message.content === prefix + "aes") {
        client.commands.get("aes").execute(message)
    }
});

client.on("messageCreate", message => {
    if (message.content === prefix + "invite") {
        client.commands.get("invite").execute(message)
    }
});




// Login to Discord with your client's token
client.login(token);