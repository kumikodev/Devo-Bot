let fs = require('fs');

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
        console.clear();
		console.log(`Ready! Logged in as ${client.user.tag}`)
		 client.user.setStatus('dnd');
    client.user.setActivity("Eminem • Version: 1.2.0" , { type: 'LISTENING' });
	},
};