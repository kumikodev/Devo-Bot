const { MessageEmbed } = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js');
let { token, prefix, clientId } = require("../Settings/config");

module.exports = {
	name: 'guildCreate',
	execute(guild) {
        const guildembed = new MessageEmbed()
        .setColor('#0000ff')
        .setTitle('Thanks For inviting me!')
        .addFields(
            { name: 'Thanks For Inviting me to your server!', value: '\u200B', inline: false },
            { name: `To see my Commands Type /help or D!help!`, value: '\u200B', inline: true },
            { name: `To Invite me to your server, Use the command /invite or D!invite!`, value: '\u200B', inline: true },
        )
    guild.systemChannel.send({ embeds: [guildembed] });

	}, // 
};