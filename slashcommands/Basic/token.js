const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

let axios = require("axios")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('token')
		.setDescription('Replies with your Epic Games Client Credentials Token!'),
	async execute(interaction, client) {




			let req = await axios({
                url : "https://api.nitestats.com/v1/epic/bearer",
                method : "get"
            })
            .catch(e => {
                console.error(e.toJSON())
                return interaction.reply({"content" : "An error occured! Please try later :)"})
            })
            if(req){
                req = req.data
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Epic Games Client Credentials Token")
                .setDescription("Your Credentials: " + req.accessToken)
                .setTimestamp()
                .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL())

        await interaction.reply({ ephemeral: true, embeds: [embed] });
        }
	},
};