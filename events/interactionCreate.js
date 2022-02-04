module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(` :yay: ${interaction.user.tag} in #${interaction.channel.name} triggered an interaction. :yay: `);
	},
};