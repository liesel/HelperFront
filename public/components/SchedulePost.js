class SchedulePost extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        console.log('schedule connected')
    }

    config(id, photo, creator, startDate, endDate, title, description, isScheduled, isFavorited, categories, picpay, whereby,  type, addSchedule, cancelSchedule, isMine) {
        this.id = id;
        this.creator = creator;
        this.photo = "/images/"+photo+".svg";
        this.name = creator.name + " " + creator.surname;
        this.specialization = creator.specialization;
        this.startDate = startDate;
        this.endDate = endDate;
        this.modelIcon = type == 0 ? "person" : "group";
        this.model = type == 0 ? "Individual" : "Grupo";
        this.title = title;
        this.text = description || "";
        this.isScheduled = isScheduled || true;
        this.favoriteIcon = isFavorited ? 'favorite' : 'favorite_border';
        this.categories = categories;
        this.isMine = isMine || false;

        this.render();
        
        let btnLike = $(this).find('#add-to-favorites')
        let btnSchedule = $(this).find('#agendar')

        if(this.isMine){
            let btnCancel = $(this).find('#cancelar')
            btnCancel.on('click', cancelSchedule.bind(null))
        }

        btnLike.on('click', this.like.bind(this))

        var data = {
            id: id,
            startDate: startDate
        }

        btnSchedule.on("click", addSchedule.bind(null, data))
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

    multiLineOverflows(){
        let el = $(this).find("#description")[0]
        let overflow = el.scrollHeight > el.clientHeight;
        if(overflow){
            $(this).find("#scheduleText").append(
                `<div style="text-align: right;">
                    <span class='seeMore'>visualizar mais</span>
                </div>`
            )
        }
        $(this).find(".seeMore").on("click", (e)=>{
            if($(el).hasClass("limit-text")){
                $(el).removeClass("limit-text")
                $(e.target).text("visualizar menos")
            } else {
                $(el).removeClass("limit-text").addClass("limit-text")
                $(e.target).text("visualizar mais")
            }
        })
    }

    render() {
        var listOfCategories = "";
        var btnCancel = "";

        if(this.isMine){
            btnCancel = `<button id="cancelar" type="button" class="btn btn-outline-cancel" data-dismiss="modal" style="margin-right: 16px;">cancelar</button>`
        }

        this.categories.forEach((item) => {
          listOfCategories += "#"+ item.category.name + "  ";
        })

        // DATE CONFIG
        moment.locale('pt-BR');
        var format = "ddd, D of MMMM - ";
        var startHour = moment(`${this.startDate}`).format("HH:mm");
        var endHour = moment(`${this.endDate}`).format("HH:mm");
        var date = moment(`${this.startDate}`).format(format);
        date = date.replace("of", "de");
        date += startHour + " às " + endHour; 

        this.innerHTML = `
                
                <div class="card mt-4" style="padding: 32px;">
                    <div class="row header">
                        <div class="user-icon">
                            <img src="${this.photo}" class="card-img-top" alt="...">
                        </div>
                        <div class="user-info pl-2">
                            <div class="pt-2"><strong>${this.name}</strong></div>
                            <div>${this.specialization}</div>
                        </div>
                        <div class="ml-auto" style="margin-right: -15px !important; display: none;">
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
                                <div data-content="date">${date}</div>
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
                                    <span class="limit-text bold" style="font-size: 1.125rem !important;">${this.title}</span>
                                    <div id="scheduleText">
                                        <p id="description" class="content-text limit-text justify-text">${this.text}</p>
                                    </div>
                                    <p class="hashtags">${listOfCategories}<p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row footer">
                        <div class="ml-auto">
                            ${btnCancel}
                            <button id="agendar" class="mdc-button ${this.isMine ? 'light' : 'dark'}">
                            <div class="mdc-button__ripple"></div>
                            <i class="material-icons mdc-button__icon" aria-hidden="true">event</i>
                            <span class="mdc-button__label">${this.isMine ? 'agendado' : 'agendar'}</span>
                            </button>
                        </div>
                    </div>
                </div>
        `

        setTimeout(this.multiLineOverflows.bind(this), 50)
    }
}

customElements.define('helper-schedule', SchedulePost)