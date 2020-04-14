$(() => {
    // Initialize Material Design Components
    window.initializeComponents()
    console.log(window.endpoints)
    fetchSchedules()
    fetchNextSchedules()
})

async function fetchSchedules(){

    // var scheduleUrl = window.endpoints.schedules;

    // const res = await fetch(scheduleUrl);
    // const json = await res.json();
    const container = $('#feed');
    
    [{}, {}, {}, {}].forEach(schedule => {
        const el = document.createElement('helper-schedule')
        el.schedule = schedule;
        container.append(el)
    });
    
}

async function fetchNextSchedules(){
    const container = $('#side-feed');
    
    [{}, {}].forEach(schedule => {
        const el = document.createElement('helper-schedule-next')
        el.schedule = schedule;
        container.append(el)
    });
}