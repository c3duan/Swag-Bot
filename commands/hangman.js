const request = require('node-superfetch');
const { stripIndents } = require('common-tags');
const urban = require('urban');

module.exports = {
    name: 'hangman',
    description: 'starts a random hangman game',
    playing: new Set(),
    async execute(client, api, config, message, args, con, guilds) {
        if (this.playing.has(message.channel.id)) return message.reply('Only one game may be occurring per channel.');
		this.playing.add(message.channel.id);
		try {
            urban.random().first(async json => {
                const word = json.word.toLowerCase().replace(/ /g, '-');
                let points = 0;
                let displayText = null;
                let guessed = false;
                const confirmation = [];
                const incorrect = [];
                const display = new Array(word.length).fill('_');
                while (word.length !== confirmation.length && points < 6) {
                    await message.channel.send(stripIndents`
                        ${displayText === null ? 'Here we go!' : displayText ? 'Good job!' : 'Nope!'}
                        \`${display.join(' ')}\`. Which letter do you choose?
                        Incorrect Tries: ${incorrect.join(', ') || 'None'}
                        \`\`\`
                        ___________
                        |     |
                        |     ${points > 0 ? 'O' : ''}
                        |    ${points > 2 ? '—' : ' '}${points > 1 ? '|' : ''}${points > 3 ? '—' : ''}
                        |    ${points > 4 ? '/' : ''} ${points > 5 ? '\\' : ''}
                        |
                        ===========
                        \`\`\`
                    `);
                    const filter = res => {
                        const choice = res.content.toLowerCase();
                        return res.author.id === message.author.id && !confirmation.includes(choice) && !incorrect.includes(choice);
                    };
                    const guess = await message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 30000
                    });
                    if (!guess.size) {
                        await message.reply('Sorry, time is up!');
                        break;
                    }
                    const choice = guess.first().content.toLowerCase();
                    if (choice === 'end') break;
                    if (choice.length > 1 && (choice === word || choice === body.word.toLowerCase())) {
                        guessed = true;
                        break;
                    } else if (word.includes(choice)) {
                        displayText = true;
                        for (let i = 0; i < word.length; i++) {
                            if (word[i] !== choice) continue; // eslint-disable-line max-depth
                            confirmation.push(word[i]);
                            display[i] = word[i];
                        }
                    } else {
                        displayText = false;
                        if (choice.length === 1) incorrect.push(choice);
                        points++;
                    }
                }
                this.playing.delete(message.channel.id);
                if (word.length === confirmation.length || guessed) return message.reply(`You won, it was ${word}!`);
                return message.reply(`Too bad... It was ${word}...`);
            });
        } catch (err) {
            this.playing.delete(message.channel.id);
            return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    },
};