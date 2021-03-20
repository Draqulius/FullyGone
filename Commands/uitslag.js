const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var categoryID = "822081515404001281"; // Category id van de tickets inzetten

    var ticketUser = message.guild.member(message.mentions.users.first());

    if(message.channel.parentID !== categoryID) return message.reply("Jij kan dit niet doen") && message.delete();

    if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Jij kan dit niet doen") && message.delete();

    if(!ticketUser) return message.reply("Geef een persoon op") && message.delete();

    var kiesEmbed = new discord.MessageEmbed()
        .setTitle("KIES")
        .setColor("#00bfff")
        .addField(`Aangenomen:`, '✅', false)
        .addField("Afgewezen:", "❌", false);

    var redenEmbed = new discord.MessageEmbed()
        .setTitle("KIES")
        .setColor("#00BFFF")
        .addField(`Reden`, `Vertel een reden`, false)

    const filter = m => m.content;

    message.channel.send(kiesEmbed).then(async msg => {

        message.delete();

        var emoji = await promptMessage(msg, message.author, 60, ["✅", "❌"]);

        if(emoji === "✅"){
            
            message.channel.send(redenEmbed).then(msg => msg.delete({timeout: 10000}));

            message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(collected => {

                var redenGood = collected.first();

                var antwoordGood = new discord.MessageEmbed()
                    .setTitle("Aangenomen")
                    .setColor("#00ff00")
                    .addField("Wie:", `${ticketUser}`, false)
                    .addField("Reden:", `${redenGood}`, false)

                message.channel.send(antwoordGood);
                message.channel.bulkDelete(1);
                message.channel.setTopic(`**Sollicitant**: ${ticketUser} **Status**: Aangenomen!`);

            })
        }else if(emoji === "❌"){
            
            message.channel.send(redenEmbed).then(msg => msg.delete({timeout: 10000}));

            message.channel.awaitMessage(filter, {max: 1, time: 10000}).then(collected => {

                var redenBad = collected.first();

                var antwoordBad = new discord.MessageEmbed()
                    .setTitle("Afgewezen")
                    .setColor("#00ff00")
                    .addField("Wie:", `${ticketUser}`, false)
                    .addField("Reden:", `${redenBad}`, false)

                message.channel.send(antwoordBad);
                message.channel.bulkDelete(1);
                message.channel.setTopic(`**Sollicitant**: ${ticketUser} **Status**: Afgewezen!`);

            })
        }

    })


}

async function promptMessage(message, author, time, reactions) {

    time *= 1000;

    for(const reaction of reactions) {
        await message.react(reaction);
    }

    const filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, {max:1, time: time}).then(collected => collected.first() && collected.first().emoji.name);

}

module.exports.help = {
    name: "uitslag",
    description: "Geef de uitslag van een sollicitatie",
    category: "Informatie"
}