const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async(client, message, arguments) => {

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, jij kunt dit commando niet uitvoeren.");

    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, ik heb geen perms om mensen te bannen.");

    if (!arguments[0]) return message.reply("Geen gebruiker opgegeven");

    if (!arguments[1]) return message.reply("Geen reden opgegeven");

    var warnUser = message.guild.member(message.mentions.users.first() || message.guild.member(arguments[0]));

    var userName = message.guild.member(message.mentions.users.first() || message.guild.member(arguments[0]));

    var reason = arguments.slice(1).join(" ");

    if (!warnUser) return message.reply("Deze speler is niet gevonden");

    if(warnUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Sorry, jij kunt deze speler niet waarschuwen");

    if (!warns[warnUser.id]) warns[warnUser.id] = {

        warns: 0

    }

    warns[warnUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

    var warnEmbed = new discord.MessageEmbed()
        .setTitle("Waarschuwing!")
        .setColor("#ff9900")
        .setDescription(`**Gewaarschuwde speler: ** ${warnUser} (${warnUser.id})
        **Gewaarschuwd door: ** ${message.author}
        **Reden: ** ${reason}`)
        .addField("Aantal keer gewaarschuwd: ", warns[warnUser.id].warns);
   
    var channel = message.guild.channels.cache.find(channel => channel.name === 'bot-commandos');

    channel.send(warnEmbed);

}

module.exports.help = {
    name: "warn" 
}