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
		.setName('playlistid')
		.setDescription('Replies with info on a playlist!')
        .addStringOption(option => option.setName('id').setDescription('ID of the playlist')),
	      async execute(interaction, client) {
            //await interaction.deferReply();
            let name = await interaction.options.getString('id')

            Fortnite.PlaylistsID(name, "en")
            .then(async res => {
                console.log(res);
                const embed = new MessageEmbed()
                .setColor("RANDOM")


                .setTitle("PLAYLIST INFO FOR • " + name.toUpperCase())
                .addField("**ID**", `${res.data.id}`, false)
                .addField("**NAME**", `${res.data.name}`, false)
                .addField("**DESCRIPTION**", `${res.data.description}`, false)

                .addField("**GAME TYPE**", `${res.data.gameType}`, false)
                .addField("**RATING TYPE**", `${res.data.ratingType}`, false)
                .addField("**MIN PLAYERS**", `${res.data.minPlayers}`, false)

                .addField("**MAX PLAYERS**", `${res.data.maxPlayers}`, false)
                .addField("**MAX TEAMS**", `${res.data.maxTeams}`, false)
                .addField("**MAX TEAM SIZE**", `${res.data.maxTeamSize}`, false)

                .addField("**MAX SQUADS**", `${res.data.maxSquads}`, false)
                .addField("**MAX SQUAD SIZE**", `${res.data.maxSquadSize}`, false)
                .addField("**IS TOURNAMENT**", `${res.data.isTournament}`, false)

                .addField("**IS LTM**", `${res.data.isLimitedTimeMode}`, false)
                .addField("**ACCUMULATE TO PROFILE STATS**", `${res.data.accumulateToProfileStats}`, false)
                .addField("**PATH**", `${res.data.path}`, false)

                .addField("**ADDED**", `${res.data.added}`, false)

                .setImage(res.data.images.showcase)




                .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
        await interaction.reply({ ephemeral: true, embeds: [embed] });
            }).catch(err => {
                interaction.reply({ ephemeral: true, content: err.message })
            });
            
	},
};