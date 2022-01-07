const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

let axios = require("axios")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with the current commands!'),
	async execute(interaction, client) {

        let { token, prefix, clientId } = require("../../Settings/config")

        const embed = new MessageEmbed()
				.setTitle(':mailbox_with_mail: Hey! Want some help?')
				.setColor('#0013FF')
				.setDescription(`**[Our Website](https://www.devo-bot.tk/)\r\n[Support Server](https://discord.gg/R9P3cqatg6)\r\n[Invite Me](https://discord.com/api/oauth2/authorize?client_id=902588272755224656&permissions=8&scope=bot%20applications.commands)**`)
				.addFields(
                    { name: 'Commands (SLASH): ', value: "/help ║ /aes ║ /map ║ /token ║ /shop ║ /news ║ /invite", inline: true },
                    //{ name: '\u200B', value: '\u200B' },
                    { name: '\u200B', value: '╟────────────────────────────────────────────╢' },
                    { name: 'Commands (PREFIX): ', value: 'D!help ║ D!aes ║ D!map ║ D!token ║ D!shop ║ D!news ║ D!invite', inline: true },
                    { name: 'Prefix: ', value: prefix, inline: false },
                )
                .setTimestamp()
                .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL())

        await interaction.reply({ ephemeral: true, embeds: [embed] });
	},
};