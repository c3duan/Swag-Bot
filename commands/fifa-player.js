const Discord = require('discord.js');
const request = require('request');
const fs = require('fs');
if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch-polyfill');
}
const d3 = require('d3');

module.exports = {
    name: 'fifa-player',
    description: 'Returns stats for a football player',
    usage: '[team name] [player name]',
    cooldown: 5,
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        const playerName = args.join(' ').toLowerCase();        
        let playerCSVData = null;    

        try {
            const file_content = fs.readFileSync('./Data/FIFA/CompleteDataset.csv', 'utf-8');
            playerCSVData = d3.csvParse(file_content).find(datum => {
                const name = datum.Name.toLowerCase();
                const firstPart = name[0].replace(/./g, '');
                const secondPart = name[1];
                return name === playerName || (args[0].search(firstPart) && secondPart === args[2]);
            });
            console.log(playerCSVData);
           
            const statsText = new Discord.RichEmbed()
                .setColor(3447003)
                .setTitle(`:soccer: ${playerCSVData.Name}`)
                .setAuthor('Player Info', `https://cdn.sofifa.org/teams/10/19/light/${playerCSVData['Club Logo'].slice(35)}`)
                .setThumbnail(`https://cdn.sofifa.org/players/10/19/${playerCSVData.ID}.png`)
                .setDescription('FIFA Player Info [Note all infos are based on 2018, please wait for updates on 2019]')
                .addField('Current Club', playerCSVData.Club, true)
                .addField('Preferred Positions', playerCSVData['Preferred Positions'], true)
                .addField('Age', playerCSVData.Age, true)
                .addField('Nationality', playerCSVData.Nationality, true)
                .addField('Value', playerCSVData.Value, true)
                .addField('Wage', playerCSVData.Wage, true)
                .addBlankField()
                .addField('Overall Rating', playerCSVData.Overall);

            if(playerCSVData['Preferred Positions'].search('GK') !== -1) {
                statsText
                    .addField('GK Diving', playerCSVData['GK diving'], true)
                    .addField('GK Handling', playerCSVData['GK handling'], true)
                    .addField('Gk Kicking', playerCSVData['GK kicking'], true)
                    .addField('GK Positioning', playerCSVData['GK positioning'], true)
                    .addField('GK Reflexes', playerCSVData['GK reflexes'], true);
            }
            else {
                statsText
                    .addField('Acceleration', playerCSVData.Acceleration, true)
                    .addField('Sprint Speed', playerCSVData['Sprint speed'], true)
                    .addField('Dribbling', playerCSVData.Dribbling, true)
                    .addField('Finishing', playerCSVData.Finishing, true)
                    .addField('Passing', Math.floor(( parseInt(playerCSVData['Long passing']) + parseInt(playerCSVData['Short passing']) ) / 2), true)
                    .addField('Crossing', playerCSVData.Crossing, true)
                    .addField('Tackle', Math.floor(( parseInt(playerCSVData['Sliding tackle']) + parseInt(playerCSVData['Standing tackle']) ) / 2), true);
            }
            
            statsText
                .setTimestamp(new Date())
                .setFooter('FIFA Player Stats', playerCSVData.Flag);

            return message.channel.send(statsText);
        
        }
        // Error catching for non-API related issues
        catch (error) {
            console.log(error);
            return message.reply('I am unable to retrieve FIFA statistics');
        }
    },
};