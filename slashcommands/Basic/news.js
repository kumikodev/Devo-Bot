const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

let axios = require("axios")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('news')
		.setDescription('Replies with the current fortnite news!'),
	async execute(interaction, client) {




			let req = await axios({
                url : "https://fortnite-api.com/v2/news/br",
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
                .setTitle("Fortnite News • CHAPTER 3 SEASON 1")
                .setImage(req.data.image)
                .setTimestamp()
                .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL())

                const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setURL(req.data.image)
                .setLabel('View News')
                .setStyle('LINK'),
        );

        await interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
        }
	},
};