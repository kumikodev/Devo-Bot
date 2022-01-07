let axios = require('axios');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: "aes",
    aliases: ["map"],
    async execute(message, client) {
        let req = await axios({
            url : "https://fortnite-api.com/v2/aes",
            method : "get"
        })
        .catch(e => {
            console.error(e.toJSON())
            return message.reply({"content" : "An error occured! Please try later :)"})
        })
        if(req){
            req = req.data
            const spoilerString = spoiler(req.data.mainKey);
            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Fortnite AES • CHAPTER 3 SEASON 1")
            .addFields(
                { name: "**AES KEY: **", value: `${spoilerString}`, inline: true },
                { name: "**BUILD: **", value: `${req.data.build}`, inline: false }
            )
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL())
            const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setURL("https://www.devo-bot-api.tk/")
            .setLabel('View All AES Keys')
            .setStyle('LINK'),
    );

    await message.reply({ embeds: [embed], components: [row]  });
        }
    },
};