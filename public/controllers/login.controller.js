$(document).ready(() => {
    const btnDoLogin    = $("#btnLogin");
    
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
                        subtitle: 'Por favor, verifique as credenciais.'
                    }, ()=>{ serviceModal.close() })
                    serviceModal.open()
                    // alert(data.responseJSON.status);
                },
                data: JSON.stringify({email: email, password: password})
            });
        }
    });    
})