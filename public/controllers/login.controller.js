$(document).ready((e) => {
    const btnDoLogin         = $("#btnLogin");

    window.signInCallback = (email) => {
        if (email != undefined) {
            $.ajax({
                url:            "/doGoogleLogin",
                type:           'post',
                dataType:       'json',
                contentType:    'application/json',
                success: function (data) {
                    if (data.status == "ok") {
                        window.location = "/home";
                    }
                },
                error: function (data) {
                    var serviceModal = $("helper-service-modal")[0]
                    if(data.status = "google-unauthorized"){

                        var auth2 = gapi.auth2.getAuthInstance();
                        auth2.signOut().then(function () {
                            console.log('User signed out.');
                        });
                        
                        $('#txtEmailRegister').val(email)
                        $('#txtEmailRegister').addClass('mdc-text-field--disabled')
                        $('#txtEmailRegister').attr('disabled', true)

                        $('#labelEmailRegister').addClass('mdc-text-field--disabled')
                        $('#emailLabelFloating').css("display", "none")
                        $('#labelEmailRegister').removeClass("mdc-text-field--invalid")

                        window.redirectToSignup()
                    } else {
                        serviceModal.config({
                            type: 3,
                            title: 'Login Inválido!',
                            subtitle: 'Por favor, verifique as credenciais.',
                            btnText:    "OK"
                        }, ()=>{ 
                            serviceModal.close() 
                        })
                        serviceModal.open()
                    }
                },
                data: JSON.stringify({email: email})
            });
        }
    }

    $("#btnRecoverPassword").click(function (e) { 
        var email = $("#txEmailForgot").val();
        if (email != undefined && email != "") {
            e.preventDefault();
            $.ajax({
                url:            "/recoverPassword",
                type:           'post',
                dataType:       'json',
                contentType:    'application/json',
                success: function (data) {
                    openServiceModal('Atenção', "Se seu e-mail estiver cadastrado em nossa \n base de dados, você receberá um e-mail com um passo a passo para resetar sua senha", 1,"OK");
                },
                error: function (data) {
                    openServiceModal('Atenção', "Ocorreu um erro ao tentar o processo de recuperação de senha \n Entre em contato com a gente pelo e-mail contato@helper.com.br", 3,"OK");
                },
                data: JSON.stringify({email: email})
            });
            
        }
        
    });
    
    btnDoLogin.on("click", () => {
        var email       = $("#txtEmailLogin").val();
        var password    = $("#txtPasswordLogin").val();
        if (email != undefined && email != "" && password != undefined && password != "") {
            $.ajax({
                url:            "/doLogin",
                type:           'post',
                dataType:       'json',
                contentType:    'application/json',
                success: function (data) {
                    if (data.status == "ok") {
                        window.location = "/home";
                    }
                },
                error: function (data) {
                    var serviceModal = $("helper-service-modal")[0]
                    serviceModal.config({
                        type: 3,
                        title: 'Login Inválido!',
                        subtitle: 'Por favor, verifique as credenciais.',
                        btnText:    "OK"
                    }, ()=>{ serviceModal.close() })
                    serviceModal.open()
                    // alert(data.responseJSON.status);
                },
                data: JSON.stringify({email: email, password: password})
            });
        }
    });  

    function openServiceModal(title, subtittle, modalType, text, func = closeDialog) {
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

    function closeDialog(){
        $("helper-service-modal")[0].close()
    }
      
})