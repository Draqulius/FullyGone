const discord = require("discord.js");

module.exports.run = async(client, message, arguments) => {

    const categoryID = "821770942040506378";

    var userName = message.author.username;
    var userdiscriminator = message.author.discriminator;

    var ticketBestaat = false;

    message.guild.channels.cache.forEach(channel => {

        if(channel.name == userName.toLowerCase() + "-" + userdiscriminator){
            ticketBestaat = true;

            message.reply("Je hebt al een ticket aangemaakt!");

            return;
        }
        
    });

    if(ticketBestaat) return;

    var embed = new discord.MessageEmbed()
        .setTitle("Hoi " + message.author.username)
        .setFooter("Support kanaal word aangemaakt.");

        message.channel.send(embed);

        message.guild.channels.create(userName.toLowerCase() + "-" + userdiscriminator, {type: 'text'}).then(
            (createdChannel) => {
                createdChannel.setParent(categoryID).then(
                    (settedParent) => {

                        settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                            SEND_MESSAGES: false,
                            VIEW_CHANNEL: false
                        });

                        settedParent.updateOverwrite(message.author.id, {
                            CREATE_INSTAND_INVITE: false,
                            READ_MESSAGES: true,
                            SEND_MESSAGES: true,
                            ATTACH_FILES: true,
                            CONNECT: true,
                            ADD_REACTIONS: true,
                            VIEW_CHANNEL: true,
                            READ_MESSAGE_HISTORY: true
                        });

                        var embedParent = new discord.MessageEmbed()
                        .setTitle(`Hoi ${message.author.username}`)
                        .setDescription("Zet hier je bericht/vraag beneden neer");

                        settedParent.send(embedParent);

                    }
                ).catch(err => {
                    message.channel.send("Er is iets misgegaan");
                });
            }
        ).catch(err => {
            message.channel.send("Er is iets misgegaan");
        });

}

module.exports.help = {
    name: "ticket" 
}  