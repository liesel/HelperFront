const path          = require('path')
const express       = require('express')
const hbs           = require('hbs')
const bodyParser    = require('body-parser')
const axios         = require('axios').default;
const session       = require("express-session")
const MongoStore    = require('connect-mongo')(session);
const app           = express()
app.set('trust proxy', 1); //TODO check this understand why heroku only work session with that
const moment        = require('moment');
const TWO_HOURS     = 1000 * 60 * 60 *2
var categories      = []; 

const  {
    PORT            = 8080,
    NODE_ENV        = 'development',
    SESS_LIFETIME   = TWO_HOURS,
    SESS_NAME       = 'sid',
    SESS_SECRET     = 'IT`S A SECRET!!__\o/',
    BACK_END_URL    = 'http://localhost.charlesproxy.com:3000',
    MONGO_URI       = 'mongodb://localhost:27017/helper-session'
} = process.env

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
        console.log("redireciono");        
        res.redirect('/');
    }else{
        console.log("deixou passar");
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
console.log('TÁ EM PROD!!!!!!!!!!! '+IN_PROD);

app.use(session({
    nanme:                  SESS_NAME,
    resave:                 false,
    saveUninitialized:      true,
    store:                  new MongoStore({ url: MONGO_URI }),
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

app.post("/saveUser", (req, res) => {
    
    var email = req.session.email || req.body.email;

    axios.post(`${BACK_END_URL}/v1/user/createUser`, 
    {
        email:     	        email,
        name:      	        req.body.name,
        surname:   	        req.body.surname,
        password:  	        req.body.password,
        avatar:             'avatar-1'
    },
    {
        headers: {
            'accept': 'application/json'
        }
    }
   )
    .then(function (response) {
        console.log(response.data);
        if(response.data.status == "already"){
            res.send({status:"Usuário já cadastrado"});
            return;
        }

        req.session.token                   = response.data.token
        req.session.userId                  = response.data.user._id
        req.session.email                   = response.data.user.email
        req.session.userFullname            = response.data.user.name+" "+response.data.user.surname
        req.session.username                = response.data.user.name
        req.session.avatar                  = response.data.user.avatar
        req.session.userSurname             = response.data.user.surname
        req.session.userSpecialization      = response.data.user.specialization
        req.session.userServiceDescription  = response.data.user.serviceDescription
        res.locals.session                  = req.session;

        res.send({status:"ok"});
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send(error.response.data);
    })
})

app.post("/recoverPassword", (req, res) => {
    let email = req.body.email;
    if (email != undefined && email != "" ) {
        axios.post(`${BACK_END_URL}/v1/user/recoverPassword`, 
    {
        email: email
    },
    {
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        }
    })
    .then(function (response) {
        res.send(response.data);
    })
    .catch(function (error) {
        res.status(500).send(error);
    })
    }else{
        res.send({status: "Informe seu e-mail"});
    }
    
})

app.post("/doLogout", userIsAuthenticated, (req, res) => {
    axios.post(`${BACK_END_URL}/v1/user/logOut`, 
    {},
    {
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        }
    })
    .then(function (response) {
        req.session.destroy(function(err) {
            res.send({status:"ok"});
        });
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send(error.response.data);
    })
})


app.get("/getMyEvents", userIsAuthenticated, (req, res) => {
    
    axios.get(`${BACK_END_URL}/v1/schedule/countSchedulesReciviedAndGiven`, 
    {
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        }, body: {}})
    .then(function (response) {
        // console.log(response.data.schedules);
        res.send(response.data.schedules);
    })
    .catch(function (error) {
        if (error.response.status == 401) {
            req.session.destroy(function(err) {
                res.status(error.response.status).send({status: error.response.data})
            });    
        }else{
            res.status(error.response.status).send({status: error.response.data})
        }
    })
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
        if (error.response.status == 401) {
            req.session.destroy(function(err) {
                res.status(error.response.status).send({status: error.response.data})
            });    
        }else{
            res.status(error.response.status).send({status: error.response.data})
        }
    })
})

app.get("/getSchedulesByName", userIsAuthenticated, (req, res) => {
    console.log(req.query.name)
    axios.get(`${BACK_END_URL}/v1/schedule/SchedulesForName`,
    {
        params: {
            name: req.query.name
        },
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        },
    })
    .then(function (response) {
        res.send(response.data.schedules);
    })
    .catch(function (error) {
        if (error.response.status == 401) {
            req.session.destroy(function(err) {
                res.status(error.response.status).send({status: error.response.data})
            });    
        }else{
            res.status(error.response.status).send({status: error.response.data})
        }
    })
})

app.get("/getSchedulesByDateStart", userIsAuthenticated, (req, res) => {
    axios.get(`${BACK_END_URL}/v1/schedule/SchedulesForDateStart`,
    {
        params: {
            date: req.query.date
        },
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        },
    })
    .then(function (response) {
        res.send(response.data.schedules);
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send(error.response.data);
    })
})

app.get("/getServicesCount", userIsAuthenticated, (req, res) => {
    axios.get(`${BACK_END_URL}/v1/schedule/SchedulesCountForCreatorID`,
    {
        params: {
            id: req.session.userId
        },
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        },
    })
    .then(function (response) {
        res.send({count: response.data.count});
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send(error.response.data);
    })
})

app.get("/getAllServices", userIsAuthenticated, (req, res) => {
    axios.get(`${BACK_END_URL}/v1/schedule/SchedulesForCreatorID`,
    {
        params: {
            id: req.session.userId
        },
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        },
    })
    .then(function (response) {
        res.send({schedules: response.data.schedules});
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send(error.response.data);
    })
})

app.get("/getMySchedulesCount", userIsAuthenticated, (req, res) => {
    axios.get(`${BACK_END_URL}/v1/schedule/SchedulesCountForClientID`,
    {
        params: {
            id: req.session.userId
        },
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        },
    })
    .then(function (response) {
        res.send({count: response.data.count});
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send(error.response.data);
    })
})

app.get("/getAllMySchedules", userIsAuthenticated, (req, res) => {
    axios.get(`${BACK_END_URL}/v1/schedule/SchedulesForClientID`,
    {
        params: {
            id: req.session.userId
        },
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        },
    })
    .then(function (response) {
        res.send({schedules: response.data.schedules});
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send(error.response.data);
    })
})

app.get("/getAllSchedules", userIsAuthenticated, (req, res) => {
    axios.get(`${BACK_END_URL}/v1/schedule/SchedulesForHome`,
    {
        params: {
            id: req.session.userId
        },
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        },
    })
    .then(function (response) {
        res.send({schedules: response.data.schedules});
    })
    .catch(function (error) {
        console.log(error);
        res.status(500).send(error.response.data);
    })
})

app.get('/home',redirectLogin, (req, res) => {
    res.render('home', {})
})

app.post('/userEdit', userIsAuthenticated, (req, res) => {
    var name                = req.body.name;
    var surname             = req.body.surname;
    var specialization      = req.body.specialization;
    var serviceDescription  = req.body.serviceDescription;
    axios.patch(`${BACK_END_URL}/v1/user/EditMyUser`, 
    {
        name:     	        name,
        surname:            surname,
        specialization:   	specialization,
        serviceDescription: serviceDescription,
    },
    {
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        }
    }
   )
    .then(function (response) {
        req.session.userFullname            = response.data.name+" "+response.data.surname
        req.session.userSurname             = response.data.surname
        req.session.username                = response.data.name
        req.session.email                   = response.data.email
        res.send({status:"ok"});
    })
    .catch(function (error) {
        console.log(error);
        res.send(error);
    })
})

app.post('/userEditAvatar', userIsAuthenticated, (req, res) => {
    var avatar                = req.body.avatar;
    axios.patch(`${BACK_END_URL}/v1/user/EditMyUser`, 
    {
        avatar:             avatar
    },
    {
        headers: {
            'accept': 'application/json',
            'HelperAutorization': `Bearer ${req.session.token}`
        }
    }
   )
    .then(function (response) {
        req.session.avatar                  = response.data.avatar
        res.send({status:"ok"});
    })
    .catch(function (error) {
        console.log(error);
        res.send(error);
    })
})

app.post('/doLogin', redirectHome, (req, res) => {
    axios.post(`${BACK_END_URL}/v1/user/login`, {
        email:        req.body.email,
        password:     req.body.password
    })
    .then(function (response) {
        req.session.token                   = response.data.token
        req.session.userId                  = response.data.user._id
        req.session.email                   = response.data.user.email
        req.session.userFullname            = response.data.user.name+" "+response.data.user.surname
        req.session.userSurname             = response.data.user.surname
        req.session.avatar                  = response.data.user.avatar
        req.session.username                = response.data.user.name
        req.session.userSpecialization      = response.data.user.specialization
        req.session.userServiceDescription  = response.data.user.serviceDescription
        res.locals.session                  = req.session;
        res.send({status:"ok"});
    })
    .catch(function (error) {
        console.log(error);
        res.status(401).send('Não autorizado');
    })
})

app.post('/doGoogleLogin', redirectHome, (req, res) => {
    axios.post(`${BACK_END_URL}/v1/user/login-google`, {
        email:        req.body.email,
    })
    .then(function (response) {
        console.log(response.data)

        if(response.data.status != 401){
            req.session.token                   = response.data.token
            req.session.userId                  = response.data.user._id
            req.session.email                   = response.data.user.email
            req.session.userFullname            = response.data.user.name+" "+response.data.user.surname
            req.session.userSurname             = response.data.user.surname
            req.session.avatar                  = response.data.user.avatar
            req.session.username                = response.data.user.name
            req.session.userSpecialization      = response.data.user.specialization
            req.session.userServiceDescription  = response.data.user.serviceDescription
            res.locals.session                  = req.session;
            res.send({status:"ok"});
        } else {
            req.session.email                   = req.body.email;
            res.locals.session                  = req.session;
            res.send({status:"google-unauthorized"})
        }

    })
    .catch(function (error) {
        console.log(error);
        res.status(401).send('Não autorizado');
    })
})


app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT} `)
})