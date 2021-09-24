const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()


//Define path for express config
const publicDirectoryPath = path.join(__dirname,'./public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather',
        name:'Akhilesh Bhardwaj'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        helpText:'Page is in under construction',
        title:'About Us',
        name:'Akhilesh Bhardwaj'
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        helpText:'Page is in under construction',
        title:'Help',
        name:'Akhilesh Bhardwaj'
    })
})


app.get('/weather', (req,res) =>{
    if (!req.query.address){
        return res.send({
            error:'Kindly provide the address'
        })       

    }

    geocode(req.query.address,(error, {latitude,longitude,location}={}) =>{

        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })

    })



    
})

app.get('/products',(req,res) =>{

    if(!req.query.search){

        return res.send({
            error:'You Must provide search term'
        })
        
    }

    console.log(req.query.search);
    res.send({
        products:[]
    })
} )

app.get('/help/*' , (req,res)=>{
   
    res.render('404',{
        title:'404',
        name:'Akhilesh Bhardwaj',
        errorMessage:'Help Artical Not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'AKhilesh Bhardwaj',
        errorMessage:'Page Not Found'

    
    })
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000');
})