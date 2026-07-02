import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import hbs from 'hbs';
import dotenv from 'dotenv';

import express from 'express';

import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

const app = express();
dotenv.config();


//define paths for express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicFolderPath = join(__dirname,'../public');
const viewsPath = join(__dirname,'../templates/views');
const partialsPath = join(__dirname, '../templates/partials');


//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicFolderPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chirag Malhotra'
    })
})

app.get('/help', (req, res) =>{
    res.render('help',{
        title: 'Help Page',
        helpMessage: 'This is a help message',
        name: 'Chirag Malhotra'
    })
});

app.get('/about', (req, res) =>{
    res.render('about',{
        title: 'About Page',
        name: 'Chirag Malhotra'
    })
});

app.get('/weather', (req, res) =>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: [],
    })
})

app.get('/help/*splat', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Chirag Malhotra',
        errorMessage: 'Help Article not found'
    })
})

app.get('{*splat}', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Chirag Malhotra',
        errorMessage: 'Page Not Found!!'
    });
})

app.listen(3000, () => {
    console.log('Server is started!!')
});