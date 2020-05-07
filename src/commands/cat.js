const snekfetch = require('snekfetch');

module.exports = {
    name: 'cat',
    description: 'gives a random cat picture',
    async execute(client, kayn, REGIONS, config, message, args, con, guilds) {
        let msg = await message.channel.send('Generating...');
        console.log(config.cat_api);

        let file = (await snekfetch.get(config.cat_api)).body.file;

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