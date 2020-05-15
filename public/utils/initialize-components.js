(function() {
    window.initializeComponents = () => {

        //
        // CONSTANTS
        //

        const btnLogin = $("#login")
        const btnRegister = $("#register")
        const btnForgot = $("#forgot")
        const modal = $("div.backdrop")
        const textFieldPassword1 =  $("input[aria-labelledby='password1']")
        const textFieldPassword2 =  $("input[aria-labelledby='password2']")
        const passwordIcon1 = $("#secretPassword1")
        const passwordIcon2 = $("#secretPassword2")
        const checkbox = $('.mdc-checkbox')
        const formField = $('.mdc-form-field')
        const registerDiv = $('[data-form=register]')
        const loginDiv = $('[data-form=login]')
        const forgotDiv = $('[data-form=forgot]')
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
                todayHighlight: true,
                rangeSchedules: true
            })    
        }

        if($('#myselect').length != 0) {
            $('#myselect').selectpicker();
        }
        
        if($('.input-append.date').length != 0) {
            $('.input-append.date').datepicker({
                language: 'pt-BR',
                pickTime: true,
                startDate: '0d'
            });
        }

        $(".time24").inputmask();

        //
        // HANDLERS
        //

        $('input[name="person-radios"]').on("click", () => {
            var radio = $('input[name="person-radios"]:checked').val()
            if(radio == 'grupo') {
                $("#div-persons").removeClass('invisible')
                $('#qtdPersons').attr("required", true)
            } else {
                $("#div-persons").removeClass('invisible').addClass('invisible')
                $('#qtdPersons').attr("required", false)
            }
        })

        $('.numberonly').keypress( (e) => {    
        
            var charCode = (e.which) ? e.which : e.keyCode    

            if (String.fromCharCode(charCode).match(/[^0-9]/g)){
                return false;
            } 

        });

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
            registerDiv.removeClass("invisible").addClass("invisible")
            forgotDiv.removeClass("invisible").addClass("invisible")
        })

        $('#redirect-signup').on("click", ()=> {
            window.redirectToSignup()
        })

        btnRegister.on("click", () => {
            window.redirectToSignup()

            $('#txtEmailRegister').val("")
            $('#txtEmailRegister').removeClass('mdc-text-field--disabled')
            $('#txtEmailRegister').attr('disabled', false)
            $('#labelEmailRegister').removeClass('mdc-text-field--disabled')
            $('#emailLabelFloating').css("display", "inline-block")
        })

        btnForgot.on("click", () => {
            redirectToForgot()
        })

        $('.circular-avatar').on('click', (e) => {
            $('.circular-avatar').removeClass('actived')
            $(e.target).removeClass('actived').addClass("actived")
        })

        window.redirectToSignup = () => {
            modal.removeClass("active").addClass("active")
            registerDiv.removeClass("invisible")
            loginDiv.removeClass("invisible").addClass("invisible")
            forgotDiv.removeClass("invisible").addClass("invisible")
        }

        var redirectToForgot = () => {
            modal.removeClass("active").addClass("active")
            loginDiv.removeClass("invisible").addClass("invisible")
            registerDiv.removeClass("invisible").addClass("invisible")
            forgotDiv.removeClass("invisible")
        }
    }
})()