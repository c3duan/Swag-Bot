const request = require('superagent');

module.exports = {
    name: 'joke',
    desciprtion: 'tells a joke about someone',
    usage: '[Name of the person you want to make fun of]',
    execute(client, kayn, REGIONS, config, message, args, con, guilds) { 
        let firstName = args[0];
        let lastName = args[1];

        if (!firstName) firstName = 'Logan';
        if (!lastName) lastName = 'Suarez';

        request.get('http://api.icndb.com/jokes/random')
            .query({escape: 'javascript'})
            .query({firstName: firstName})
            .query({lastName: lastName})
            .end((err, res) => {
                if (!err && res.status === 200) {
                    message.channel.send(res.body.value.joke)
                } else {
                    console.error(`REST call failed: ${err}`)
                }
            });
    }

}