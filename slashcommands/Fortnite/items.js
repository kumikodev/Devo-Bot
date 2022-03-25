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
		.setName('item')
		.setDescription('Replies with info about a item!')
        .addStringOption(option => option.setName('name').setDescription('Name of the item').setRequired(true)),
	      async execute(interaction, client) {
            const name = await interaction.options.getString("name");
            const req = await axios.get("https://fortniteapi.io/v2/items/list", {
                params : {
                    lang : "en",
                    name : name
                },
                headers : {
                    Authorization : "abebf976-77f65802-e5292d39-03a738dc"
                }
            })
            .catch(console.error)
            if(req) {
                let items = req.data.items
                if(items.length) {
                    let item = items[0]
                    let embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Showing item info for : ${item.name}`)
                    .setThumbnail(item.images.icon_background)
                    .setDescription(item.description)
                    .setImage(item.images.full_background)
                    .addFields([
                        {name : "Name", value : item.name},
                        {
                            name : "ID", value : item.id
                        },
                        {
                            name : "Gameplay Tags", value : builder.codeBlock(item.gameplayTags.join("\n"))
                        },
                         { name : "Type", value : item.type.name}
                    ])
                    if(item.set) embed.addField(`Set Info for ${item.set.id}`, `${builder.bold(item.set.name)}\n\n${item.set.partOf}`)
                    return interaction.reply({ephemeral: true, embeds : [embed]})
                } else {
                    return interaction.reply({ephemeral: true, embeds :[
                        new MessageEmbed()
                        .setTitle(`OOPS! Didn't find ${name}`)
                        .setColor("RED")
                        .setDescription("Please provide a correct name :)")
                    ]})
                }
            } else {
                return interaction.reply({ephemeral: true, embeds : [
                    new MessageEmbed()
                    .setColor("RED")
                    .setTitle("API ERROR. Please try later :)")
                ]})
        }
	},
};