module.exports = {
    name: 'coinflip',
    description: 'Flip a coin, tell if it is heads or tails',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        let random = (Math.floor(Math.random() * Math.floor(2)));

        if(random === 0) {
          message.channel.send('I flipped heads!');
        }
        else {
          message.channel.send('I flipped tails!');
        }
    },
};