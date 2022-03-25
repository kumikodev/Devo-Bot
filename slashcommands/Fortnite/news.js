const { SlashCommandBuilder } = require('@discordjs/builders');
const builder = require('@discordjs/builders')
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
let axios = require("axios")
const fs = require('fs');
const Clientlol = require("fortnite");
const ft = new Clientlol("c90fc89e-52fb-4fb5-a97d-9bcd26671800");
const { stripIndents } = require("common-tags");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('news')
		.setDescription('Replies with Fortnite News!'),
	      async execute(interaction, client) {
  let req = await axios({
    method: "get",
    url: `https://fortnite-api.com/v2/news/br`,
  }).catch((e) => {
    console.error(e.toJSON());
    return interaction.reply({
     ephemeral: true,
      content: "An error occured! Please try later :)",
      
    });
  });
  if (req) {
    req = req.data;
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Fortnite News")
      .setImage(req.data.image)
      .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
    interaction.reply({ ephemeral: true, embeds: [embed] });
    
  }
	},
};