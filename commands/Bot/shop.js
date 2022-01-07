let axios = require('axios');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: "shop",
    aliases: ["map"],
    async execute(message, client) {
        let req = await axios({
            url : "https://fortool.fr/cm/api/v1/shop/?lang=en",
            method : "get"
        })
        .catch(e => {
            console.error(e.toJSON())
            return message.reply({"content" : "An error occured! Please try later :)"})
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

    await message.reply({ embeds: [embed], components: [row] });
    }
    },
};