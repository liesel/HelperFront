(function() {
    window.initializeComponents = () => {

        //
        // CONSTANTS
        //

        const btnLogin = $("#login")
        const btnRegister = $("#register")
        const modal = $("div.backdrop")
        const textFieldPassword1 =  $("input[aria-labelledby='password1']")
        const textFieldPassword2 =  $("input[aria-labelledby='password2']")
        const passwordIcon1 = $("#secretPassword1")
        const passwordIcon2 = $("#secretPassword2")
        const checkbox = $('.mdc-checkbox')
        const formField = $('.mdc-form-field')
        const registerDiv = $('[data-form=register]')
        const loginDiv = $('[data-form=login]')
        const itemStatus = $('div.row.side-status-item')
        $('[data-toggle="tooltip"]').tooltip()
        const calendar = $('#calendar')
        const scheduleds = $(".schedule")

        //
        // CONFIG
        //

        const textFields = $('.mdc-text-field');

        for (const textField of textFields) {
            mdc.textField.MDCTextField.attachTo(textField);
        }

        const iconButtons = $('.mdc-icon-button');

        for (const iconButton of iconButtons) {
            mdc.iconButton.MDCIconButtonToggle.attachTo(iconButton)
        }

        formField.input = checkbox

        const menu = $('.mdc-menu');
        menu.open = true;

        if(calendar.length != 0) {
            console.log(calendar)
            calendar.datepicker({
                language: 'pt-BR',
                todayHighlight: true
            })    
        }

        if($('#myselect').length != 0) {
            $('#myselect').selectpicker();
        }
        
        if($('.input-append.date').length != 0) {
            $('.input-append.date').datepicker({
                language: 'pt-BR',
                pickTime: true
            });
        }

        //
        // HANDLERS
        //

        $('input[name="person-radios"]').on("click", () => {
            var radio = $('input[name="person-radios"]:checked').val()
            if(radio == 'grupo') {
                $("#div-persons").removeClass('invisible')
            } else {
                $("#div-persons").removeClass('invisible').addClass('invisible')
            }
        })

        $('.numberonly').keypress( (e) => {    
        
            var charCode = (e.which) ? e.which : e.keyCode    

            if (String.fromCharCode(charCode).match(/[^0-9]/g)){
                return false;
            } 

        });

        $('.time').mask('00:00');

        scheduleds.on("click", (event) => {
            var button = $(event.currentTarget)
            var span = $(button.children()[1])

            if(span.text() == "agendado") {
                span.text("agendar")
                button.removeClass("light").addClass("dark")
            } else {
                span.text("agendado")
                button.removeClass("dark").addClass("light")
            }
        })

        itemStatus.on("click", (event) => {
            for (const item of itemStatus) {
                $(item).removeClass("clicked")
            }
            $(event.target).addClass("clicked")
            
        })

        passwordIcon1.on("click", (event) => {
            if(passwordIcon1.text() == "visibility") {
                passwordIcon1.text("visibility_off")
                $(textFieldPassword1).attr("type","password")
            } else {
                passwordIcon1.text("visibility")
                $(textFieldPassword1).attr("type","text")
            }
        })

        passwordIcon2.on("click", (event) => {
            if(passwordIcon2.text() == "visibility") {
                passwordIcon2.text("visibility_off")
                $(textFieldPassword2).attr("type","password")
            } else {
                passwordIcon2.text("visibility")
                $(textFieldPassword2).attr("type","text")
            }
        })

        btnLogin.on("click", () => {
            modal.removeClass("active").addClass("active")

            loginDiv.removeClass("invisible")
            registerDiv.addClass("invisible")
        })

        $('#redirect-signup').on("click", ()=> {
            redirectToSignup()
        })

        btnRegister.on("click", () => {
           redirectToSignup()
        })

        var redirectToSignup =() => {
            modal.removeClass("active").addClass("active")
            registerDiv.removeClass("invisible")
            loginDiv.addClass("invisible")
        }
    }
})()