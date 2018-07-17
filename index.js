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
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    else if (command === 'ping') {
        // send back "Pong." to the channel the message was sent in
        message.channel.send('Pong.');
    }
    else if (command === 'beep') {
        message.channel.send('Boop.');
    }
    else if (command === 'server') {
        message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    }
    else if (command === 'user-info') {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    }
    else if (command === 'Logan') {
        message.channel.send('Logan (aka the degenerate boy) does not have a hairline, rip losupo');
    }
    else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        else if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
        message.channel.send(`First Argument: ${args[0]}`);
    }
    else if (command === 'kick' ) {
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to kick them!');
        }
        else {
            // grab the "first" mentioned user from the message
            // this will return a `User` object, just like `message.author`
            const taggedUser = message.mentions.users.first();

            message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        }
    }

    else if (command == 'avatar') {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
        }

        const avatarList = message.mentions.users.map(user => {
            return `${user.username}'s avatar: ${user.displayAvatarURL}`;
        });

        // send the entire array of strings as a message
        // by default, discord.js will `.join()` the array with `\n`
        message.channel.send(avatarList);
    }
    
});