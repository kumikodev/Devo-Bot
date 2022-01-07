const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

let axios = require("axios")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Replies with the bots invite!'),
	async execute(interaction, client) {

        let { token, prefix, clientId } = require("../../Settings/config")

        const embed = new MessageEmbed()
				.setTitle('<:confusedlol:910987531288469504> Hey! You want to Invite me? <:confusedlol:910987531288469504>')
				.setColor('#0013FF')
				.setDescription(`**[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=902588272755224656&permissions=8&scope=bot%20applications.commands)**`)
                .setTimestamp()
                .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL())

        await interaction.reply({ ephemeral: true, embeds: [embed] });
	},
};