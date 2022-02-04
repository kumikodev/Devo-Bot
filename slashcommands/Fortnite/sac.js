const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

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
		.setName('creatorcode')
		.setDescription('Replies with info on a creatorcode!')
        .addStringOption(option => option.setName('name').setDescription('The Name Of The Creator')),
	async execute(interaction, client) {

        const name = await interaction.options.getString("name");


        Fortnite.CreatorCode(name)
        .then(res => {
          console.log(res);
          const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Creator Code • " + name.toUpperCase())
        .addField("**CODE**", `${res.data.code}`, false)
        .addField("**ACCOUNT ID**", `${res.data.account.id}`, false)
        .addField("**ACCOUNT NAME**", `${res.data.account.name}`, false)
        .addField("**STATUS**", `${res.data.status}`, false)
        .addField("**VERIFIED**", `${res.data.verified}`, false)
        .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
        interaction.reply({ ephemeral: true, embeds: [embed] });
        }).catch(err => {
          interaction.reply({ ephemeral: true, content: err.message })
        });

        
	},
};