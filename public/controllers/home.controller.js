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
    $.ajax({
        url:            "/getAllCategories",
        type:           'post',
        dataType:       'json',
        contentType:    'application/json',
        success: function (data) {
            var html = "";
            for(var i = 0; i < data.length; i++){
                html = html+'<label class="dropdown-option"><div class="mdc-checkbox"><input type="checkbox" name="dropdown-group" value="selection 2" class="mdc-checkbox__native-control dark" /><div class="mdc-checkbox__background"><svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"><path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" /></svg><div class="mdc-checkbox__mixedmark"></div></div><div class="mdc-checkbox__ripple"></div></div><label class="dropdown-option-label">'+data[i].name+'</label></label>';
            }
            $("#selectCategories").html(html);
        },
        error: function (data) {
            alert(data.responseJSON.status);
        }
    });
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