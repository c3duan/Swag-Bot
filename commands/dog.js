const snekfetch = require('snekfetch');

module.exports = {
    name: 'dog',
    description: 'gives a random dog picture',
    usage: 'dog',
    async execute(client, api, config, message, args) {
        let msg = await message.channel.send('Generating...');
        console.log(config.dog_api);

        let file = (await snekfetch.get(config.dog_api)).body.message;

        if (!file) {
            return message.channel.send('I am broken, please try again!');
        }

        await message.channel.send({ files: [
            {
                attachment: file,
                name: file.split('/').pop(),
            },
        ] });

        console.log(file);
        msg.delete();
    },
};