class AlertComponent extends HTMLElement {
    constructor(){
        super()
        this.root = this.attachShadow({mode:'open'})
    }

    config(data, next){
        this.title = data.title || 'Confirmação de e-mail';
        this.render()
        const btnSend = $($(this.root).find("#send"));
        btnSend.on("click", next)
    }

    // open(){
    //     var alert = $($(this.root).find('.alert')[0]);
    //     alert.addClass('show')
    // }

    close(){
        var alert = $(this.root).find('#divAlert');
        $(alert).alert('close');
    }

    render(){
        this.root.innerHTML = `
            <link rel="stylesheet" href="/css/main.css">
            <link rel="stylesheet" href="/css/components/alerts.css">
            <link rel="stylesheet" href="/css/components/button.css">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
            <link rel="stylesheet" href="/css/material-components-web.css">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

            <style>
                .alert{
                    margin-bottom: 2rem !important;
                }
            </style>

            <div id="divAlert" class="alert alert-warning alert-dismissible fade show" role="alert" style="min-width: fit-content;">
                <div class="d-flex">
                    <div class="pt-1">
                        <span class="material-icons pr-3" style="font-size: 32px; color: #FAAB3F; padding-left: 13px; padding-top: 5px;">
                        error
                        </span>
                    </div>
                    <div style="padding-top: 6px;">
                        <div><strong>${this.title}</strong></div>
                        <div>Confira seu e-mail <strong>Karem.car....@fcamara.com.br</strong> e siga as instrução para confirmar sua conta</div>
                    </div>
                    <div class="ml-auto p-2">
                        <button id="send" type="button" class="btn btn-outline-warning">
                        reenviar
                        </button>
                    </div>
                    <button type="button" id="close" class="close warning" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" >&times;</span>
                    </button>
                </div>
            </div>

        `
        
        const btnClose = $($(this.root).find("#close"));
        btnClose.on("click", this.close.bind(this))

    }
}

customElements.define("alert-component", AlertComponent);