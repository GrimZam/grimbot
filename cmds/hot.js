const Discord = require("discord.js");
const snekfetch = require('snekfetch')

module.exports.run = async (bot, message, args) => {
    try {
        const { body } = await snekfetch
        .get('https://www.reddit.com/r/gonewild.json?sort=top&t=week')
        .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('Il semble que je suis à court de nouvelle photos hot ! Réessaye plus tard.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        let embed = new Discord.RichEmbed()
        .setColor("#F7BA2A")
        .setTitle("Photo fourni par r/gonewild")
        .setImage(allowed[randomnumber].data.url)
        .setDescription("Posté par: " + allowed[randomnumber].data.author)
        .addField("Info:", "Up votes: " + allowed[randomnumber].data.ups + " / Commentaires: " + allowed[randomnumber].data.num_comments)
        .setFooter(`Demandé par ${message.author.username}`)
        .setTimestamp()
        message.channel.send({embed: embed});
        message.delete().catch();
    } catch (err) {
        return console.log(err);
    }
}

module.exports.help = {
    name: "hot"
}      