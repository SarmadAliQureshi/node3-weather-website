const request = require('request')
const weatherrequest = function(lat,lng, callback){
    url = `http://api.weatherstack.com/current?access_key=57bba881a8c5aa4fa0c0087b456e4381&query=${encodeURIComponent(lat)},${encodeURIComponent(lng)}`
    console.log(url)

request({url:url,json:true}, function(error,response){
    if (error){
        console.log('1 ',error)
    }
    else if(response.body.error){
        console.log('in elif')
        console.log(response.body.error)
        callback({error:'Unable to find location'},undefined)
    }
    else{
        console.log('in else')
    // const data = JSON.parse(response.body)
    // console.log(`it is currently`, response.body.location)
    console.log(`it is currently`, response.body.current.temperature)
    callback(undefined,{"temp":response.body.current.temperature,"place":response.body.location.name})
    }
    // console.log(response)
})
}

module.exports = weatherrequest