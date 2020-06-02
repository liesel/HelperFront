class HomeService { 

    constructor(){
        this._http = new HttpService();
    }

    getMyNextSchedules(){
        return new Promise((resolve, reject) => {
            this._http.get("/getMyNextSchedules")
            .then( data =>{
                resolve(data);
            })
            .catch( data =>{
                reject(data);
            })
        });
    }
    getAllServices(){
        return new Promise((resolve, reject) => {
            this._http.get("/getAllServices")
            .then( data =>{
                resolve(data);
            })
            .catch( data =>{
                reject(data);
            })
        });
    }

    getAllSchedules(){
        return new Promise((resolve, reject) => {
            this._http.get("/getAllSchedules")
            .then( data =>{
                resolve(data);
            })
            .catch( data =>{
                reject(data);
            })
        });
    }

    cancelService(service){
        return new Promise((resolve, reject) => {
            this._http.delete("/cancelService", service)
            .then( data =>{
                resolve(data);
            })
            .catch( data =>{
                reject(data.responseText);
            })
        });
    }

    registerAppointment(schedule){
        return new Promise((resolve, reject) => {
            this._http.post("/registerAppointment", schedule)
            .then( data =>{
                resolve(data);
            })
            .catch( data =>{
                reject(data.responseText);
            })
        });
    }

}