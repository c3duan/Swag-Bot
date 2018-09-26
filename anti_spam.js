let authors = [];
let warned = [];
let banned = [];
let messagelog = [];

/**
 * Add simple spam protection to your discord server.
 * @param  {Bot} bot - The discord.js CLient/bot
 * @param  {object} options - Optional (Custom configuarion options)
 * @return {[type]}         [description]
 */
module.exports = function(bot, options, Money, con) {
    // Set options
    const warnBuffer = (options && options.prefix) || 3;
    const maxBuffer = (options && options.prefix) || 5;
    const interval = (options && options.interval) || 1000;
    const warningMessage = (options && options.warningMessage) || 'stop spamming or I\'ll whack your head off.';
    const banMessage = (options && options.banMessage) || 'has been banned for spamming, anyone else?';
    const maxDuplicatesWarning = (options && options.duplicates || 7);
    const maxDuplicatesBan = (options && options.duplicates || 10);
    const deleteMessagesAfterBanForPastDays = (options && options.deleteMessagesAfterBanForPastDays || 7);

    bot.on('message', msg => {
        // Always return with an bot.....
        if(msg.author.bot) return;

        if(msg.toString().charAt(0) === '!') return;

        if(msg.author.id != bot.user.id) {
            const now = Math.floor(Date.now());
            authors.push({
                'time': now,
                'author': msg.author.id,
            });
            messagelog.push({
                'message': msg.content,
                'author': msg.author.id,
            });

            // Check how many times the same message has been sent.
            let msgMatch = 0;
            for (let i = 0; i < messagelog.length; i++) {
                if (messagelog[i].message == msg.content && (messagelog[i].author == msg.author.id) && (msg.author.id !== bot.user.id)) {
                    msgMatch++;
                }
            }
        
            // Check matched count
            if (msgMatch == maxDuplicatesWarning && !warned.includes(msg.author.id)) {
                warn(msg, msg.author.id);

                const xpToMinus = Math.ceil(Math.random() * (3000 - 1000 + 1));
                con.query(`SELECT * FROM xp WHERE id = ${msg.author.id}`, (err, rows) => {
                    if (err) {
                        throw err;
                    }
        
                    let sql;
                    let newXP;
        
                    if(rows.length < 1) {
                        sql = `INSERT INTO xp (id, xp) VALUES ('${msg.author.id}', 0)`;
                    }
                    else {
                        const xp = rows[0].xp;
                        newXP = xp - xpToMinus;
                        if (newXP < 1) {
                            sql = `UPDATE xp SET xp = 0 WHERE id = '${msg.author.id}'`;
                        }
                        else {
                            sql = `UPDATE xp SET xp = ${newXP} WHERE id = '${msg.author.id}'`;
                        }   
                    }
        
                    con.query(sql);
                });

                const coinsToMinus = Math.ceil(Math.random() * (1000 - 500 + 1));
                Money.findOne({
                    userID: msg.author.id,
                    serverID: msg.guild.id,
                }, (err, money) => {
                    if (err) console.error(err);
                    if (!money) {
                        const newMoney = new Money({
                            userID: msg.author.id,
                            serverID: msg.guild.id,
                            money: 0,
                        });
        
                        newMoney.save().catch(err => console.error(err));
                    }
                    else {
                        const result = money.money - coinsToMinus;
                        if (result < 1) {
                            money.money = 0;
                        }
                        else {
                            money.money = money.money - coinsToMinus;
                        }
                        money.save().catche(err => console.error(err));
                    }
                });
            }

            if (msgMatch == maxDuplicatesBan && !banned.includes(msg.author.id)) {
                ban(msg, msg.author.id);
            }

            let matched = 0;

            for (let i = 0; i < authors.length; i++) {
                if (authors[i].time > now - interval) {
                    matched++;
                    if (matched == warnBuffer && !warned.includes(msg.author.id)) {
                        warn(msg, msg.author.id);
                    }
                    else if (matched == maxBuffer) {
                        if (!banned.includes(msg.author.id)) {
                            ban(msg, msg.author.id);
                        }
                    }
                }
                else if (authors[i].time < now - interval) {
                    authors.splice(i);
                    warned.splice(warned.indexOf(authors[i]));
                    banned.splice(warned.indexOf(authors[i]));
                }
                if (messagelog.length >= 200) {
                    messagelog.shift();
                }
            }
        }
    });

    /**
     * Warn a user and give penalty
     * @param  {Object} msg
     * @param  {string} userid userid
     */
    function warn(msg, userid) {
        warned.push(msg.author.id);
        msg.channel.send(msg.author + ' ' + warningMessage);
    }

    /**
     * Ban a user by the user id
     * @param  {Object} msg
     * @param  {string} userid userid
     * @return {boolean} True or False
     */
    function ban(msg, userid) {
        for (let i = 0; i < messagelog.length; i++) {
            if (messagelog[i].author == msg.author.id) {
                messagelog.splice(i);
            }
        }

        banned.push(msg.author.id);

        const banCommand = require('./commands/ban.js');

        const user = msg.channel.guild.members.find(member => member.user.id === msg.author.id);
        if (user) {
            const args = [`${user}`, `${deleteMessagesAfterBanForPastDays}`, 'spamming the channel'];
            
            if (banCommand.execute(null, null, null, null, msg, args, null, null) === 'finished') {
                msg.channel.send(msg.author + ' ' + banMessage);
            }
            
            /*
            user.ban(deleteMessagesAfterBanForPastDays).then((member) => {
                msg.channel.send(msg.author + ' ' + banMessage);
                return true;
            }).catch(() => {
                msg.channel.send('insufficient permission to kick ' + msg.author + ' for spamming.');
                return false;
            });*/
        }
    }
};