const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
let axios = require("axios")
const fs = require('fs');
const Clientlol = require("fortnite");
const ft = new Clientlol("c90fc89e-52fb-4fb5-a97d-9bcd26671800");
const { stripIndents } = require("common-tags");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('shop')
		.setDescription('Replies with the current fortnite shop!'),
	      async execute(interaction, client) {




			let req = await axios({
                url : "https://fortool.fr/cm/api/v1/shop/?lang=en",
                method : "get"
            })
            .catch(e => {
                console.error(e.toJSON())
                return interaction.reply({"content" : "An error occured! Please try later :)"})
            })
            if(req){
                req = req.data
                const embed1 = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Fortnite Item Shop • COSMETICS')
                .setImage(req.images.default)
                .setTimestamp()
                .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL())
                const store = await ft.store();
                const embed = new MessageEmbed()
                .setTitle("Fortnite Item Shop • PRICES")
                .setColor("RANDOM")
                store.sort((a, b) => {
                    return b.vbucks - a.vbucks;
                });
                store.forEach(el => {
                    embed.addField(el.name, stripIndents`**- Rarity:** ${el.rarity}
                    **- Price:** ${el.vbucks} v-bucks`, true)
                });

                const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setURL(req.images.default)
                .setLabel('View Shop Image')
                .setStyle('LINK'),
        );

        await interaction.reply({ ephemeral: true, embeds: [embed1, embed], components: [row] });
        }
	},
};