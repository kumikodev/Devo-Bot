let axios = require('axios');

module.exports = {
    name: "invite",
    aliases: ["map"],
    async execute(message, client) {
        let { token, prefix, clientId } = require("../../Settings/config")

        const embed = new MessageEmbed()
				.setTitle('<:confusedlol:910987531288469504> Hey! You want to Invite me? <:confusedlol:910987531288469504>')
				.setColor('#0013FF')
				.setDescription(`**[Bot Invite](https://discord.com/api/oauth2/authorize?client_id=902588272755224656&permissions=8&scope=bot%20applications.commands)**`)
                .setTimestamp()
                .setFooter(interaction.client.user.username, interaction.client.user.displayAvatarURL())

    await message.reply({ embeds: [embed] });

    },
};