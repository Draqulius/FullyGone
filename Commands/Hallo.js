const discord = require("discord.js");

module.exports.run = async(client, message, arguments) => {

    return message.channel.send("hallo " + message.author.username);

}

module.exports.help = {
    name: "hallo" 
}  