$(() => {
    //HOME
    var selectedAvatar      = "";
    var selectedCategories  = [];
    var toggleService       = false;
    var idService           = 0;
    let homeService         = new HomeService();
    AddLoadingHUD()

    getMyEvents();
    fetchCategories()
    fetchServicesCount()
    fetchMySchedulesCount()
    fetchSchedules()
    fetchMySchedules()
   
    const itemStatus = $('div.row.side-status-item')
    itemStatus.on("click", (event) => {
        for (const item of itemStatus) {
            $(item).removeClass("clicked")
        }

        // clean container
        clear()

        var item = $(event.target);
        switch (item.attr("data-link")) {
            case "home":
                fetchSchedules()
                break;
            case "servicos":
                fetchServices()
                fetchServicesCount()
                break;
            case "agendamentos":
                fetchMySchedules()
                break;
            case "favoritos":
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

    function openServiceModal(title, subtittle, modalType, btnText, field, next) {
        var serviceModal    = $("helper-service-modal")[0]
        var func            = errorHandlerModal
        serviceModal.config(
            {
                type:       modalType,
                title:      title,
                subtitle:   subtittle,
                btnText:    btnText
            }, func.bind(null, field), next )
        serviceModal.open()
    }

    function errorHandlerModal(label) {
        if(label != undefined || label != "" ){
            $(label).addClass('mdc-text-field--invalid').focus()
        }
        $("helper-service-modal")[0].close()
    }

    function getMyEvents () {
        $.ajax({
            url: "/getMyEvents",
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                $('#schedulesGiven').text(data.schedulesGiven)
                $('#schedulesRecivied').text(data.schedulesRecevied)

            },
            error: function (data) {
                if (data.status == 401) {
                    window.location.href = "/";
                } else if (data.status == 500) {
                    openServiceModal('Atenção', data.responseText, 3, 'OK');
                }
            },
            data: {}
        });
    }

    function logout(){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

    $("#btnSaveEdition").click(function (e) {
        e.preventDefault();

        const SERVICE_NAME            = "#labelEditName",
              SERVICE_SURNAME         = "#labelEditSurname",
              SERVICE_SPECIALIZATION  = "#labelEditEspecializacao",
              SERVICE_DESCRIPTION     = "#labelEditServiceDescription"

        var name                      = $("#txtEditName").val();
        var surname                   = $("#txtEditSurname").val();
        var specialization            = $("#txtEditEspecializacao").val();
        var serviceDescription        = $("#txaServiceDescription").val();
        if (name == "" || name == undefined) {
            openServiceModal('Atenção', "Informe seu nome", 3, "OK", SERVICE_NAME);
        } else if (surname == "" || surname == undefined) {
            openServiceModal('Atenção', "Informe seu sobrenome", 3, "OK", SERVICE_SURNAME);
        } else if (specialization == "" || specialization == undefined) {
            openServiceModal('Atenção', "Informe sua especialização", 3, "OK", SERVICE_SPECIALIZATION);
        } else if (serviceDescription == "" || serviceDescription == undefined) {
            openServiceModal('Atenção', "Informe uma descrição do serviço", 3, "OK", SERVICE_DESCRIPTION);
        } else {
            Loading().open()
            $.ajax({
                url: "/userEdit",
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.status == "ok") {
                        window.location.href = "/";
                    }
                    Loading().close()
                },
                error: function (data) {
                    Loading().close()
                    if (data.status == 401) {
                        window.location.href = "/";
                    } else if (data.status == 500) {
                        openServiceModal('Atenção', data.responseText, 3, "OK");
                    }
                },
                data: JSON.stringify({ name: name, surname: surname, specialization: specialization, serviceDescription: serviceDescription, avatar: selectedAvatar })
            });
        }

    });

    $("img[data-edit='avatar']").click((e) => {
        var avatar = $(e.target).attr("data-name")
        switch(avatar){
            case "1":
                selectedAvatar = "avatar-1";
                break;
            case "2":
                selectedAvatar = "avatar-2";
                break;
            case "3":
                selectedAvatar = "avatar-3";
                break;
            case "4":
                selectedAvatar = "avatar-4";
                break;
            case "5":
                selectedAvatar = "avatar-5";
                break;
            case "6":
                selectedAvatar = "avatar-6";
                break;
            case "7":
                selectedAvatar = "avatar-7";
                break;
            default:
                selectedAvatar = "avatar-8";
                break;
        }
    });

    $("#applyAvatar").click((e) => {
        console.log(window.modalStacks)
        if(window.modalStacks.length > 0 && window.modalStacks[0] == 'edit-profile'){
            if(selectedAvatar != "") {
                $('#userAvatarEdit').attr('src', "/images/"+selectedAvatar+".svg")
            }
            $('#modalEditAvatar').modal('hide')
        } else {
            if (selectedAvatar != ""){
                Loading().open()
                $.ajax({
                    url: "/userEditAvatar",
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        Loading().close()
                        if (data.status == "ok") {
                            window.location.href = "/";
                        }
                    },
                    error: function (data) {
                        Loading().close()
                        if (data.status == 401) {
                            window.location.href = "/";
                        } else if (data.status == 500) {
                            openServiceModal('Atenção', data.responseText, 3, "OK");
                        }
                    },
                    data: JSON.stringify({ avatar: selectedAvatar })
                });
            }
            $('#modalEditAvatar').modal('hide')
        }
    })

    $("#btnSair").click(function (e) {

        logout()

        $.ajax({
            url: "/doLogout",
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                if (data.status == "ok") {
                    window.location = "/";
                }
            },
            error: function (data) {
                if (data.status == 401) {
                    window.location = "/";
                } else if (data.status == 500) {
                    openServiceModal('Atenção', data.responseText, 3, "OK");
                }
            },
            data: {}
        });
    
    });

    window.changeLayout = (type) =>{
        switch(type){
            case 1:
                toggleService = false
                // ADD SERVICE
                $('#modalAddServiceTitle').text('Cadastrar serviço')
                break;
            case 2:
                toggleService = true
                // SAVE SERVICE
                $('#modalAddServiceTitle').text('Editar serviço')
                
                // DISABLE
                var labels = ['#labelServiceName', "#labelServiceDate", '#labelHorarioInicial', '#labelHorarioFinal']
                var floatingLabels = ['#labelWhereby','#labelPicpay', '#labelDescription']
                var txtFloatingLabels = ['#linkwhere', '#linkpic', '#servicedesc']

                var textfields = ['#txtServiceName', '#txtServiceDate',
                '#txtInitialTime', '#txtFinalTime']

                textfields.forEach(element => {
                    $(element).attr('disabled', true)
                    $(element).removeClass('mdc-text-field--disabled').addClass('mdc-text-field--disabled')
                });

                labels.forEach(element => {
                    $(element).removeClass('mdc-text-field--disabled').addClass('mdc-text-field--disabled')
                    $(element).removeClass("mdc-text-field--invalid")
                })

                floatingLabels.forEach(element => {
                    $(element).removeClass('mdc-text-field--label-floating').addClass('mdc-text-field--label-floating')
                })

                txtFloatingLabels.forEach(element => {
                    $(element).removeClass('mdc-floating-label--float-above').addClass('mdc-floating-label--float-above')
                    $(element).css('background','#fff')
                    $(element).css('padding-left','6px')
                    $(element).css('padding-right','6px')
                }) 

                // FLOATING LABEL
                $("#labelCategoriesSelect").removeClass("mdc-floating-label--float-above").addClass("mdc-floating-label--float-above")

                $("#labelCategoriesSelect").css("background", "#fff")
                $("#labelCategoriesSelect").css("padding-right", "5px")
                $("#labelCategoriesSelect").css("padding-left", "5px")

                $('#nameAddService').css("display", "none")

                break;
            default:
                // CLEAN SERVICE
                idService = 0;
                $('#nameAddService').css("display", "block")

                // DISABLE
                var labels = ['#labelServiceName', "#labelServiceDate", '#labelHorarioInicial', '#labelHorarioFinal']
                var floatingLabels = ['#labelWhereby','#labelPicpay', '#labelDescription']
                var txtFloatingLabels = ['#linkwhere', '#linkpic', '#servicedesc']

                var textfields = ['#txtServiceName', '#qtdPersons', '#txtServiceDate',
                                  '#txtInitialTime', '#txtFinalTime', '#txtWhereby',
                                  '#txtPicpay', '#txtDescription']


                textfields.forEach(element => {
                    $(element).val('')
                    $(element).attr('disabled', false)
                    $(element).removeClass('mdc-text-field--disabled')
                });

                labels.forEach(element => {
                    $(element).removeClass('mdc-text-field--disabled')
                    $(element).removeClass("mdc-text-field--invalid")
                })

                floatingLabels.forEach(element => {
                    $(element).removeClass('mdc-text-field--label-floating')
                })

                txtFloatingLabels.forEach(element => {
                    $(element).removeClass('mdc-floating-label--float-above')
                    $(element).css('background','#fff')
                    $(element).css('padding-left','6px')
                    $(element).css('padding-right','6px')
                    $($($(element).parent()).parent()).removeClass('mdc-notched-outline--notched')
                }) 

                $($('#linkwhere').parent()).css("width","")
                $($('#linkpic').parent()).css("width","")
                $($('#servicedesc').parent()).css("width","")

                $("#labelCategoriesSelect").removeClass("mdc-floating-label--float-above");

                var checkBoxes = $('.mdc-checkbox__native-control.dark:checked')
                checkBoxes.each(el => {
                    checkBoxes[el].click()
                })

                break;
        }
    }

    $('#btnShowModalService').click((e) => {
        window.changeLayout(3)
        window.changeLayout(1)
        $('#modalAddService').modal('show');

    })

    $("#btnSaveService").click(function (e) {

        const SERVICE_NAME    = "#labelServiceName",
        SERVICE_DATE          = "#labelServiceDate",
        SERVICE_INITIAL_TIME  = "#labelHorarioInicial",
        SERVICE_FINAL_TIME    = "#labelHorarioFinal",
        SERVICE_WHEREBY       = "#labelWhereby",
        SERVICE_PICPAY        = "#labelPicpay",
        SERVICE_DESCRIPTION   = "#labelDescription",
        SERVICE_QTD           = "#labelQtdPeople"

        var serviceName       = $("#txtServiceName").val();
        var serviceDate       = $("#txtServiceDate").val();
        var startTime         = $("#txtInitialTime").val();
        var endTime           = $("#txtFinalTime").val();
        var whereBy           = $("#txtWhereby").val();
        var picpay            = $("#txtPicpay").val();
        var description       = $("#txtDescription").val();
        var type              = $('input[name=person-radios]:checked').val();
        var qtdPeople         = $("#qtdPersons").val()
        var numberStartTime   = startTime.replace(':', '');
        var numberEndTime     = endTime.replace(':', '');

        if(!toggleService){
            if (selectedCategories.length < 1) {
                openServiceModal('Campo Obrigatório', 'Selecione pelo menos uma categoria', 3, 'OK');
            } else if (serviceName == "" || serviceName == undefined) {
                openServiceModal('Campo Obrigatório', "Informe o nome do serviço", 3, 'OK', SERVICE_NAME);
            } else if (serviceDate == "" || serviceDate == undefined) {
                openServiceModal('Campo Obrigatório', "Informe a data do serviço", 3, 'OK', SERVICE_DATE);
            } else if (startTime == "" || startTime == undefined) {
                openServiceModal('Campo Obrigatório', "Informe a hora do início", 3, 'OK', SERVICE_INITIAL_TIME);
            } else if (endTime == "" || endTime == undefined) {
                openServiceModal('Campo Obrigatório', "Informe a hora do fim", 3, 'OK', SERVICE_FINAL_TIME);
            } else if (whereBy == "" || whereBy == undefined) {
                openServiceModal('Campo Obrigatório', "Informe o link do WhereBy", 3, 'OK', SERVICE_WHEREBY);
            } else if (picpay == "" || picpay == undefined) {
                openServiceModal('Campo Obrigatório', "Informe o link do Picpay", 3, 'OK', SERVICE_PICPAY);
            } else if (description == "" || description == undefined) {
                openServiceModal('Campo Obrigatório', "Informe a descrição do serviço", 3, 'OK', SERVICE_DESCRIPTION);
            } else if (type == "" || type == undefined) {
                openServiceModal('Campo Obrigatório', "Informe o modelo do agendamento", 3, 'OK');
            } else if (type == "Grupo" && (qtdPeople == "" || qtdPeople == undefined)) {
                openServiceModal('Campo Obrigatório', "Informe a quantidade de pessoas", 3, 'OK', SERVICE_QTD);
            } else if (isBiggerThan(numberStartTime, numberEndTime)) {
                openServiceModal('Campo Inválido', 'O Horário final precisa ser maior que o horário inicial.', 3, 'OK', SERVICE_FINAL_TIME);
            } else {
                Loading().open()

                $.ajax({
                    url: "/doSaveService",
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        Loading().close()
                        $('#modalAddService').modal('hide');
                        window.changeLayout(3)

                        if (data.status == "ok") {
                            openServiceModal('Sucesso', data.responseText, 2, 'OK', closeModalAndBackServices);
                        }

                    },
                    error: function (data) {
                        Loading().close()
                        $('#modalAddService').modal('hide');
                        window.changeLayout(3)

                        if (data.status == 401) {
                            window.location = "/";
                        } else if (data.status == 500) {
                            openServiceModal('Atenção', data.responseText, 3, "OK");
                        }
                    },
                    data: JSON.stringify(
                        {
                            categories: getSelectedsCategories(selectedCategories),
                            serviceName: serviceName,
                            serviceDate: serviceDate,
                            startTime: startTime,
                            endTime: endTime,
                            whereBy: whereBy,
                            picpay: picpay,
                            description: description,
                            type: type
                        })
                });

            }
        } else {
            if (selectedCategories.length < 1) {
                openServiceModal('Campo Obrigatório', 'Selecione pelo menos uma categoria', 3, 'OK');
            } else if (whereBy == "" || whereBy == undefined) {
                openServiceModal('Campo Obrigatório', "Informe o link do WhereBy", 3, 'OK', SERVICE_WHEREBY);
            } else if (picpay == "" || picpay == undefined) {
                openServiceModal('Campo Obrigatório', "Informe o link do Picpay", 3, 'OK', SERVICE_PICPAY);
            } else if (description == "" || description == undefined) {
                openServiceModal('Campo Obrigatório', "Informe a descrição do serviço", 3, 'OK', SERVICE_DESCRIPTION);
            } else if (type == "Grupo" && (qtdPeople == "" || qtdPeople == undefined)) {
                openServiceModal('Campo Obrigatório', "Informe a quantidade de pessoas", 3, 'OK', SERVICE_QTD);
            } else {
                Loading().open()

                $.ajax({
                    url: "/doEditService",
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        Loading().close()
                        $('#modalAddService').modal('hide');
                        window.changeLayout(3)

                        console.log('sucesso?')
                        if (data.status == "ok") {
                            openServiceModal('Sucesso', 'Serviço atualizado.', 2, 'OK', closeModalAndBackServices);
                        }
                    },
                    error: function (data) {
                        Loading().close()
                        $('#modalAddService').modal('hide');
                        window.changeLayout(3)

                        if (data.status == 401) {
                            window.location = "/";
                        } else if (data.status == 500) {
                            openServiceModal('Atenção', data.responseText, 3, "OK");
                        }
                    },
                    data: JSON.stringify(
                    {
                        categories: getSelectedsCategories(selectedCategories),
                        whereBy: whereBy,
                        picpay: picpay,
                        description: description,
                        type: type,
                        id: idService
                    })
                });
                console.log('sucesso?')

            }
        }
    });

    $('#btnCancelAddService').on('click', (e) => {
        window.changeLayout(3)
        $('#modalAddService').modal('hide');
    })

    $("#selectCategories").on("valueHasChanged", function (event, param1) {
        selectedCategories = param1.categories;
    });

    $('#searchSchedules').on('keypress', (e) => {
        const input = $(e.target)

        if (input.val().length >= 4) {
            var text = input.val()
            Loading().open()
            
            $.ajax({
                url: "/getSchedulesByName",
                type: 'get',
                dataType: 'json',
                contentType: 'application/json',
                success: async function (data) {
                    await setSchedules(data)
                    Loading().close()
                },
                error: function (data) {
                    Loading().close()
                    if (data.status == 401) {
                        window.location = "/";
                    } else if (data.status == 500) {
                        openServiceModal('Atenção', data.responseText, 3, "OK");
                    }
                },
                data: { name: text }
            })

        }

    })

    window.fectchSchedulesByDate = function fetchSchedulesByDateStart(date) {
        Loading().open()

        $.ajax({
            url: "/getSchedulesByDateStart",
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: async function (data) {
                await setSchedules(data)
                Loading().close()
            },
            error: function (data) {
                Loading().close()

                if (data.status == 401) {
                    window.location = "/";
                } else if (data.status == 500) {
                    openServiceModal('Atenção', data.responseText, 3, "OK");
                }
            },
            data: { date: date }
        })
    }

    function callAlert(data, next) {
        const container = $('#alert-container');
        $('#alert-container').css('display', 'block');
        console.log(container)
        container.find('alert-component').remove();

        var el = document.createElement('alert-component');
        el.config(data, next)
        console.log(el)

        container.append(el)
    }

    function isBiggerThan(x, y) {
        return x > y
    }

    function scheduleAgendar(data) {
        openServiceModal('Atenção', `Tem certeza que deseja agendar com ${data.specialistName} para a atividade: ${data.title}?`, 1, null, "field", confirmModalAfterSchedule.bind(null, data));
    }

    function scheduleCancel(data){
        console.log(JSON.stringify(data));
        window.changeLayout(3)
        openServiceModal('Opa!', `Tem certeza que deseja cancelar esse agendamento?`, 1, undefined, undefined, function(){
            homeService.cancelSchedule(data)
            .then( data =>{
                $('#modalAddService').modal('hide');
                openServiceModal('Opa!', data.message, 2, undefined, undefined);
                fetchMySchedulesCount()
                getMyEvents()
                fetchMySchedules()
            })
            .catch(error => {
                $('#modalAddService').modal('hide');
                openServiceModal('Opa!', error.responseText, 3);
            })
        });
    }

    function serviceCancel(data){
        window.changeLayout(3)
        openServiceModal('Opa!', `Tem certeza que deseja cancelar esse serviço?`, 1, undefined, undefined, function(){
            homeService.cancelService(data)
            .then(data =>{
                $('#modalAddService').modal('hide');
                openServiceModal('Opa!', data.status, 2, undefined, undefined);
                fetchServices()
                fetchServicesCount()
            })
            .catch(error => {
                $('#modalAddService').modal('hide');
                openServiceModal('Opa!', error.responseText, 3);
                
            })
        });
    }

    $("#cancelServiceX").on("click", async () => {
        window.changeLayout(3)
        $('#modalAddService').modal('hide');
    })

    function serviceEdit(data){
        Loading().open()
        window.changeLayout(2)

        // CONFIGURE - SESSION !!!

        moment.locale('pt-BR');
        var startHour   = moment(data.startDate).format("HH:mm");
        var endHour     = moment(data.endDate).format("HH:mm");
        var date        = moment(data.startDate).format("DD/MM/YYYY")

        $('#txtServiceName').val(data.title)
        $('#txtInitialTime').val(startHour)
        $('#txtFinalTime').val(endHour)
        $('#txtServiceDate').val(date)
        $('#txtWhereby').val(data.whereby)
        $('#txtPicpay').val(data.picpay)
        $('#txtDescription').val(data.description)
        idService = data.id

        data.categories.forEach(el => {
            var category =  el.category.name
            var element = $(`input[type="checkbox"][value='${category}']`)
            element.click();
        })

        $('#modalAddService').modal('show');
        Loading().close()
    }

    function confirmModalAfterSchedule(schedule){
        homeService.registerAppointment({schedule: schedule.id})
        .then(data =>{
            $("helper-service-modal")[0].close();
            openServiceModal('Aviso', `Agendamento realizado com sucesso`, 2, "OK", fetchSchedules);
            
        })
        .catch(error =>{
            $("helper-service-modal")[0].close();
            openServiceModal('Erro', error, 3, "OK");
        })
    }

    function closeModalAndBackhome() {
        $("helper-service-modal")[0].close()
        window.location = "/home";
    }

    function closeModalAndBackServices(){
        $("helper-service-modal")[0].close()
        $("div[data-link='servicos']").click()
    }

    async function setMySchedules(schedules){
        setSchedules(schedules,true);
    }

    async function setSchedules(schedules, isMine=false) {
        const container = $($('feed-container')[0].shadow);
        container.find('helper-schedule').remove()
        const fragment = $(document.createDocumentFragment())
        schedules.forEach(schedule => {
            const el = document.createElement('helper-schedule')
            el.config(schedule._id, schedule.CreatorId.avatar, schedule.CreatorId, schedule.ScheduleDate, schedule.ScheduleDateEnd,
                schedule.serviceName, schedule.description, (schedule.ClientId != "" && schedule.ClientId != undefined), schedule.isFavorited, schedule.categories, schedule.picpay, schedule.whereby,
                schedule.ScheduleType, scheduleAgendar, scheduleCancel, isMine)
            fragment.append(el)
        });
        container.append(fragment)
    }

    async function setServices(services) {
        const container = $($('feed-container')[0].shadow);
        container.find('helper-service').remove()
        const fragment = $(document.createDocumentFragment())
        services.forEach(service => {
            const el = document.createElement('helper-service')
            el.config(service._id, service.CreatorId.avatar, service.CreatorId, service.ScheduleDate, service.ScheduleDateEnd,
                service.serviceName, service.description, service.categories, service.picpay, service.whereby, service.ScheduleType,
                serviceEdit, serviceCancel, service.number
            )
            fragment.append(el)
        });
        container.append(fragment)
    }

    async function fetchServicesCount(){
        Loading().open()

        $.ajax({
            url: "/getServicesCount",
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                var count = data.count
                $("#countServices").text(count)
                Loading().close()
            },
            error: function (data) {
                Loading().close()

                if (data.status == 401) {
                    window.location.href = "/";
                } else if (data.status == 500) {
                    openServiceModal('Atenção', data.responseText, 3, 'OK');
                }
            },
            data: {}
        });

    }

    async function fetchServices(){
        Loading().open()
        homeService.getAllServices()
        .then( data =>{
            setServices(data.schedules)
            Loading().close()
        })
        .catch( error =>{
            Loading().close()
            if (data.status == 401) {
                window.location.href = "/";
            } else if (data.status == 500) {
                openServiceModal('Atenção', data.responseText, 3, 'OK');
            } 
        })
    }

    async function fetchMySchedulesCount(){
        Loading().open()
        $.ajax({
            url: "/getMySchedulesCount",
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                var count = data.count
                $("#countMySchedules").text(count)
                Loading().close()
            },
            error: function (data) {
                Loading().close()
                if (data.status == 401) {
                    window.location.href = "/";
                } else if (data.status == 500) {
                    openServiceModal('Atenção', data.responseText, 3, 'OK');
                }
            },
            data: {}
        });
    }

    async function fetchMySchedules(){
        Loading().open()
        $.ajax({
            url: "/getAllMySchedules",
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                setMySchedules(data.schedules)
                fetchNextSchedules(data.schedules)
                Loading().close()
            },
            error: function (data) {
                Loading().close()

                if (data.status == 401) {
                    window.location.href = "/";
                } else if (data.status == 500) {
                    openServiceModal('Atenção', data.responseText, 3, 'OK');
                }
            },
            data: {}
        });
    }

    async function fetchSchedules(){
        Loading().open()
        homeService.getAllSchedules()
        .then( data =>{
            setSchedules(data.schedules)
            Loading().close()
        })
        .catch( error => {
            Loading().close()
            if (data.status == 401) {
                window.location.href = "/";
            } else if (data.status == 500) {
                openServiceModal('Atenção', data.responseText, 3, 'OK');
            }
        })
    }

    async function fetchCategories() {
        Loading().open()
        var categories = [];
        if (localStorage.getItem('categories') == undefined || {}) {
            $.ajax({
                url: "/getAllCategories",
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    localStorage.setItem('categories', JSON.stringify(data));
                    categories = data;

                    var html = "";
                    for (var i = 0; i < categories.length; i++) {
                        html += `
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

                    var checkboxesDropdowns = $('[data-control="checkbox-dropdown"]');

                    for (var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
                        new CheckboxDropdown(checkboxesDropdowns[i])
                    }

                    Loading().close()
                },
                error: function (data) {
                    Loading().close()

                    if (data.status == 401) {
                        window.location.href = "/";
                    } else if (data.status == 500) {
                        openServiceModal('Atenção', data.responseText, 3, 'OK');
                    }
                }
            });
        } else {
            categories = JSON.parse(localStorage.getItem('categories'));
        }

    }

    async function fetchNextSchedules(schedules) {
        const container = $('#side-feed');
        const fragment  = $(document.createDocumentFragment())
        console.table(schedules);
        schedules.forEach( (schedule) =>{
            const el    = document.createElement('helper-schedule-next')
            el.schedule = schedule;
            fragment.append(el);
        })
        container.append(fragment)
    }

    function clear() {
        const container = $($('feed-container')[0].shadow);
        container.find('helper-schedule').remove()
        container.find('helper-service').remove()
    }

})

// 
// LOADING
// 

function AddLoadingHUD(){
    const container = $('body');
    container.find('loading-component').remove();
    var el = document.createElement('loading-component');
    container.append(el)
}

function Loading(){
    return $('loading-component')[0];
}

// 
// DROPDOWN
// 

function CheckboxDropdown(el) {

    var _this           = this;
    this.isOpen         = false;
    this.areAllChecked  = false;
    this.$el            = $(el);
    this.$label         = this.$el.find(".mdc-select__selected-text");
    this.$inputs        = this.$el.find("[type='checkbox']");
    this.$dropdown      = this.$el.find(".mdc-select__anchor");
    this.$floatinglabel = this.$el.find(".mdc-floating-label");

    // Add Event Handlers

    this.$label.on("click", function (e) {
        e.preventDefault();
        _this.toggleOpen();
    })

    this.$inputs.on("change", function (e) {
        _this.onCheckBox();
    })
}

CheckboxDropdown.prototype.onCheckBox = function () {
    this.updateStatus();
}

CheckboxDropdown.prototype.updateStatus = function () {
    var checked = this.$el.find(":checked");
    var values = "";
    var categories = [];

    if (checked.length === 1) {
        var checkbox = checked.parent().parent("label").find("[type='checkbox']");
        values = checkbox.attr('value');

        categories.push(checkbox.attr('value'));
        $("#selectCategories").trigger("valueHasChanged", { categories: categories });

        $(this.$label).css("color", "#232323");

    } else if (checked.length > 1) {

        for (let i = 0; i < checked.length; i++) {

            var checkbox = $(checked[i]).parent().parent("label").find("[type='checkbox']");

            categories.push(checkbox.attr('value'));

            if (i == checked.length - 1) {
                values += checkbox.attr('value');
            } else {
                values += checkbox.attr('value') + ", ";
            }
        }

        $("#selectCategories").trigger("valueHasChanged", { categories: categories });
        $(this.$label).css("color", "#232323");
    }

    this.$label.html(values);
    this.reset();
}

CheckboxDropdown.prototype.toggleOpen = function (forceOpen) {
    var _this = this;
    if (!this.isOpen || forceOpen) {
        this.isOpen = true;
        this.$el.addClass("on").addClass("mdc-select--focused").addClass("mdc-select--activated");
        this.$floatinglabel.addClass("mdc-floating-label--float-above")
        $(this.$floatinglabel).css("background", "#FFFFFF")
        $(this.$floatinglabel).css("padding-left", "5px")
        $(this.$floatinglabel).css("padding-right", "5px")
    } else {
        this.isOpen = false;
        this.$el.removeClass("on").removeClass("mdc-select--focused").removeClass("mdc-select--activated");
        if (this.$el.find(":checked").length == 0) {
            this.$floatinglabel.removeClass("mdc-floating-label--float-above")
        }
        $(this.$floatinglabel).css("padding-left", "5px")
        $(this.$floatinglabel).css("padding-right", "5px")
    }
    this.reset()
}

CheckboxDropdown.prototype.reset = function () {
    var checked = this.$el.find(":checked");

    if (checked.length <= 0) {
        if (this.isOpen) {
            $(this.$label).css("color", "#BCBCBC")
            this.$label.html("Selecione um ou mais");
        } else {
            this.$label.html("");
        }
    }
}