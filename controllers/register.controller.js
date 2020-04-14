$(document).ready(function () {
    const url_back      = "http://localhost:3000/";
    $("#btnRegisterUser").click(function (e) { 
        e.preventDefault();
        const name      = $("#txtNameRegister").val();
        const surname   = $("#txtSurnameRegister").val();
        const email     = $("#txtEmailRegister").val();
        const password  = $("#txtPasswordRegister").val();
       
        if (name != undefined && name != "" && surname != undefined && surname != "" && email != undefined && email != "" && password != undefined && password != "") {
            $.ajax({
                url:            url_back+"v1/user/createUser",
                type:           'post',
                dataType:       'json',
                contentType:    'application/json',
                success: function (data) {
                    localStorage.setItem("token",data.token);
                    localStorage.setItem("name",data.user.name);
                    localStorage.setItem("surname",data.user.surname);
                },
                error: function (data) {
                    alert(data.responseJSON.status);
                },
                data: JSON.stringify({email: email, password: password, name: name, surname: surname})
            });
        }
    });
});