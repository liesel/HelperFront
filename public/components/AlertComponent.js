class AlertComponent extends HTMLElement {
    constructor(){
        super()
        this.root = this.attachShadow({mode:'open'})
    }

    config(data, next){
        this.title = data.title || 'Title';
        this.type = data.type || 2;
        this.subtitle = data.subtitle || 'Subtitle';

        if(data.email){
            var arrEmail = data.email.split("");
            var index = arrEmail.indexOf("@");
            if(index > 9){
                var domain = data.email.substring(index);
                var name = data.email.substring(0, 9);
                var email = name + "..." + domain;
                this.email = email;
            } else {
                this.email = data.email || ''
            }
        }

        this.btnText = data.btnText || '';
        this.btn = '';

        switch(this.type){
            case 1:
                this.alertStyle = 'alert-warning';
                this.closeStyle = 'warning';
                this.icon = `
                    <span class="material-icons pr-3" style="font-size: 32px; color: #FAAB3F; padding-left: 13px; padding-top: 5px;">
                    error
                    </span>
                `
                if(this.email != ''){
                    this.subtitleTemplate = `
                        <div>Confira seu e-mail <strong>${this.email}</strong> e siga as instrução para confirmar sua conta</div>
                    `
                    this.btn = `
                        <div class="ml-auto p-2">
                            <button id="send" type="button" class="btn btn-outline-warning">
                            reenviar
                            </button>
                        </div>
                    `
                } else {
                    this.subtitleTemplate = `
                        <div>${this.subtitle}</div>
                    `
                }

                break;
            case 2:
                this.alertStyle = 'alert-success';
                this.closeStyle = 'success';
                this.icon = `
                    <span class="material-icons pr-3 IconSuccess">
                    check
                    </span>
                `
                this.subtitleTemplate = `
                    <div>${this.subtitle}</div>
                `
                break;
            default:
                this.alertStyle = 'alert-danger';
                this.closeStyle = 'danger';
                this.icon = `
                    <span class="material-icons pr-3" style="font-size: 32px; color: #fa3f3f; padding-left: 13px; padding-top: 5px;">
                    cancel
                    </span>
                `
                this.subtitleTemplate = `
                    <div>${this.subtitle}</div>
                `
                break;
        }

        this.render()

        const btnSend = $($(this.root).find("#send"));
        if(btnSend.length != 0){
            btnSend.on("click", next)
        }

    }

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

                .IconSuccess {
                    color: #fff;
                    background: #19b98e;
                    border-radius: 50%;
                    width: 28px;
                    height: 28px;
                    font-size: 20px !important;
                    text-align: center;
                    line-height: 1;
                    padding-top: 4px;
                    padding-left: 4px;
                    margin-top: 5px;
                    margin-left: 13px;
                    margin-right: 20px;
                }
            </style>

            <div id="divAlert" class="alert ${this.alertStyle} alert-dismissible fade show" role="alert" style="min-width: fit-content;">
                <div class="d-flex">
                    <div class="pt-1">
                        ${this.icon}
                    </div>
                    <div style="padding-top: 6px;">
                        <div><strong>${this.title}</strong></div>
                        ${this.subtitleTemplate}
                    </div>
                    ${this.btn}
                    <button type="button" id="close" class="close ${this.closeStyle}" data-dismiss="alert" aria-label="Close">
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