const request = require('superagent');

module.exports = {
    name: 'cat-facts',
    description: 'generates a random fun fact about cats',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        request.get('https://catfact.ninja/fact').end((err, res) => {
            if (!err && res.status === 200) {
                message.channel.send(res.body.fact)
            } 
            else {
                console.log(`REST call failed: ${err}`);
            }
        });
    },
};