// require the discord.js module
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const chalk = require('chalk');
const RiotApi = require('lol-stats-api-module');
const mysql = require('mysql');
const snekfetch = require('snekfetch');
const Canvas = require('canvas');

// create a new riot api
const api = new RiotApi({
    key: config.riot_api_key,
    region: config.riot_api_region,
});

// create a new discord client
const client = new Discord.Client();
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
client.mutes = require('./mute.json');
const commandFlies = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
console.log(commandFlies.length);

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

function generateXp() {
    const min = 10;
    const max = 30;

    return Math.floor(Math.random() * (max - min + 1));
}

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

        console.log(data[0]);
        const file_content = fs.readFileSync('./config.json', 'utf-8');
        const jsonObj = JSON.parse(file_content);

        // Check if version defined in config.json is even with one in api callback.
        if (jsonObj.riot_api_version !== data[0]) {
            // Write actual version.
            jsonObj.riot_api_version = data[0];
            fs.writeFile('./config.json', JSON.stringify(jsonObj, null, 4), 'utf-8', (err) => {
                // Save it to the configuration file.
                if(!err) console.log(success('Updated ') + 'Riot Api version in ' + neutral('configuration file.'));
                else console.log(error('Couldn\'t ') + 'update ' + neutral('configuration file') + ' with latest Riot Api version.');
            });
        }
        if (!err) {
            console.log(success('Estabilished ') + 'connection with Riot Api v-' + neutral(data[0]));
        }
        else {
            console.log(error('Couldn\'t ') + 'connect to Riot Api. Error code: ' + neutral(err.code));
        }

        process.on('unhandledRejection', error => console.error(`Uncaught Promise Rejection:\n${error}`));
    });

    client.setInterval(() => {
        for(let i in client.mutes) {
            let time = client.mutes[i].time;
            let guildId = client.mutes[i].guild;
            let guild = client.guilds.get(guildId);
            let member = guild.members.get(i);
            let mutedRole = guild.roles.find(r => r.name === 'Swag Muted');

            if (!mutedRole) {
                continue;
            }

            if (Date.now() > time) {
                console.log(`${i} is now able to be unmuted!`);

                member.removeRole(mutedRole);
                delete client.mutes[i];

                fs.writeFile('./mute.json', JSON.stringify(client.mutes), err => {
                    if (err) {
                        throw err;
                    }
                    console.log(`I have unmuted ${member.user.tag}.`);
                });
            }
        }
    }, 5000);

    console.log('Ready!');
});

client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.find(ch => ch.name === 'member-log');
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./Cosmo.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

    // Add an exclamation point here and below
    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const { body: buffer } = await snekfetch.get(member.user.displayAvatarURL);
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'Duanism.png');

    channel.send(`Welcome to the server, ${member}!`, attachment);
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
    // retrieve the current user xp
    if (message.toString()[0] != `${config.prefix}`) {
        con.query(`SELECT * FROM xp WHERE id = ${message.author.id}`, (err, rows) => {
            if (err) {
                throw err;
            }

            let sql;
            let newXP;
            let level;

            if(rows.length < 1) {
                sql = `INSERT INTO xp (id, xp) VALUES ('${message.author.id}', ${generateXp()})`;
            }
            else {
                let xp = rows[0].xp;
                newXP = xp + generateXp();
                level = Math.floor(newXP / config.levelXP);
                sql = `UPDATE xp SET xp = ${newXP} WHERE id = '${message.author.id}'`;
            }

            con.query(sql);

            if (message.guild) {
                let VIProle = message.guild.roles.find(role => role.name === 'VIP');

                if (VIProle) {
                    let user = message.member;

                    if (newXP >= config.VIP * config.levelXP && !user.roles.has(VIProle.id)) {

                        user.addRole(VIProle);

                        let VIPembed = new Discord.RichEmbed()
                            .setTitle('**Congratulations**, you are offically a **VIP**!!!')
                            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL}`)
                            .setDescription('VIP are granted extra permission to manage some parts of the server.')
                            .setThumbnail(`${message.author.displayAvatarURL}`)
                            .addField('XP', newXP, true)
                            .addField('Level', level, true)
                            .addField('New Role', 'VIP', true)
                            .setTimestamp(new Date())
                            .setFooter('VIP Announcement');

                        message.channel.send(VIPembed);
                    }
                }
            }
        });
    }

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
            if (command.name === 'daily') {
                return message.reply('You have already collected your daily bonus.');
            }
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command. `);
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }
    try {
        command.execute(client, api, config, message, args, con);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute the command!');
    }
});

// login to Discord with your app's token
client.login(config.token);