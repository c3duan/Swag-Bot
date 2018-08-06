// require the discord.js module
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const chalk = require('chalk');
const RiotApi = require('lol-stats-api-module');
const mysql = require('mysql');

// create a new riot api
const api = new RiotApi({
    key: config.riot_api_key,
    region: config.riot_api_region,
});

// create a new discord client
const client = new Discord.Client();
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
const commandFlies = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFlies) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported value
    client.commands.set(command.name, command);
}

// set up the mysql account info
const con = mysql.createConnection({
    host: config.mysql_host,
    user: config.mysql_user,
    password: config.mysql_password,
    database: config.mysql_database,
});

// connect to mysql database
con.connect(err => {
    if (err) {
        throw err;
    }
    console.log('Connected to database!');
    con.query('SHOW TABLES', console.log);
});

// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {

    // connect to the riot api
    api.getVersionsStaticData({ region: 'na' }, (err, data) => {
        const success = chalk.green;
        const error = chalk.red;
        const neutral = chalk.gray;

        const file_content = fs.readFileSync('./config.json', 'utf-8');
        const jsonObj = JSON.parse(file_content);

        // Check if version defined in config.json is even with one in api callback.
        if (jsonObj.riot_api_version !== data) {
            // Write actual version.
            jsonObj.riot_api_version = data;
            fs.writeFile('./config.json', JSON.stringify(jsonObj, null, 4), 'utf-8', (err) => {
                // Save it to the configuration file.
                if(!err) console.log(success('Updated ') + 'Riot Api version in ' + neutral('configuration file.'));
                else console.log(error('Couldn\'t ') + 'update ' + neutral('configuration file') + ' with latest Riot Api version.');
            });
        }
        if (!err) {
            console.log(success('Estabilished ') + 'connection with Riot Api v-' + neutral(data));
        }
        else {
            console.log(error('Couldn\'t ') + 'connect to Riot Api. Error code: ' + neutral(err.code));
        }
    });

    console.log('Ready!');
});

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {
	if (!events.hasOwnProperty(event.t)) return;

	const { d: data } = event;
	const user = client.users.get(data.user_id);
	const channel = client.channels.get(data.channel_id) || await user.createDM();

	if (channel.messages.has(data.message_id)) return;

	const message = await channel.messages.fetch(data.message_id);
	const emojiKey = data.emoji.id || data.emoji.name;
	const reaction = message.reactions.get(emojiKey) || message.reactions.add(data);

	client.emit(events[event.t], reaction, user);
	if (message.reactions.size === 1) message.reactions.delete(emojiKey);
});

client.on('messageReactionAdd', (reaction, user) => {
	console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
});

client.on('messageReactionRemove', (reaction, user) => {
	console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);
});

client.on('message', message => {
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
                    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.replay('I can\'t execute the command inside DMS!');
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (!timestamps.has(message.author.id)) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    else {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command. `);
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    try {
        command.execute(client, api, config, message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute the command!');
    }
});

// login to Discord with your app's token
client.login(config.token);