$(document).ready(() => {
    const url_back      = "http://localhost:3000/";
    const btnDoLogin    = $("#btnLogin");
    
    btnDoLogin.on("click", () => {
        var email = $("#txtEmailLogin").val();
        var password = $("#txtPasswordLogin").val();
        if (email != undefined && email != "" && password != undefined && password != "") {
            $.ajax({
                url:            url_back+"v1/user/login",
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
                data: JSON.stringify({email: email, password: password})
            });
        }
    });    
})