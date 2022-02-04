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
		.setName('seasoninfo')
		.setDescription('Replies with info on the Season!'),
	async execute(interaction, client) {


        Fortnite.CosmeticsNew("en")
        .then(res => {
            console.log(res);
            const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Season Info • Solo")
        .addField("**BUILD**", `${res.data.build}`, false)
        .addField("**PREVIOUS BUILD**", `${res.data.previousBuild}`, false)
        .addField("**HASH**", `${res.data.hash}`, false)
        .addField("**DATE**", `${res.data.date}`, false)
        .addField("**LAST ADDITION**", `${res.data.lastAddition}`, false)
        .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
        interaction.reply({ ephemeral: true, embeds: [embed] });
        }).catch(err => {
          interaction.reply({ ephemeral: true, content: err.message })
        });

        
	},
};