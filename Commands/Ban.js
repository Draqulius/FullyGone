const discord = require("discord.js");

module.exports.run = async(client, message, arguments) => {

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, jij kunt dit commando niet uitvoeren.");

    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Sorry, ik heb geen perms om mensen te bannen.");

    if (!arguments[0]) return message.reply("Geen gebruiker opgegeven");

    if (!arguments[1]) return message.reply("Geen reden opgegeven");

    var banUser = message.guild.member(message.mentions.users.first() || message.guild.member(arguments[0]));

    var reason = arguments.slice(1).join(" ");

    if (!banUser) return message.reply("Deze speler is niet gevonden");

    var surebanEmbed = new discord.MessageEmbed()
        .setTitle("zou je binnen 30 seconden op dit bericht willen reageren?")
        .setColor("#ff9900")
        .setDescription(`Wil je ${banUser} echt bannen?`);
    
    var banEmbed = new discord.MessageEmbed()
        .setTitle("***ban***")
        .setColor("#ff9900")
        .setFooter(message.member.displayName)
        .setTimestamp()
        .setDescription(`***Gebannd: *** ${banUser} (${banUser.id})
            **Gebannd door: ** ${message.author}
            **Reden: ** ${reason}`);
    message.channel.send(surebanEmbed).then(async msg => {

        var emoji = await promptMessage(msg , message.author, 30, ["💚", "❤"]);

        if(emoji === "💚"){ 

            msg.delete();

            banUser.ban(reason).catch(err =>{
                if(err) return message.reply("Er is iets fout gegaan");
            });

            message.channel.send(banEmbed);

        }else if(emoji === "❤"){

            msg.delete();

            message.reply("De bijna gebannde speler hoeft nu niet meer gekickt te worden.").then(m => m.delete(5000));

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
    name: "ban" 
}

async function promptMessage(message, author, time, reactions){

    time *= 1000;

    for(const reaction of reactions){
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

}   