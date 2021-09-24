const request = require('request')



const forecast = (latitude,longitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=861bda2275d8dd93bfe116886a56824b&query='+ latitude + ',' + longitude +'&units=m'

    request({url, json:true},(error,{body})=>{
        if (error){
            callback('Unbale to connect Weather Services!!',undefined)
        } else if(body.error){
            callback('Unable to find Location!',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degree out. and its Feels Like ' + body.current.feelslike + ' degrees out and Humidity is ' + body.current.humidity + "%." )
        }
    })

}





module.exports = forecast