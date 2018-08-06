const agree = ':white_check_mark:';
const disagree = ':negative_squared_cross_mark:';

module.exports = {
    name: 'vote',
    description: 'start a poll, and count votes at the end',
    usage: 'vote <poll topic>',
    async execute(client, api, config, message, args) {
        let msg = await message.channel.send("Vote!");
        await msg.react(agree);
        await msg.react(disagree);

        const reactions = await msg.awaitReactions(reaction => reaction.emoji.name == agree || reaction.emoji.name == disagree, { time: 15000 });
        message.channel.send(`Voting complete! \n\n${agree}: ${reactions.get(agree).count - 1}\n${disagree}: ${reactions.get(disagree).count - 1}`);
    },
};