const urban = require('urban');
const Discord = require('discord.js');

module.exports = {
    name: 'random-urban',
    desciprtion: 'gives urban dictionary definiton of a random word',
    execute(client, api, config, message, args, con, guilds) {
        urban.random().first(json => {
            const def = new Discord.RichEmbed()
                .setTitle(json.word)
                .setDescription(json.definition)
                .addField('Upvotes', json.thumbs_up, true)
                .addField('Downvotes', json.thumb_down, true)
                .setTimestamp(new Date())
                .setFooter(`Written by ${json.author}`);

            message.channel.send(def);
        });
    },
};