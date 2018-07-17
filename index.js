const fs = require('fs');
// require the discord.js module
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
// create a new discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFlies = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFlies) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported value
    client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) {
        return;
    }

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.replay('I can\'t execute the command inside DMS!');
    }

    try {
        command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute the command!');
    }
});

// login to Discord with your app's token
client.login(token);