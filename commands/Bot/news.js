let axios = require('axios');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: "news",
    aliases: ["map"],
    async execute(message, client) {

        let req = await axios({
            url : "https://fortnite-api.com/v2/news/br",
            method : "get"
        })
        .catch(e => {
            console.error(e.toJSON())
            return message.reply({"content" : "An error occured! Please try later :)"})
        })
        if(req){
            req = req.data
                const embed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle("Fortnite News • CHAPTER 3 SEASON 1")
                .setImage(req.data.image)
                .setTimestamp()
                .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL())

                const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setURL(req.data.image)
                .setLabel('View News')
                .setStyle('LINK'),
        );

    await message.reply({ embeds: [embed], components: [row] });
    }
    },
};