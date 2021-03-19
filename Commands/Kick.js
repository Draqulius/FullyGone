const discord = require("discord.js");

module.exports.run = async(client, message, arguments) => {

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry, jij kunt dit commando niet uitvoeren.");

    if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Sorry, ik heb geen perms om mensen te kicken.");

    if (!arguments[0]) return message.reply("Geen gebruiker opgegeven");

    if (!arguments[1]) return message.reply("Geen reden opgegeven");

    var kickUser = message.guild.member(message.mentions.users.first() || message.guild.member(arguments[0]));

    var reason = arguments.slice(1).join(" ");

    if (!kickUser) return message.reply("Deze speler is niet gevonden");

    var surekickEmbed = new discord.MessageEmbed()
        .setTitle("zou je binnen 30 seconden op dit bericht willen reageren?")
        .setColor("#ff9900")
        .setDescription(`Wil je ${kickUser} echt kicken?`);
        
    var kickEmbed = new discord.MessageEmbed()
        .setTitle("***kick***")
        .setColor("#ff9900")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`***Gekickt: *** ${kickUser} (${kickUser.id})
            **Gekickt door: ** ${message.author}
            **Reden: ** ${reason}`);
    message.channel.send(surekickEmbed).then(async msg => {

        var emoji = await promptMessage(msg , message.author, 30, ["💚", "❤"]);

        if(emoji === "💚"){ 

            msg.delete();

            kickUser.kick(reason).catch(err =>{
                if(err) return message.reply("Er is iets fout gegaan");
            });

            message.channel.send(kickEmbed);

        }else if(emoji === "❤"){

            msg.delete();

            message.reply("De bijna gekickte speler hoeft nu niet meer gekickt te worden.").then(m => m.delete(5000));

        }

            

    })

}

async function promptMessage(message, author, time, reactions){

    time *= 1000;

    for(const reaction of reactions){
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

} 
  
module.exports.help = {
    name: "kick" 
}
