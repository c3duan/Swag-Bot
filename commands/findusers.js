module.exports = {
    name: 'findusers',
    description: 'Return all the usernames that contains the specified letters',
    usage: 'findusers <name>',
    execute(client, message, args) {
        const users = client.users;

        const searchTerm = args[0];
        if (!searchTerm) {
            return message.channel.send('Please provide a search term.');
        }

        const matches = users.filter(u =>u.tag.toLowerCase().includes(searchTerm.toLowerCase()));
        if (!matches) {
            return message.channel.send('No username matches');
        }
        else {
            return message.channel.send(matches.map(u => u.tag).join(', '));
        }
    },
};