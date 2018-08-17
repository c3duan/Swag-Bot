module.exports = {
    name: 'zodiac',
    description: 'gives a zodiac sign for the given month and date',
    usage: '[month] [date]',
    execute(client, api, config, message, args, con, guilds) {
        const month = parseInt(args[0]);
        const day = parseInt(args[1]);

        if (!month) {
            return message.reply(' please enter a valid number for month.');
        }

        if (month < 1 || month > 12) {
            return message.reply(' please enter a valid month [1, 12].');
        }

        if (!day) {
            return message.reply(' please enter a valid number for day.');
        }

        if (month === 1) {
			if (day >= 1 && day <= 19) return message.reply(', your zodiac is Capricorn');
			if (day >= 20 && day <= 31) return message.reply(', your zodiac is Aquarius');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 2) {
			if (day >= 1 && day <= 18) return message.reply(', your zodiac is Aquarius');
			if (day >= 19 && day <= 29) return message.reply(', your zodiac is Pisces');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 3) {
			if (day >= 1 && day <= 20) return message.reply(', your zodiac is Pisces');
			if (day >= 21 && day <= 31) message.reply(', your zodiac is Aries');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 4) {
			if (day >= 1 && day <= 19) message.reply(', your zodiac is Aries');
			if (day >= 20 && day <= 31) message.reply(', your zodiac is Taurus');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 5) {
			if (day >= 1 && day <= 20) message.reply(', your zodiac is Taurus');
			if (day >= 21 && day <= 31) message.reply(', your zodiac is Gemini');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 6) {
			if (day >= 1 && day <= 20) message.reply(', your zodiac is Gemini');
			if (day >= 21 && day <= 31) message.reply(', your zodiac is Cancer');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 7) {
			if (day >= 1 && day <= 22) message.reply(', your zodiac is Cancer');
			if (day >= 23 && day <= 31) message.reply(', your zodiac is Leo');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 8) {
			if (day >= 1 && day <= 22) message.reply(', your zodiac is Leo');
			if (day >= 23 && day <= 31) message.reply(', your zodiac is Virgo');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 9) {
			if (day >= 1 && day <= 22) message.reply(', your zodiac is Virgo');
			if (day >= 23 && day <= 31) message.reply(', your zodiac is Libra');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 10) {
			if (day >= 1 && day <= 22) message.reply(', your zodiac is Libra');
			if (day >= 23 && day <= 31) message.reply(', your zodiac is Scorpio');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 11) {
			if (day >= 1 && day <= 21) message.reply(', your zodiac is Scorpio');
			if (day >= 22 && day <= 31) message.reply(', your zodiac is Sagittarius');
			return message.reply(' please enter a valid date.');;
        } 
        else if (month === 12) {
			if (day >= 1 && day <= 21) message.reply(', your zodiac is Sagittarius');
			if (day >= 22 && day <= 31) message.reply(', your zodiac is Capricorn');
			return message.reply(' please enter a valid date.');;
        } 
        else {
			return message.reply(' please enter a valid date.');;
		}


    },
};