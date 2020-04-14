class SchedulePost extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'})
    }

    set schedule(schedule) {
        this.id = schedule.id || '1';
        this.photo = schedule.photo || "../assets/images/user.png";
        this.name = schedule.name || "Marilene Alves";
        this.profession = schedule.profession || "Psicóloga, Mentora e Coach de Carreira"
        this.createdDate = schedule.created || "Seg, 03 de abril - 19:00 às 21:00";
        this.modelIcon = schedule.modelIcon || "group";
        this.model = schedule.model || "Group";
        this.title = schedule.title || "Consultoria de Carreira";
        this.text = schedule.text || "Aprenda ser reconhecido, muito bem remunerado para crescer como um(a) profissional de sucesso!"

        this.render()
    }

    like() {
        let icons = $(this.root).find("#add-to-favorites").find(".mdc-icon-button__icon")
        if(icons.length != 0) {
            if($(icons[0]).hasClass("mdc-icon-button__icon--on")){
                $(icons[0]).removeClass("mdc-icon-button__icon--on")
                $(icons[1]).addClass("mdc-icon-button__icon--on")
                // request
            } else {
                $(icons[1]).removeClass("mdc-icon-button__icon--on")
                $(icons[0]).addClass("mdc-icon-button__icon--on")
                // request
            }
        }
    }

    toSchedule(){
        alert("agendar")
    }

    render() {
        this.root.innerHTML = `
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                <link rel="stylesheet" href="../assets/css/material-components-web.css" />
                <link rel="stylesheet" href="../assets/css/main.css">
                <link rel="stylesheet" href="../assets/css/components/button.css">

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
                                    <span class="material-icons">
                                    ${this.modelIcon}
                                    </span>
                                    <span class="content-icon-text">
                                    ${this.model}
                                    </span>
                                </div>
                            </div>
                            <div class="pt-1" style="padding-right: 16px !important;">
                                <div style="max-width: 800px !important">
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
                    <div class="row footer">
                        <div class="ml-auto">
                            <button id="agendar" class="mdc-button dark">
                            <div class="mdc-button__ripple"></div>
                            <i class="material-icons mdc-button__icon" aria-hidden="true">event</i>
                            <span class="mdc-button__label">agendar</span>
                            </button>
                        </div>
                    </div>
                </div>
        `

        let btnLike = $(this.root).find("#add-to-favorites")
        let btnSchedule = $(this.root).find("#agendar")
        
        $(btnLike).on("click", this.like.bind(this))
        $(btnSchedule).on("click", this.toSchedule.bind(this))
    }
}

customElements.define('helper-schedule', SchedulePost)