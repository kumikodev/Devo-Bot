const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

let axios = require("axios")


module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Replies with info!'),
    async execute(interaction, client) {
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Bot Info • Devo")
            .addField("**OWNER: **", `[TIKTOK](https://www.tiktok.com/@pre.dev?lang=en)`, false)
            .addField("**GITHUB: **", `[GITHUB](https://github.com/Vexidevlol/Devo-Bot)`, false)
            .addField("**OWNERS WEBSITE: **", `[WEBSITE](https://www.vexidev.tk/)`, false)
            .setFooter({ text: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
        interaction.reply({ ephemeral: true, embeds: [embed] });




    },
};