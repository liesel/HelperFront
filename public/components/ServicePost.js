class ServicePost extends HTMLElement {
    constructor(){
        super()
    }

    connectedCallback(){
        console.log('service connected')
    }

    set service(service) {
        this.id = service.id || '1';
        this.photo = service.photo || "/images/user.png";
        this.name = service.name || "Marilene Alves";
        this.profession = service.profession || "Psicóloga, Mentora e Coach de Carreira";
        this.createdDate = service.created || "Seg, 03 de abril - 19:00 às 21:00";
        this.modelIcon = service.modelIcon || "group";
        this.model = service.model || "Group";
        this.title = service.title || "Consultoria de Carreira";
        this.text = service.text || "Aprenda ser reconhecido, muito bem remunerado para crescer como um(a) profissional de sucesso!";
        this.numberOfSchedules = service.number || 10;

        this.render();
    }

    edit(){
        alert('edit')
    }
    
    render(){
        var maxLength = 120;
        const vermais = this.text.length > maxLength ? "<a id='showmore' href=#>  ...visualizar mais</a>" : ''
        var text = this.text.substring(0, maxLength)

        this.innerHTML = `
                    <style>
                        #showmore {
                            color: #042189;
                            font-weight: 600;
                        }
                    </style>
                    <div class="card mt-4" style="padding: 32px;">
                        <div class="row header">
                            <div class="user-icon">
                                <img src="${this.photo}" class="card-img-top" alt="...">
                            </div>
                            <div class="user-info pl-2">
                                <div class="pt-2"><strong>${this.name}</strong></div>
                                <div>${this.profession}</div>
                            </div>
                        </div>
                        <div class="row content pt-3 pb-3">
                            <div class="user-content col-12">
                                <div class="d-flex content-info">
                                    <div data-content="date">${this.createdDate}</div>
                                    <div class="ml-auto content-icon d-flex">
                                        <span class="material-icons">${this.modelIcon}</span>
                                        <span class="content-icon-text">${this.model}</span>
                                    </div>
                                </div>
                                <div class="pt-1" style="padding-right: 56px !important;">
                                    <div style="max-width: 500px !important">
                                        <span class="bold" style="font-size: 1.125rem !important;">${this.title}</span>
                                        <p class="content-text">${text}${vermais}</p>
                                        <ul class="list-group list-group-horizontal hashtag-list">
                                        <li class="list-group-item">#categorias</li>
                                        <li class="list-group-item">#categorias</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex footer">
                            <div class="d-flex" style="font-size: 14px !important; color: #747474;">
                                <span class="material-icons">event_available</span>            
                                <div class="pl-2 mr-auto" style="padding-top: 2px;">Agendamentos obtidos: <strong>${this.numberOfSchedules}</strong>
                            </div>
                        </div>
                        <div class="ml-auto" >
                            <button type="button" class="btn btn-outline-cancel" data-dismiss="modal">cancelar</button>
                            <button id="edit" class="mdc-button dark">
                            <div class="mdc-button__ripple"></div>
                            <i class="material-icons mdc-button__icon" aria-hidden="true">create</i>
                            <span class="mdc-button__label">editar</span>
                            </button>
                        </div>
                    </div> 
        `

        let btnEdit = $(this).find('#edit')
        btnEdit.on('click', this.edit.bind(this))
    }
}

customElements.define('helper-service', ServicePost)