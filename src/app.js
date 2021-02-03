const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast =  require('./utils/weatherrequest')
const app = express()

const public_dir_path = path.join(__dirname,'../public')
console.log( path.join(__dirname, '../views'))

const views_path = path.join(__dirname, '../templates/views')
const partials_path = path.join(__dirname, '../templates/partials')
console.log('PP',partials_path)
// Setup handelbars engine and views location 
app.set('views', views_path)
app.set('view engine','.hbs')
hbs.registerPartials(partials_path)

// Static directory to serve !!!
app.use(express.static(public_dir_path))

app.get('',function(req,resp){
    resp.render('index',{title:'Weather',
    port:'3000',creator:'Sarmad'
})
})

app.get('/about',function(req,resp){
    resp.render('about',{creator:'Sarmad',title:'About'})
})

app.get('/help',function(req,resp){
    resp.render('help',{number:'1234',title:'Help',creator:'Sarmad'})
})

app.get('/weather',function(req,resp){
   if(!req.query.address){
       return resp.send({
           error:"Address must be provided"
       })
   }
   geocode(req.query.address,function(error,{lng,lat}={}){
    //    console.log(loc.lat)
       forecast(lng,lat,function(error,forecast){
           if(error){
               return resp.send(error)
           }
           console.log(forecast)
           resp.send({
            forecast:"Its i currently "+forecast.temp +" Dgrees",
            address:req.query.address,
            location:forecast.place
        })
       })
   })
   
})
app.get('/products',function(req,resp){
    if(!req.query.search){
        return resp.send({
            error:"You must provide search item"
        })
    }
    console.log(req.query);
    resp.send({
        products:[]
    })
})

app.get('/help/*', function(req,resp){
    resp.render('404',{error:'Article not found',creator:'Sarmad'})
})

app.get('*', function(req,resp){
    resp.render('404',{error:"Error 404",title:'404 Page'})
})

app.listen(3000,function(){
    console.log('Server is up on port 3000')
})

console.log('dasda')
