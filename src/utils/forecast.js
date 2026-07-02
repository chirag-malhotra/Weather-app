import request from 'postman-request';

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_KEY}&query=${latitude},${longitude}&units=f`;
    request({url, json: true},(error, {body}) => {
        if(error){
            callback('Unable to connect', undefined);
        }
        else if(body.error){
           callback('Unable to find location', undefined); 
        }else{
            const temperature = body.current.temperature;
            const precip = body.current.precip;
            const weatherDescription = body.current.weather_descriptions[0];
            callback(undefined, `${weatherDescription} - current temperature is ${temperature} and rain chances are ${precip}`)
        }
        
    })
}

export default forecast;