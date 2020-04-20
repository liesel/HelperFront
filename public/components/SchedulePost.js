class SchedulePost extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        console.log('schedule connected')
    }

    set schedule(schedule) {
        this.id = schedule.id || '1';
        this.photo = schedule.photo || "/images/avatar-1.svg";
        this.name = schedule.name || "Marilene Alves";
        this.profession = schedule.profession || "Psicóloga, Mentora e Coach de Carreira";
        this.createdDate = schedule.created || "Seg, 03 de abril - 19:00 às 21:00";
        this.modelIcon = schedule.modelIcon || "group";
        this.model = schedule.model || "Group";
        this.title = schedule.title || "Consultoria de Carreira";
        this.text = schedule.text || "Aprenda ser reconhecido, muito bem remunerado para crescer como um(a) profissional de sucesso!";
        this.isScheduled = schedule.isScheduled || true;
        this.favoriteIcon = schedule.isfavorited ? 'favorite' : 'favorite_border';
        this.categories = schedule.categories || ["Tech", "Psycho", "Science"]
        this.render();
    }

    like() {
        let icons = $(this).find("#add-to-favorites").find(".mdc-icon-button__icon")
        if(icons.length != 0) {
            if($(icons[0]).text() == "favorite"){
                $(icons[0]).text("favorite_border")
                // request
            } else {
                $(icons[0]).text("favorite")
                // request
            }
        }
    }

    toSchedule(){
        alert("agendar")
    }

    render() {
        var listOfCategories = ""

        this.categories.forEach((item) => {
          listOfCategories += "#"+item + "  ";
        })

        this.innerHTML = `
                <style>
                    .hashtags {
                        color: #0E6D90;
                        line-height: 2 !important;
                        word-spacing: 12px;
                    }

                    .justify-text {
                        text-align: justify;
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
                        <div class="ml-auto" style="margin-right: -15px !important;">
                            <button id="add-to-favorites"
                            class="mdc-icon-button"
                            aria-label="Add to favorites"
                            aria-pressed="false"
                            style="outline: none;">
                            <i id="favorite-icon" class="material-icons mdc-icon-button__icon">${this.favoriteIcon}</i>
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
                                    <p class="hashtags">${listOfCategories}<p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row footer">
                        <div class="ml-auto">
                            <button type="button" class="btn btn-outline-cancel" data-dismiss="modal">cancelar</button>
                            <button id="agendar" class="mdc-button dark">
                            <div class="mdc-button__ripple"></div>
                            <i class="material-icons mdc-button__icon" aria-hidden="true">event</i>
                            <span class="mdc-button__label">agendar</span>
                            </button>
                        </div>
                    </div>
                </div>
        `

        let btnLike = $(this).find('#add-to-favorites')
        let btnSchedule = $(this).find('#agendar')
        btnLike.on('click', this.like.bind(this))
        btnSchedule.on("click", this.toSchedule.bind(this))
    }
}

customElements.define('helper-schedule', SchedulePost)