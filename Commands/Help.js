const discord = require("discord.js");
const botConfig = require("../botconfig.json");

module.exports.run = async(client, message, arguments) => {

    var prefix = botConfig.prefix;

    var helpEmbed = new discord.MessageEmbed()
        .setTitle(message.guild.name)
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setDescription("**hieronder vind je alle beschikbare commando's")
        .setColor("#ff9900")
        .addFields(
            {name: "**Commando's zijn jij kunt uitvoeren: **", value: `${prefix}ticket \n ${prefix}apply \n ${prefix}help`},
            {name: "**Commando's die staff kan uitvoeren: ", value: `${prefix}ban \n ${prefix}giveaway \n ${prefix}kick \n ${prefix}clear \n ${prefix}warn \n ${prefix}close`},
            {name: "**Spelletjes**: ", value: "Momenteel zijn er nog geen spellen"}
        )
        .setFooter("Als je meer informatie wilt, kun je Draqulius vragen om er meer in te doen", "https://i.imgur.com/wSTFkRM.png")        
        .setTimestamp();
    message.author.send(helpEmbed);

    message.reply("Er is hulp naar jou verzonden in je dm.");

}

module.exports.help = {
    name: "help" 
}