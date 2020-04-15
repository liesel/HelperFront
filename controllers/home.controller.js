$(() => {

    //HOME
    fetchSchedules()
    fetchNextSchedules()

    const itemStatus = $('div.row.side-status-item')
    itemStatus.on("click", (event) => {
        for (const item of itemStatus) {
            $(item).removeClass("clicked")
        }
        
        // clean container
        clear()

        var item = $(event.target);
        switch(item.attr("data-link")){
            case "home":
                fetchSchedules()
                break;
            case "servicos":
                fetchServices()
                break;
            case "agendamentos":
                fetchSchedules()
                break;
            case "favoritos":
                fetchSchedules()
                break;
        }
        item.addClass("clicked")       
    })
})

async function fetchSchedules(){
    const container = $($('feed-container')[0].shadow);
    const fragment = $(document.createDocumentFragment())


    for(let i = 0; i < 2; i++){
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

    for(let i = 0; i < 2; i++) {
        const el = document.createElement('helper-service')
        el.service = {};
        fragment.append(el)
    } 
    
    container.append(fragment)
}

function clear(){
    const container = $($('feed-container')[0].shadow);
    container.find('helper-schedule').remove()
    container.find('helper-service').remove()
}