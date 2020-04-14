$(() => {
    // Initialize Material Design Components
    window.initializeComponents()
    fetchSchedules()
    // fetchServices()
    fetchNextSchedules()
})

async function fetchSchedules(){
    const container = $($('feed-container')[0].shadow);
    const fragment = $(document.createDocumentFragment())

    for(let i = 0; i < 5; i++){
        const el = document.createElement('helper-schedule')
        el.schedule = {};
        fragment.append(el)
    } 
    
    container.append(fragment)
}

async function fetchNextSchedules(){
    const container = $('#side-feed');
    
    [{}, {}].forEach(schedule => {
        const el = document.createElement('helper-schedule-next')
        el.schedule = schedule;
        container.append(el);
    });
}

async function fetchServices() {
    const container = $($('feed-container')[0].shadow);
    const fragment = $(document.createDocumentFragment())

    for(let i = 0; i < 5; i++) {
        const el = document.createElement('helper-service')
        el.service = {};
        fragment.append(el)
    } 
    
    container.append(fragment)
}