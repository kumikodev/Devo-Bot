let { token, prefix, clientId } = require('../Settings/config')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        console.clear('');
        console.log('------------------------|Bot is online!|------------------------');
        console.log('');
        console.log('Bot has logged in as ' + client.user.tag);
        console.log('');
        console.log(' - Prefix -');
        console.log(prefix)
        console.log('');
        console.log(' - Version -');
        console.log(1.0);
        console.log('');
        console.log('By Radio#6969');
        console.log('')
        client.user.setStatus('dnd');
        client.user.setActivity(prefix + "help • Verison: 1.1.0" , { type: 'LISTENING' });
	},
};