const Discord = require('discord.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/DiscordDB', { useNewUrlParser: true }, err => {
    if (err) console.error(err);
    console.log(mongoose);
});
const Money = require('../models/money.js');


module.exports = {
    name: 'coins-leader',
    aliases: ['money-leader'],
    description: 'displays the top 10 users that have the most coins',
    cooldown: 5,
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        console.log(Money.find().sort({ 'money': -1 }));
    },
};