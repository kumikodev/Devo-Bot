const { SlashCommandBuilder, bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
let axios = require("axios")
const fs = require('fs');
const Clientlol = require("fortnite");
const ft = new Clientlol("c90fc89e-52fb-4fb5-a97d-9bcd26671800");
const { stripIndents } = require("common-tags");

const FortniteAPI = require('fortnite-api-com');

const config = {
  apikey: "744e45fb-94e2-4852-a604-ce9e86156e4b",
  language: "en",
  debug: true
};

var Fortnite = new FortniteAPI(config);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Replies with your stats!')
        .addStringOption(option => option.setName('username').setDescription('Username of the account')),
	      async execute(interaction, client) {
            //await interaction.deferReply();
            let player = await interaction.options.getString('username')

            Fortnite.BRStats({name: player})
            .then(async res => {
                console.log(res);
                const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("STATS • " + player.toUpperCase())
                .addField("**ACCOUNT ID**", `${res.data.account.id}`, false)
                .addField("**ACCOUNT NAME**", `${res.data.account.name}`, false)
                .addField("**BATTLE PASS LEVEL**", `${res.data.battlePass.level}`, false)
                .addField("**BATTLE PASS PROGRESS**", `${res.data.battlePass.progress}`, false)
                //.addField("**VERIFIED**", `${res.data.verified}`, false)
                .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
        await interaction.reply({ ephemeral: true, embeds: [embed] });
            }).catch(err => {
                interaction.reply({ ephemeral: true, content: err.message })
            });
            
	},
};