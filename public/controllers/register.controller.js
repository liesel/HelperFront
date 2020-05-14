$(document).ready(function () {
    const url_back      = "http://localhost:3000/";

    function dateRangeError(){
        $("helper-service-modal")[0].close()
    }

    var openServiceModal = function (title, subtittle, modalType, text) {
        var serviceModal = $("helper-service-modal")[0]
        serviceModal.config(
        {
            type:       modalType,
            title:      title,
            subtitle:   subtittle,
            btnText:    text
        }, dateRangeError)
        serviceModal.open()
    }

    $("#btnRegisterUser").click(function (e) { 
        e.preventDefault();

        const name      = $("#txtNameRegister").val();
        const surname   = $("#txtSurnameRegister").val();
        const email     = $("#txtEmailRegister").val();
        const password  = $("#txtPasswordRegister").val();
        const agree     = $("#checkbox-termos").is(':checked');
       
        if(name == undefined || name == ""){
            openServiceModal('Campo Obrigatório', 'Informe seu nome', 3, 'OK');
        }else if (surname == undefined || surname == "") {
            openServiceModal('Campo Obrigatório', "Informe seu sobrenome", 3, 'OK');
        }else if (email == undefined || email == "") {
            openServiceModal('Campo Obrigatório', "Informe seu sobrenome", 3, 'OK');
        }else if (password == undefined || password == "") {
            openServiceModal('Campo Obrigatório', "Informe sua senha", 3, 'OK');
        }else if (!agree) {
            openServiceModal('Campo Obrigatório', "Você deve concordar com os termos", 3, 'OK');
        } else {
            $.ajax({
                url:            "/saveUser",
                type:           'post',
                dataType:       'json',
                contentType:    'application/json',
                success: function (data) {
                   if(data.status == "ok"){
                       window.location = "/home";
                   }else{
                    openServiceModal('Atenção', data.status, 3, 'OK');
                   }
                },
                error: function (data) {
                    console.log(data);
                },
                data: JSON.stringify({email: email, surname: surname, name: name, password: password})
            });
        } 
    });
});