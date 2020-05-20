$(()=>{

    // EDIT SERVICE

    $('#modalAddService').on('hide.bs.modal', function (event) {
        window.changeLayout(3)
    })

    // Editar Perfil
    $('#modalEditProfile').on('show.bs.modal', function (event) {
        var modal = $(this)
        if(window.modalStacks.length < 1) {
            window.modalStacks.push('edit-profile')
        }
    })

    $('#modalEditProfile').on('hide.bs.modal', function (event) {
        var modal = $(this)
        if(window.modalStacks.length == 1) {
            window.modalStacks.shift()
        }
    })

    // Editar Avatar
    $('#modalEditAvatar').on('show.bs.modal', function (event) {
        var modal = $(this)
        if(window.modalStacks.length > 0 && window.modalStacks[0] == 'edit-profile'){
            window.modalStacks.push('edit-avatar')
            $('#modalEditProfile').modal('hide')
        } else if (window.modalStacks.length < 1) {
            window.modalStacks.push('edit-avatar')
        }
    })

    $('#modalEditAvatar').on('hide.bs.modal', function (event) {
        if(window.modalStacks.length > 0 && modalStacks[0] == 'edit-profile'){
            window.modalStacks.pop()
            $('#modalEditProfile').modal('show')
        } else if (window.modalStacks.length > 0) {
            window.modalStacks.pop()
        }
    })

    $('#modalNavuser').on("click", (e) => {
        if(!($(e.target).attr("data-target") == "#modalEditProfile" || 
           $(e.target).attr("id") == "btnSair'")){
            e.stopPropagation();
        }
    })

    $('#navuser').on("click", () => {
        if(!$('.backdropUser').hasClass("active")){
            $('.backdropUser').removeClass("active").addClass("active")
        } else {
            $('.backdropUser').removeClass("active")
        }
    })

    $('.backdropUser').on("click", (e) => {
        $('.backdropUser').removeClass("active")
        window.modalStacks.pop()
    })

    $('.profileCircleIcon').on("click", ()=> {
        modalStacks.push('edit-avatar')
        $('#modalEditAvatar').modal('show')
    })

})