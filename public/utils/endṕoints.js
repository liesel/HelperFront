const baseUrl = 'http://localhost:8080'

const schedules = baseUrl + '/schedules',
    signup    = baseUrl + '/signup'

const endpoints = {
    schedules: schedules,
    signup: signup
}

window.endpoints = endpoints;