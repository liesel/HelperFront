$(document).ready(() => {

    //
    // CONSTANTS
    //

    const btnLogin = $("#login")
    const btnRegister = $("#register")
    const modal = $("div.backdrop")
    const content = $("div.sideModal")
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
    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4'
    });
    
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

    //
    // HANDLERSs
    //

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

    btnRegister.on("click", () => {
        modal.removeClass("active").addClass("active")

        registerDiv.removeClass("invisible")
        loginDiv.addClass("invisible")
    })

})