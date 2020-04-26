$( document ).ready(function() {

    var getMyEvents = function(){
        $.ajax({
            url:            "/getMyEvents",
            type:           'get',
            dataType:       'json',
            contentType:    'application/json',
            success: function (data) {
                $('#schedulesGiven').text(data.schedulesGiven)
                $('#schedulesRecivied').text(data.schedulesRecevied)
                
            },
            error: function (data) {
                if (data.status == 401) {
                    window.location = "/";
                }else if (data.status == 500) {
                    openServiceModal('Atenção', data.responseText, 3, 'OK');
                }
            },
            data: {}
        });
    }

    getMyEvents();

    //HOME
    var selectedCategories  = [];
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

    var getSelectedsCategories = (selectedLabels) => {
        var realCategories = [];
        var tmpCategories = JSON.parse(localStorage.getItem('categories'));
        for (let index = 0; index < tmpCategories.length; index++) {
            for (let indexC = 0; indexC < selectedLabels.length; indexC++) {
                if (tmpCategories[index].name == selectedLabels[indexC]) {
                    realCategories.push(tmpCategories[index]);
                }    
            }
        }
        return realCategories;
    };

    var openServiceModal = function (title, subtittle, modalType, text, func = dateRangeError) {
        var serviceModal = $("helper-service-modal")[0]
        serviceModal.config(
        {
            type:       modalType,
            title:      title,
            subtitle:   subtittle,
            btnText:    text
        }, func)
        serviceModal.open()
    }

    $("#btnSaveEdition").click(function (e) { 
        e.preventDefault();
        var name                = $("#txtEditName").val();
        var surname             = $("#txtEditSurname").val();
        var specialization      = $("#txtEditEspecializacao").val();
        var serviceDescription  = $("#txaServiceDescription").val();
        $.ajax({
            url:            "/EditUser",
            type:           'post',
            dataType:       'json',
            contentType:    'application/json',
            success: function (data) {
                if (data.status == "ok") {
                    window.location = "/";
                }
            },
            error: function (data) {
                if (data.status == 401) {
                    window.location = "/";
                }else if (data.status == 500) {
                    openServiceModal('Atenção', data.responseText, 3,"OK");
                }
            },
            data: {name: name, surname: surname, specialization: specialization, serviceDescription: serviceDescription}
        });
        
    });

    $("#btnSair").click(function (e) { 
        $.ajax({
            url:            "/doLogout",
            type:           'post',
            dataType:       'json',
            contentType:    'application/json',
            success: function (data) {
                if (data.status == "ok") {
                    window.location = "/";
                }
            },
            error: function (data) {
                if (data.status == 401) {
                    window.location = "/";
                }else if (data.status == 500) {
                    openServiceModal('Atenção', data.responseText, 3,"OK");
                }
            },
            data: {}
        });
        
        
    });

    $("#btnSaveService").click(function (e) { 
        var serviceName     = $("#txtServiceName").val();
        var serviceDate     = $("#txtServiceDate").val();
        var startTime       = $("#txtInitialTime").val();
        var endTime         = $("#txtFinalTime").val();
        var whereBy         = $("#txtWhereby").val();
        var picpay          = $("#txtPicpay").val();
        var description     = $("#txtDescription").val();
        var type            = $('input[name=person-radios]:checked').val();
        var numberStartTime = startTime.replace(':','');
        var numberEndTime   = endTime.replace(':','');

        if(selectedCategories.length < 1){
            openServiceModal('Campo Obrigatório', 'Selecione pelo menos uma categoria', 3, 'OK');
        }else if (serviceName == "" || serviceName == undefined) {
            openServiceModal('Campo Obrigatório', "Informe o nome do serviço", 3, 'OK');
        }else if (serviceDate == "" || serviceDate == undefined) {
            openServiceModal('Campo Obrigatório', "Informe a data do serviço", 3, 'OK');
        }else if (startTime == "" || startTime == undefined) {
            openServiceModal('Campo Obrigatório', "Informe a hora do início", 3, 'OK');
        }else if (endTime == "" || endTime == undefined) {
            openServiceModal('Campo Obrigatório', "Informe a hora do fim", 3, 'OK');
        }else if (whereBy == "" || whereBy == undefined) {
            openServiceModal('Campo Obrigatório', "Informe o link do WhereBy", 3, 'OK');
        }else if (description == "" || description == undefined) {
            openServiceModal('Campo Obrigatório', "Informe a descrição do serviço", 3, 'OK');
        }else if (type == "" || type == undefined) {
            openServiceModal('Campo Obrigatório', "Informe o modelo do agendamento", 3, 'OK');
        }else if(isBiggerThan(numberStartTime, numberEndTime)) {
            openServiceModal('Campo Inválido', 'O Horário final precisa ser maior que o horário inicial.', 3, 'ok');
        }else{
            $.ajax({
                url:            "/doSaveService",
                type:           'post',
                dataType:       'json',
                contentType:    'application/json',
                success: function (data) {
                    if (data.status == "ok") {
                        openServiceModal('Sucesso', data.responseText, 2, 'OK', closeModalAndBackhome);
                    }
                },
                error: function (data) {
                    if (data.status == 401) {
                        window.location = "/";
                    }else if (data.status == 500) {
                        openServiceModal('Atenção', data.responseText, 3, "OK");
                    }
                },
                data: JSON.stringify(
                    {
                        categories:     getSelectedsCategories(selectedCategories),
                        serviceName:    serviceName,
                        serviceDate:    serviceDate, 
                        startTime:      startTime,
                        endTime:        endTime,
                        whereBy:        whereBy,
                        picpay:         picpay,
                        description:    description,
                        type:           type
                    })
            });
        }
    });

    $("#selectCategories").on("valueHasChanged", function ( event, param1) {
        selectedCategories = param1.categories;
    });

    callAlert({})

})

function callAlert(data) {
    const container = $('#alert-container');
    container.find('alert-component').remove();

    var el = document.createElement('alert-component');
    el.config(data, ()=>{alert('ok!')})

    container.append(el)
}

function isBiggerThan(x, y) {
    return x > y
}

function dateRangeError(){
    $('#labelHorarioFinal').addClass('mdc-text-field--invalid').focus()
    $("helper-service-modal")[0].close()
}

function closeModalAndBackhome(){
    $("helper-service-modal")[0].close()
    window.location = "/home";
}

async function fetchSchedules(){
    var categories = [];
    if (localStorage.getItem('categories') == undefined) {
        $.ajax({
            url:            "/getAllCategories",
            type:           'post',
            dataType:       'json',
            contentType:    'application/json',
            success: function (data) {
                localStorage.setItem('categories', JSON.stringify(data));
                categories = data;
            },
            error: function (data) {
                alert(data.responseJSON.status);
            }
        });    
    }else{
        categories = JSON.parse(localStorage.getItem('categories'));
    }
    var html    = "";
    for(var i = 0; i < categories.length; i++){
        html +=  `
            <label class="dropdown-option">
                <div class="mdc-checkbox">
                    <input type="checkbox" name="dropdown-group" value="${categories[i].name}" class="mdc-checkbox__native-control dark" />
                    <div class="mdc-checkbox__background">
                        <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                        <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                        </svg>
                        <div class="mdc-checkbox__mixedmark"></div>
                    </div>
                    <div class="mdc-checkbox__ripple"></div>
                    </div>
                <label class="dropdown-option-label">${categories[i].name}</label>
            </label>
        `
    }
    $("#selectCategories").html(html);
    
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
    const fragment = $(document.createDocumentFragment())
    
    for(let i = 0; i < 2; i++) {
        const el = document.createElement('helper-schedule-next')
        el.schedule = {};
        fragment.append(el);
        // el.countLines()
    }

    container.append(fragment)
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

