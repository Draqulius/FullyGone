const Discord = require("discord.js");

module.exports.run = async(bot, message, arguments) => {
    
    message.delete();

    var nummer = Math.floor(Math.random(1) * 9998) + 1; 

    var nummer1 = nummer;

    message.channel.send(message.author.username + ": " + nummer1).then(async msg => { 

        var filter = m => m.author.id == message.author.id;
        try {
            var collectedMessages = await message.channel.awaitMessages(filter, {time: 60000, max: 1, errors: ["time"]});
            var response = collectedMessages.first().content;
            if(nummer1 == response) {
                var role = message.guild.roles.cache.find("821765802163437616")
                if(!role) return message.channel.send("fout: geen role!");
    
                message.member.role.add(role);
                
            }else{
                message.channel.send(`${message.author.username}, probeer het nog een keer.`).then(f => f.delete({timeout: 3000}));
            }
        } catch (e) {

            msg.delete();

            var role = message.guild.roles.cache.get("821765802163437616");
            if(!role) return message.channel.send("fout: geen role!");
    
            message.channel.send(`${message.author.username}, je hebt de role: Lid gekregen.`).then(f => f.delete({timeout: 3000}));
            
            message.member.roles.add(role);
        }

        

    }) 

}

module.exports.help = {
    name: "verificatie",
    description: "Verifier jezelf",
    category: "Informatie" 
}