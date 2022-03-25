let fs = require('fs');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
        console.clear();
		console.log(`Ready! Logged in as ${client.user.tag}`)
		console.log(`${client.guilds.cache.size} guilds`)
		 client.user.setStatus('dnd');
    client.user.setActivity(client.guilds.cache.size + " Servers • Version: 1.3.0" , { type: 'LISTENING' });
	},
};