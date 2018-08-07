const urban = require('urban');
const Discord = require('discord.js');

module.exports = {
    name: 'urban',
    desciprtion: 'gives urban dictionary definiton of a word',
    usage: 'urban <word>',
    execute(client, api, config, message, args, con) {
        if (args.length < 1) {
            return message.channel.send('Please enter a word');
        }
        let word = args.join(' ');

        urban(word).first(json => {
            if (!json) {
                return message.channel.return('No such word exist!');
            }
            console.log(json);
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