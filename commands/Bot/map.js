let axios = require('axios');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: "map",
    aliases: ["map"],
    async execute(message, client) {
        let req = await axios({
            url : "https://fortnite-api.com/v1/map",
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
            .setTitle("Fortnite Map • CHAPTER 3 SEASON 1")
            .setImage(req.data.images.pois)
            .setTimestamp()
            .setFooter(message.client.user.username, message.client.user.displayAvatarURL())

            const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setURL(req.data.images.pois)
            .setLabel('View Map')
            .setStyle('LINK'),
    );

    await message.reply({ embeds: [embed], components: [row] });
    }
    },
};