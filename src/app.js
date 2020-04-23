const path          = require('path')
const express       = require('express')
const hbs           = require('hbs')
const bodyParser    = require('body-parser')
const axios         = require('axios').default;
const session       = require("express-session")
const app           = express()
const moment = require('moment');
const TWO_HOURS     = 1000 * 60 * 60 *2
var categories      = []; 

const  {
    PORT            = 8080,
    NODE_ENV        = 'development',
    SESS_LIFETIME   = TWO_HOURS,
    SESS_NAME       = 'sid',
    SESS_SECRET     = 'IT`S A SECRET!!__\o/',
    BACK_END_URL    = 'http://localhost.charlesproxy.com:3000'
} = process.env




const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        res.redirect('/');
    }else{
        next();
    }
}

const userIsAuthenticated = (req, res, next) => {
    if (!req.session.userId) {
        res.status(401).send({error: "not Authenticated"});
    }else{
        next();
    }
}

const redirectHome = (req, res, next) => {
    if (req.session.userId) {
        res.redirect('/home');
    }else{
        next();
    }
}

const IN_PROD = NODE_ENV === 'production'


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

app.use(session({
    nanme:                  SESS_NAME,
    resave:                 false,
    saveUninitialized:      false,
    secret: SESS_SECRET,
    cookie:{
        maxAge:             SESS_LIFETIME,
        sameSite:           true,
        secure:             IN_PROD
    }
}))

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

app.get('/',redirectHome, (req, res) => {
    res.render('index')
})

app.post("/doSaveService", userIsAuthenticated, (req, res) => {
    console.log(req.body);
    var categories = []
    for (let index = 0; index < req.body.categories.length; index++) {
        categories.push({
            category: req.body.categories[index]._id
        });
    }
    axios.post(`${BACK_END_URL}/v1/schedule/Save`, 
    {
        serviceName: 	    req.body.serviceName,
        whereby: 			req.body.whereBy,
        picpay: 			req.body.picpay,
        ScheduleType: 		1,
        ScheduleDate: 		moment(`${req.body.serviceDate} ${req.body.startTime}`, "DD/MM/YYYY HH:mm").toDate(),
        ScheduleDateEnd: 	moment(`${req.body.serviceDate} ${req.body.endTime}`, "DD/MM/YYYY HH:mm").toDate(),
        description:        req.body.description,
        categories: 		categories,
        CreatorId: 			req.session.userId
    },
    {
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        }
    })
    .then(function (response) {
        console.log(response);
        res.send({status:"ok"});
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send(error.response.data);
    })
})

app.post("/getAllCategories", (req, res) => {
    axios.get(`${BACK_END_URL}/v1/category/findAllActive`, {
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        }, body: {}})
    .then(function (response) {
        res.send(response.data.categories)
    })
    .catch(function (error) {
        console.log(error);
        res.send({})
    })
})

app.get('/home',redirectLogin, (req, res) => {
    res.render('home', {})
})

app.post('/doLogin', redirectHome, (req, res) => {
    axios.post(`${BACK_END_URL}/v1/user/login`, {
        email:        req.body.email,
        password:     req.body.password
    })
    .then(function (response) {
        console.log(response);
        req.session.token           = response.data.token
        req.session.userId          = response.data.user._id
        req.session.email           = response.data.user.email
        req.session.userFullname    = response.data.user.name+" "+response.data.user.surname
        req.session.username        = response.data.user.name
        res.locals.session          = req.session;
        res.send({status:"ok"});
    })
    .catch(function (error) {
        console.log(error);
        res.status(401).send('Não autorizado');
    })
})

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT} `)
})