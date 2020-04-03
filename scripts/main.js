$(document).ready(() => {

    /** MDC WEB COMPONENTS */

    const textFields = $('.mdc-text-field');

    for (const textField of textFields) {
        mdc.textField.MDCTextField.attachTo(textField);
    }

    const icons = $('.mdc-text-field-icon');

    for (const icon of icons ) {
        mdc.textField.icon.MDCTextFieldIcon.attachTo(icon);
    }


    let btnLogin = $("button.login")
    let btnRegister = $("button.register")
    let modal = $("div.backdrop")
    let content = $("div.sideModal")

    btnLogin.on("click", () => {
        modal.removeClass("active").addClass("active")

    })

    btnRegister.on("click", () => {
        modal.removeClass("active").addClass("active")
    })

})