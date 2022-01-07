let axios = require('axios');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: "token",
    aliases: ["map"],
    async execute(message, client) {
        let req = await axios({
            url : "https://api.nitestats.com/v1/epic/bearer",
            method : "get"
        })
        .catch(e => {
            console.error(e.toJSON())
            return interaction.reply({"content" : "An error occured! Please try later :)"})
        })
        if(req){
            req = req.data
            const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle("Epic Games Client Credentials Token")
            .setDescription("Your Credentials: " + req.accessToken)
            .setTimestamp()
            .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL())

    await message.channel.send({ embeds: [embed] });
    }
    },
};