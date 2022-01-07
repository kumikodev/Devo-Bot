const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');

let axios = require("axios")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aes')
		.setDescription('Returns the current aes key!'),
	async execute(interaction, client) {




			let req = await axios({
                url : "https://fortnite-api.com/v2/aes",
                method : "get"
            })
            .catch(e => {
                console.error(e.toJSON())
                return interaction.reply({"content" : "An error occured! Please try later :)"})
            })
            if(req){
                req = req.data
                const spoilerString = spoiler(req.data.mainKey);
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Fortnite AES • CHAPTER 3 SEASON 1")
                .addFields(
                    { name: "**AES KEY: **", value: `${spoilerString}`, inline: true },
                    { name: "**BUILD: **", value: `${req.data.build}`, inline: false }
                )
                .setTimestamp()
                .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL())
                const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setURL("https://www.devo-bot-api.tk/")
            .setLabel('View All AES Keys')
            .setStyle('LINK'),
    );

    await interaction.reply({ embeds: [embed], components: [row]  });
        }
	},
};