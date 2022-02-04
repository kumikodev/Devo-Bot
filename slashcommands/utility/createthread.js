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
		.setName('createthread')
		.setDescription('Creates a thread!')
        .addStringOption(option => option.setName('name').setDescription('name of the thread'))
        .addNumberOption(option => option.setName('duration').setDescription('Enter a Duration')),
	      async execute(interaction, client) {
            //await interaction.deferReply();
            let name = await interaction.options.getString('name')
            const number = interaction.options.getNumber('duration');


            const thread = await interaction.channel.threads.create({
                name: name,
                autoArchiveDuration: number,
                reason: 'Solo made this',
            });
            
            console.log(`Created thread: ${thread.name}`);
            interaction.reply({ ephemeral: true, content: `Created Thread ${name}` })

            
	},
};