$(()=>{
    
    var modalStacks = []
    
    // Editar Perfil
    $('#modalEditProfile').on('show.bs.modal', function (event) {
        var modal = $(this)
        modalStacks.push('edit-profile')
    })

    // Editar Avatar
    $('#modalEditAvatar').on('show.bs.modal', function (event) {
        var modal = $(this)
        modalStacks.push('edit-avatar')
        if(modalStacks.length > 0 && modalStacks[0] == 'edit-profile'){
            $('#modalEditProfile').modal('hide')
        }
    })

    $('#modalEditAvatar').on('hide.bs.modal', function (event) {
        if(modalStacks.length > 0 && modalStacks[0] == 'edit-profile'){
            modalStacks.pop()
            $('#modalEditProfile').modal('show')
        }
    })

    $('#modalNavuser').on("click", (e) => {
        e.stopPropagation()
    })

    $('#navuser').on("click", () => {
        if(!$('.backdropUser').hasClass("active")){
            $('.backdropUser').removeClass("active").addClass("active")
        } else {
            $('.backdropUser').removeClass("active")
        }
    })

    $('.backdropUser').on("click", () => {
        $('.backdropUser').removeClass("active")
    })

    $('.profileCircleIcon').on("click", ()=> {
        modalStacks.push('edit-avatar')
        $('#modalEditAvatar').modal('show')
    })

})