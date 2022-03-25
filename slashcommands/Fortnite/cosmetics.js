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
		.setName('cosmeticsearch')
		.setDescription('Replies with info on a Cosmetic!')
        .addStringOption(option => option.setName('name').setDescription('Name of the Cosmetic').setRequired(true)),
	async execute(interaction, client) {

        const name = await interaction.options.getString("name");

        Fortnite.CosmeticsSearch({name: name, matchMethod: "contains", language: "en"})
        .then(res => {
            console.log(res);
            const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(res.data.name)
        .setThumbnail(res.data.images.smallIcon)

        .addField("\u200B", `\u200B`, true)

        .addField("**ID**", `${res.data.id}`, false)
        .addField("**NAME**", `${res.data.name}`, false)
        .addField("**DESCRIPTION**", `${res.data.description}`, false)

        .addField("**TYPE**", `\u200B`, true)

        .addField("\u200B", `\u200B`, true)

        .addField("**VALUE**", `${res.data.type.value}`, false)
        .addField("**DISPLAY VALUE**", `${res.data.type.displayValue}`, false)
        .addField("**BACKEND VALUE**", `${res.data.type.backendValue}`, false)

        .addField("**RARITY**", `\u200B`, true)

        .addField("\u200B", `\u200B`, true)

        .addField("**VALUE**", `${res.data.rarity.value}`,)
        .addField("**DISPLAY VALUE**", `${res.data.rarity.displayValue}`, false)
        .addField("**BACKEND VALUE**", `${res.data.rarity.backendValue}`, false)

        .addField("**INTRODUCTION**", `\u200B`, true)

        .addField("\u200B", `\u200B`, true)

        .addField("**CHAPTER**", `${res.data.introduction.chapter}`, false)
        .addField("**SEASON**", `${res.data.introduction.season}`, false)
        .addField("**TEXT**", `${res.data.introduction.text}`, false)

        .addField("**DEFINITION PATH**", `${res.data.definitionPath}`, false)
        .addField("**PATH**", `${res.data.path}`, false)
        .addField("**ADDED**", `${res.data.added}`, false)


        .setImage(res.data.images.icon)
        .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
        interaction.reply({ ephemeral: true, embeds: [embed] });


        }).catch(err => {
            //console.log(err);
            interaction.reply({ ephemeral: true, content: "Sorry, But we Have a Error" })
        });

        
	},
};