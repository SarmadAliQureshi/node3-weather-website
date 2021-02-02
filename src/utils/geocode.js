const request = require('request')

const geocode = function(address,callback){
    mapboxurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2FybWFkYWxpcXVyZXNoaSIsImEiOiJjank5bjl0OXgwNXZiM2xxam1kbmY2b2w0In0.xEGEyUv86UjmeFrrJ7D8SA`
    console.log(mapboxurl)
    request({url:mapboxurl,json:true},function(error,{body}){
        if(error){
            console.log(error)
            callback('Unable to connect to internet')
        }
        else if (body.features.length===0){
            // console.log(response.body.message)
            callback('Unable to find location')
        }
        else{
            const lat = body.features[0].center[0]
            const lng = body.features[0].center[1]
            callback(undefined,{"lat":lat,"lng":lng})
            console.log(lat , lng);
    
        // for(var i = 0; i<response.body.features.length;i++){
        //     console.log(response.body.features[i].place_address)
        // }
    }
    })
}

// geocode("Ufone Tower", function(data){
//     console.log('Lat and Lng of Ufone Tower is ', data.lat , data.lng);
// })

module.exports = geocode
