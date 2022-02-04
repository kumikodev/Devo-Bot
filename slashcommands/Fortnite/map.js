const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

let axios = require("axios")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('Replies with the current fortnite map!'),
	async execute(interaction, client) {




			let req = await axios({
                url : "https://fortnite-api.com/v1/map",
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
                .setTitle("Fortnite Map • Solo")
                .setImage(req.data.images.pois)
                .setTimestamp()
                .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })


        await interaction.reply({ ephemeral: true, embeds: [embed] });
        }
	},
};