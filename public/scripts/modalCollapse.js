$(()=>{
    
    var modalStacks = []
    
    // Editar Perfil
    $('#modalEditProfile').on('show.bs.modal', function (event) {
        var modal = $(this)
        modalStacks.push('edit-profile')
    })

    $('#modalEditProfile').on('hide.bs.modal', function (event) {
        var modal = $(this)
        modalStacks.pop()
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
        } else if (modalStacks.length > 0) {
            modalStacks.pop()
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
        modalStacks.pop()
    })

    $('.profileCircleIcon').on("click", ()=> {
        modalStacks.push('edit-avatar')
        $('#modalEditAvatar').modal('show')
    })

})