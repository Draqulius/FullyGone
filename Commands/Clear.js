const discord = require("discord.js");

module.exports.run = async(client, message, arguments) => {

    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("Jij hebt geen toestemming om dit te doen");

    if(!arguments[0]) return message.reply("Geef een aantal op.");

    if(Number.isInteger(parseInt(arguments[0]))){

        var amount = parseInt(arguments[0]) + 1;

        message.channel.bulkDelete(amount).then(() =>{
            if(arguments[0] <= 0){
                message.reply("Ik kan helaas voor jou geen 0 berichten verwijderen.").then(msg => msg.delete({timeout: 3000}));
            }else if(arguments[0] == 1){
                message.reply("Ik heb 1 bericht verwijderd.").then(msg => msg.delete({timeout: 3000}));
            }else {
                message.reply(`ik heb ${amount - 1} berichten verwijderd.`).then(msg => msg.delete({timeout: 3000}));
            }

        })

    } else {

        return message.reply("Geef een getal op.");

    }

}

module.exports.help = {
    name: "clear" 
}