module.exports = {
    name: 'weather',
    usage: '[location name]',
    description: 'Returns the weather for a location',
    execute(client, api, config, message, args, con, guilds) {
      try {
        const request = require('request');
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${args}&units=imperial&appid=${config.weather}`;

        // Performs a request to OpenWeatherMap to retrieve weather info
        request(url, (err, response, body) => {

          const weather = JSON.parse(body);

          if(weather.main == undefined) {
              message.reply('I am unable to fetch the weather');
          }
          else {
            const weatherText =
            { embed:
              {
                color: 3447003,
                title: `Weather for ${weather.name}`,
                fields: [

                    {
                    name: ':white_sun_rain_cloud:  Conditions',
                    value: ` ${weather.weather.description}`,
                    },

                    // The current temperature
                    {
                    name: ':thermometer: Temperature',
                    value: `${weather.main.temp} °F `,
                    },

                    // The current humidity
                    {
                    name: ':droplet: Humidity',
                    value: `${weather.main.humidity} % `,
                    },

                    // The current number of clouds
                    {
                    name: ':cloud: Clouds',
                    value: `${weather.clouds.all} %`,
                    },

                    // The current wind speed
                    {
                    name: ':dash: Wind Speed',
                    value: ` ${weather.wind.speed} mph`,
                    },
                ],
                timestamp: new Date(),
                footer: {
                  text: 'Current Forecast',
                },
              },
            };

              message.channel.send(weatherText);
          }
        });
      }

      // Error catching for any problems
      catch (error) {
        console.log(error);
        message.reply('I am unable to fetch the weather');
      }
    },
};