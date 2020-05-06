$(document).ready(function () {

    var getMyEvents = function () {
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

    getMyEvents();

    //HOME
    var selectedCategories = [];
    fetchCategories()
    fetchNextSchedules()

    // $(".day").on("click", (e) => {
    // })

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
                // fetchSchedules()
                break;
            case "servicos":
                // fetchServices()
                break;
            case "agendamentos":
                // fetchSchedules()
                break;
            case "favoritos":
                // fetchSchedules()
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

    function openServiceModal(title, subtittle, modalType, text, field, next) {
        var serviceModal = $("helper-service-modal")[0]
        var func = errorHandlerModal
        serviceModal.config(
            {
                type: modalType,
                title: title,
                subtitle: subtittle,
                btnText: text
            }, func.bind(null, field), next )
        serviceModal.open()
    }

    function errorHandlerModal(label) {
        if(label != undefined || label != "" ){
            $(label).addClass('mdc-text-field--invalid').focus()
        }
        $("helper-service-modal")[0].close()
    }

    $("#btnSaveEdition").click(function (e) {
        e.preventDefault();

        const SERVICE_NAME            = "#labelEditName",
              SERVICE_SURNAME         = "#labelEditSurname",
              SERVICE_SPECIALIZATION  = "#labelEditEspecializacao",
              SERVICE_DESCRIPTION     = "#labelEditServiceDescription"

        var name = $("#txtEditName").val();
        var surname = $("#txtEditSurname").val();
        var specialization = $("#txtEditEspecializacao").val();
        var serviceDescription = $("#txaServiceDescription").val();
        if (name == "" || name == undefined) {
            openServiceModal('Atenção', "Informe seu nome", 3, "OK", SERVICE_NAME);
        } else if (surname == "" || surname == undefined) {
            openServiceModal('Atenção', "Informe seu sobrenome", 3, "OK", SERVICE_SURNAME);
        } else if (specialization == "" || specialization == undefined) {
            openServiceModal('Atenção', "Informe sua especialização", 3, "OK", SERVICE_SPECIALIZATION);
        } else if (serviceDescription == "" || serviceDescription == undefined) {
            openServiceModal('Atenção', "Informe uma descrição do serviço", 3, "OK", SERVICE_DESCRIPTION);
        } else {
            $.ajax({
                url: "/userEdit",
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.status == "ok") {
                        window.location.href = "/";
                    }
                },
                error: function (data) {
                    if (data.status == 401) {
                        window.location.href = "/";
                    } else if (data.status == 500) {
                        openServiceModal('Atenção', data.responseText, 3, "OK");
                    }
                },
                data: JSON.stringify({ name: name, surname: surname, specialization: specialization, serviceDescription: serviceDescription })
            });
        }

    });

    $("#btnSair").click(function (e) {
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

    $("#btnSaveService").click(function (e) {

        const SERVICE_NAME          = "#labelServiceName",
              SERVICE_DATE          = "#labelServiceDate",
              SERVICE_INITIAL_TIME  = "#labelHorarioInicial",
              SERVICE_FINAL_TIME    = "#labelHorarioFinal",
              SERVICE_WHEREBY       = "#labelWhereby",
              SERVICE_PICPAY        = "#labelPicpay",
              SERVICE_DESCRIPTION   = "#labelDescription",
              SERVICE_QTD           = "#labelQtdPeople"

        var serviceName = $("#txtServiceName").val();
        var serviceDate = $("#txtServiceDate").val();
        var startTime = $("#txtInitialTime").val();
        var endTime = $("#txtFinalTime").val();
        var whereBy = $("#txtWhereby").val();
        var picpay = $("#txtPicpay").val();
        var description = $("#txtDescription").val();
        var type = $('input[name=person-radios]:checked').val();
        var qtdPeople = $("#qtdPersons").val()
        var numberStartTime = startTime.replace(':', '');
        var numberEndTime = endTime.replace(':', '');

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
            $.ajax({
                url: "/doSaveService",
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    if (data.status == "ok") {
                        openServiceModal('Sucesso', data.responseText, 2, 'OK', closeModalAndBackhome);
                    }
                },
                error: function (data) {
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
    });

    $("#selectCategories").on("valueHasChanged", function (event, param1) {
        selectedCategories = param1.categories;
    });

    callAlert({})

    $('#searchSchedules').on('keypress', (e) => {
        const input = $(e.target)

        if (input.val().length >= 4) {
            var text = input.val()

            $.ajax({
                url: "/getSchedulesByName",
                type: 'get',
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    setSchedules(data)
                },
                error: function (data) {
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
        $.ajax({
            url: "/getSchedulesByDateStart",
            type: 'get',
            dataType: 'json',
            contentType: 'application/json',
            success: function (data) {
                setSchedules(data)
            },
            error: function (data) {
                if (data.status == 401) {
                    window.location = "/";
                } else if (data.status == 500) {
                    openServiceModal('Atenção', data.responseText, 3, "OK");
                }
            },
            data: { date: date }
        })
    }

    function callAlert(data) {
        const container = $('#alert-container');
        container.find('alert-component').remove();

        var el = document.createElement('alert-component');
        el.config(data, () => { alert('ok!') })

        container.append(el)
    }

    function isBiggerThan(x, y) {
        return x > y
    }

    function testAgendar(data) {
        console.log(data)
        openServiceModal('Atenção', `Tem certeza que deseja agendar? ID: ${data.id}; DATA INICIAL: ${data.startDate}`, 1, undefined, undefined, confirmModalAfterSchedule.bind(null, data));
    }

    function confirmModalAfterSchedule(data){
        alert(JSON.stringify(data))
    }

    function closeModalAndBackhome() {
        $("helper-service-modal")[0].close()
        window.location = "/home";
    }

    async function setSchedules(schedules) {
        const container = $($('feed-container')[0].shadow);
        container.find('helper-schedule').remove()
        const fragment = $(document.createDocumentFragment())
        schedules.forEach(schedule => {
            const el = document.createElement('helper-schedule')
            el.config(schedule._id, schedule.photo, schedule.CreatorId, schedule.ScheduleDate, schedule.ScheduleDateEnd,
                schedule.serviceName, schedule.description, schedule.isScheduled, schedule.isFavorited, schedule.categories, schedule.ScheduleType,
                testAgendar
            )
            fragment.append(el)
        });
        container.append(fragment)
    }

    async function fetchCategories() {
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

                },
                error: function (data) {
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

    async function fetchNextSchedules() {
        const container = $('#side-feed');
        const fragment = $(document.createDocumentFragment())

        for (let i = 0; i < 2; i++) {
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

        for (let i = 0; i < 2; i++) {
            const el = document.createElement('helper-service')
            el.service = {};
            fragment.append(el)
        }

        container.append(fragment)
    }

    function clear() {
        const container = $($('feed-container')[0].shadow);
        container.find('helper-schedule').remove()
        container.find('helper-service').remove()
    }

})


// 
// DROPDOWN
// 

function CheckboxDropdown(el) {

    var _this = this;

    this.isOpen = false;
    this.areAllChecked = false;
    this.$el = $(el);
    this.$label = this.$el.find(".mdc-select__selected-text");
    this.$inputs = this.$el.find("[type='checkbox']");
    this.$dropdown = this.$el.find(".mdc-select__anchor");
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
        $(this.$floatinglabel).css("padding-left", "0px")
        $(this.$floatinglabel).css("padding-right", "0px")
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