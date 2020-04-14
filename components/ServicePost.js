class ServicePost extends HTMLElement {
    constructor(){
        super()
        this.root = this.attachShadow({mode: 'open'})
    }

    render(){
        this.root.innerHTML = `
                    <div class="card mt-4" style="padding: 32px;">
                        <div class="row header">
                            <div class="user-icon">
                                <img src="${this.photo}" class="card-img-top" alt="...">
                            </div>
                            <div class="user-info pl-2">
                                <div class="pt-2"><strong>${this.name}</strong></div>
                                <div>${this.profession}</div>
                            </div>
                            <div class="ml-auto" style="margin-right: -15px !important;">
                                <button id="add-to-favorites"
                                class="mdc-icon-button"
                                aria-label="Add to favorites"
                                aria-pressed="false"
                                style="outline: none;">
                                    <i class="material-icons mdc-icon-button__icon mdc-icon-button__icon--on">favorite</i>
                                    <i class="material-icons mdc-icon-button__icon">favorite_border</i>
                                </button>
                            </div>
                        </div>
                        <div class="row content pt-3 pb-3">
                            <div class="user-content col-12">
                                <div class="d-flex content-info">
                                    <div data-content="date">${this.createdDate}</div>
                                    <div class="ml-auto content-icon d-flex">
                                        <span class="material-icons">person</span>
                                        <span class="content-icon-text">Individual</span>
                                    </div>
                                </div>
                                <div class="pt-1" style="padding-right: 56px !important;">
                                    <div style="max-width: 500px !important">
                                        <span class="bold" style="font-size: 1.125rem !important;">${this.title}</span>
                                        <p class="content-text">${this.text}</p>
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
                            <button class="mdc-button dark">
                            <div class="mdc-button__ripple"></div>
                            <i class="material-icons mdc-button__icon" aria-hidden="true">create</i>
                            <span class="mdc-button__label">editar</span>
                            </button>
                        </div>
                    </div> 
        `
    }
}