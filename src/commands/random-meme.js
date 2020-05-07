module.exports = {
    name: 'random-meme',
    description: 'Returns a random meme',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        try {
            const request = require('request');

            const options = {
                method: 'GET',
                url: 'https://api.imgflip.com/get_memes',
            };

            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const meme = JSON.parse(body);
                    const random = (Math.floor(Math.random() * Math.floor(100)));
                    message.channel.send(meme.data.memes[random].url);
                }
            });
        }
        catch(error) {
            console.log(error);
        }
    },
};