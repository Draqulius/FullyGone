const discord = require("discord.js");

module.exports.run = async(client, message, arguments) => {

    const categoryID = "821770942040506378";

    if(!message.member.hasPermission("KICK_MEMBER")) return message.reply("Jij kan dit niet doen, Sorry")

    if(message.channel.parentID == categoryID){
        message.channel.delete();
    }else{

        message.channel.send("Kunt u dit command alstublieft in een ticketkanaal doen.");

    }

}

module.exports.help = {
    name: "close" 
}  