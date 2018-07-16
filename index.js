// require the discord.js module
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
// create a new discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
});

// login to Discord with your app's token
client.login(token);

client.on('message', message => {
    if (message.content.startsWith(`${prefix}ping`)) {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong.');
    }
    else if (message.content.startsWith(`${prefix}beep`)) {
        message.channel.send('Boop.');
    }
    else if (message.content == `${prefix}server`) {
        message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    }
    else if (message.content == `${prefix}user-info`) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
    else if (message.content == `Logan`) {
        message.channel.send('Logan the degenerate who does not have a hairline, rip losupo');
    }
});