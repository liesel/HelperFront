class DateUtils {


    constructor(){

    }

    static endOFDay(dat){
        dat.setHours(23)
        dat.setMinutes(59)
        dat.setSeconds(59)
        return dat
    }

    static beginningOfDay(date){
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        return date
    }

    static getDayOfWeek(dat){
        var semana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        return semana[dat.getDay()];
    }

    static getMonthName(dat){
        var months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Novembro', 'Dezembro']
        return months[dat.getMonth()];
    }



}