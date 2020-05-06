class ServiceModal extends HTMLElement {
    constructor(){
        super()
        this.root = this.attachShadow({mode: 'open'})
    }

    connectedCallback(){
        console.log("modal connected");
    }

    config(data, cancel, next) {
        var {type, title, subtitle, btnText} = data;
        this.type = type || 3;
        this.btnText = btnText || 'fechar';

        switch(this.type){
            case 1:
                this.icon = `
                    <span class="material-icons" style="color: #faab3f;" >
                    error
                    </span>
                `;
                this.modalTitle = title || "Opa!";
                this.subtitle = subtitle || "tem certeza que deseja cancelar esse serviço?";
                break;
            case 2:
                this.icon = `
                    <span class="material-icons IconSuccess">
                    check
                    </span>
                `;
                this.modalTitle = title || "Sucesso !";
                this.subtitle = subtitle || "serviços adicionado..";
                break;
            default:
                this.icon = `
                    <span class="material-icons" style="color: #fa3f3f;">
                    cancel
                    </span>
                `;
                this.modalTitle = title || "Ops, algo deu errado !";
                this.subtitle = subtitle || "O agendamento que você está solicitando tem conflito de horário com outro agendamento.";
                break;
        }

        this.render()

        // ADD event handlers
        var btnConfirm = $(this.root).find("#btnConfirm")
        var btnCustom = $(this.root).find("#btnCustom")
        if($(btnConfirm).length != 0){
            $(btnConfirm).on("click", next)
        } else if ($(btnCustom).length != 0) {
            $(btnCustom).on("click", cancel)
        }

    }

    open(){
        var modal = $(this.root).find("div#backdropAlert")
        $(modal).removeClass("showAlert").addClass("showAlert")
    }

    close(){
        var modal = $(this.root).find("div#backdropAlert")
        $(modal).removeClass("showAlert")
    }

    render(){


        var footerButtons = `
            <div class="row footer justify-content-center">
                <button id="btnCancel" type="button" class="btn btn-outline-cancel">${this.btnText}</button>
            </div>
        `

        if(this.type != 2 && this.btnText == 'fechar'){
            footerButtons = `
                <div class="d-flex">
                    <button type="button" id="btnCancel" class="btn btn-outline-cancel ml-auto mr-2">cancelar</button>
                    <button style="padding-right: 12px !important; padding-left: 12px !important;" type="button" id="btnConfirm" class="btn btn-primary dark mr-auto ml-2">confirmar</button>
                </div>
            `
        } else if(this.btnText != 'fechar'){
            footerButtons = `
            <div class="row footer justify-content-center">
                <button id="btnCustom" type="button" class="btn btn-outline-cancel dark" style="padding-right: 36px !important; padding-left: 36px !important; text-transform: uppercase !important;">${this.btnText}</button>
            </div>
        `
        }

        this.root.innerHTML = `
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <link rel="stylesheet" href="/css/material-components-web.css" />
            <link rel="stylesheet" href="/css/main.css">
            <link rel="stylesheet" href="/css/components/button.css">

            <style>

                #backdropAlert {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 99999999;
                    background-color: #00000061;
                }

                .showAlert {
                    display: block !important;
                }

                .servicemodal {
                    position: relative;
                    top: 50%;
                    left:50%;
                    transform: translateX(-45%) translateY(-45%);
                    width: 432px;
                    background: #fff;
                    padding: 40px;
                    border-radius: 8px;
                }
                
                .material-icons {
                    font-size: 74px !important;
                }

                .modal-text-content h2 {
                    font-size: 1.25rem !important;
                    font-weight: bold !important;
                    color: #232323 !important;
                    margin-top: 12px;
                    margin-bottom: 12px;
                }

                .modal-text-content p {
                    font-size: 1rem !important;
                    color: #232323 !important;
                    margin-bottom: 24px;
                }

                .modal-text-content {
                    padding-left: 50px !important;
                    padding-right: 50px !important;
                }

                .IconSuccess {
                    color: #fff;
                    background: #19b98e;
                    border-radius: 50%;
                    width: 70px;
                    height: 70px;
                    font-size: 48px !important;
                    text-align: center;
                    line-height: 1.5;
                }
                
            </style>
            <div id="backdropAlert">
                <div class="servicemodal">
                    <div>
                        <div class="d-flex justify-content-center">
                            ${this.icon}
                        </div>
                        <div class="modal-text-content text-center">
                            <h2>${this.modalTitle}</h2>
                            <p>${this.subtitle}<p>
                        </div>
                    </div>
                    ${footerButtons}
                </div>
            </div>
        `

        var btnCancel = $(this.root).find("#btnCancel")
        if($(btnCancel).length != 0){
            $(btnCancel).on("click", this.close.bind(this))
        }

    }

}

customElements.define("helper-service-modal", ServiceModal)
