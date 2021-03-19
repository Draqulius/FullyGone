const discord = require("discord.js");
const botConfig = require("./botconfig.json");
 
const fs = require("fs");

const client = new discord.Client();

client.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`);

        client.commands.set(fileGet.help.name, fileGet);

    })

});

client.on("ready", async () => {

    console.log(`${client.user.username} is online!`);

    client.user.setActivity("Mensen", { type: "WATCHING" });

});


client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get('821765802163437616');

    if(!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get('821765802327670826');

    if (!channel) return;

    // channel.send(`Welkom bij de server ${member}`);

    var joinEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setDescription(`Hoi ${member.user.username}, **Welkom op de server**, Check even de regels en de rollen, als je dat hebt gedaan kun je op de server chillen en chatten`)
        .setColor("#0099ff")
        .setFooter("Gebruiker gejoined")
        .setTimestamp();

    channel.send(joinEmbed);

});


client.on("guildMemberRemove", member => {

    var channel = member.guild.channels.cache.get('822202312314585188');

    if (!channel) return;

    var leaveEmbed = new discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
        .setDescription(`${member.user.username} is de server geleaved😪`)
        .setColor("#FF0000")
        .setFooter("Gebruiker geleaved")
        .setTimestamp();

    channel.send(leaveEmbed);

});

 
client.on("message", async message => {
 
    if(message.author.bot) return;
 
    if(message.channel.type === "dm") return;
 
    var prefix = botConfig.prefix;
 
    var messageArray = message.content.split(" ");
 
    var arguments = messageArray.slice(1);
    
    var command = messageArray[0];

    if(!message.content.startsWith(prefix)) return;
 
    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);
    

});

client.login(process.env.token);