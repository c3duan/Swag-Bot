const bonus = 250;
const boosterThreshold = 10;
const Discord = require('discord.js');

module.exports = {
    name: 'daily',
    description: 'gives daily extra xp to user',
    cooldown: 86400,
    execute(client, api, config, message, args, con) {
        let id = message.author.id;

        con.query(`SELECT * FROM xp WHERE id = '${id}'`, (err, rows) => {
            if (err) {
                throw err;
            }

            let sql;
            let newXP;
            let level;
            let booster;
            let actBonus;

            if(rows.length < 1) {
                sql = `INSERT INTO xp (id, xp) VALUES ('${id}', bonus)`;
            }
            else {
                let xp = rows[0].xp;
                level = Math.floor(xp / config.levelXP);
                booster = level / boosterThreshold;
                actBonus = Math.floor(booster * bonus);
                newXP = xp + booster * bonus;
                sql = `UPDATE xp SET xp = ${newXP} WHERE id = '${id}'`;
            }

            con.query(sql);
            
            let dailyEmbed = new Discord.RichEmbed()
                .setTitle('**Daily Bonus**')
                .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL}`)
                .setThumbnail(`${message.author.displayAvatarURL}`)
                .addField('Bonus', bonus)
                .addField('Booster', booster)
                .addField('Actual Bonus', actBonus)
                .setTimestamp(new Date())
                .setFooter('Once per day');

            message.channel.send(dailyEmbed);

            
            let VIProle = message.guild.roles.find(role => role.name === 'VIP');

            let user = message.guild.members.get(id);
            console.log(user);

            if (newXP >= config.VIP * config.levelXP && !user.roles.has(VIProle.id)) {
                console.log('In here');
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
        });
    },
};