const request = require('superagent');

module.exports = {
    name: 'dog-facts',
    description: 'generates a random fun fact about dogs',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        request.get('https://dog-api.kinduff.com/api/facts').end((err, res) => {
            if (!err && res.status === 200) {
                message.channel.send(res.body.facts[0])
            } else {
                console.log(`REST call failed: ${err}`)
            }
        });
    }
}