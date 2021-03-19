const discord = require("discord.js");

module.exports.run = async(client, message, arguments) => {

    var infoEmbed = new discord.MessageEmbed()
        .setTitle("info")
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setDescription("Zodra jij de server joint, wordt er informatie verzameld. Deze informatie kun je hieronder zien.")
        .setColor("#ff9900")
        .addFields(
            {name: "Jij heet: ", value: message.author.username},
            {name: "Jij bent gejoind op: ", value: message.member.joinedAt},
            {name: "Aantal leden in deze discord: ", value: message.guild.memberCount},
            {name: "Deze bot heet: ", value: client.user.username}
        )
        .setThumbnail("https://i.imgur.com/wSTFkRM.png")
        .setFooter("Als je meer informatie wilt, kun je Draqulius vragen om er meer in te doen", "https://i.imgur.com/wSTFkRM.png")        
        .setTimestamp();
    message.channel.send(infoEmbed);

}

module.exports.help = {
    name: "info" 
}