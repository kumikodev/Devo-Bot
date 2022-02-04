const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');

let axios = require("axios")
const FortniteAPI = require('fortnite-api-com');

const config = {
  apikey: "744e45fb-94e2-4852-a604-ce9e86156e4b",
  language: "en",
  debug: true
};

var Fortnite = new FortniteAPI(config);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aes')
		.setDescription('Returns the current aes key!'),
	async execute(interaction, client) {




        Fortnite.AES()
        .then(async res => {
          console.log(res);
          const spoilerString = spoiler(res.data.mainKey);
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Fortnite AES • Solo")
                .addFields(
                    { name: "**AES KEY: **", value: `${spoilerString}`, inline: true },
                    { name: "**BUILD: **", value: `${res.data.build}`, inline: false },
                    { name: "**UPDATED: **", value: `${res.data.updated}`, inline:false }
                )
                .setTimestamp()
                .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })

    await interaction.reply({ ephemeral: true, embeds : [embed] })
        }).catch(err => {
          interaction.reply({ ephemeral: true, content: err.message })
        });
            
	},
};