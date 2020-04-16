const path          = require('path')
const express       = require('express')
const hbs           = require('hbs')
const bodyParser    = require('body-parser')
const axios         = require('axios').default;
const app           = express()
const port          = 8080;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname, '../templates/views')
// const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
// app.set('views', viewsPath)
// hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
app.use( bodyParser.json() );

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/home', (req, res) => {
    res.render('home', {})
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})