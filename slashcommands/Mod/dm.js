const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const ownerID = "898700755689689098"

let axios = require("axios")


module.exports = {
	data: new SlashCommandBuilder()
		.setName('dm')
		.setDescription('Dm a User!')
        .addStringOption(option => option.setName('message').setDescription('The Content of the message').setRequired(true))
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
	async execute(interaction, client) {

        const messagename = await interaction.options.getString("message");
        const target = await interaction.options.getUser('target');

        if (!interaction.channel.permissionsFor(interaction.member).has("MANAGE_MESSAGES")) return;
        //if (!interaction.member.permissions.has('MANAGE_GUILD')) return interaction.reply({ ephemeral: true, content: "**You Do Not Have Sufficient Permissions! - [MANAGE_GUILD]**" });

        target
        .send(messagename)
        .catch(() => interaction.reply("That user could not be Dm'ed!"))
        .then(() => interaction.reply({ ephemeral: true, content: `Sent \"${messagename}\" message to ${target.tag}` }));
	},
};