class ServicePost extends HTMLElement {
    constructor(){
        super()
    }

    connectedCallback(){
        console.log('service connected')
    }

    config(id, photo, creator, startDate, endDate, title, description, categories, type, editSchedule, cancelSchedule, number) {
        this.id = id;
        this.creator = creator;
        this.photo = photo || "/images/avatar-1.svg";
        this.name = creator.name + " " + creator.surname;
        this.specialization = creator.specialization;
        this.startDate = startDate;
        this.endDate = endDate;
        this.modelIcon = type == 0 ? "person" : "group";
        this.model = type == 0 ? "Individual" : "Grupo";
        this.title = title;
        this.text = description || "";
        this.categories = categories;
        this.numberOfSchedules = number || 0;
        
        this.render();

        let btnCancel = $(this).find('#cancelar')
        btnCancel.on('click', cancelSchedule.bind(null))

        let btnEdit = $(this).find('#edit')
        btnEdit.on('click', editSchedule.bind(null))
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
    
    render(){

        var listOfCategories = "";

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
                        <div class="d-flex footer">
                            <div class="d-flex" style="font-size: 14px !important; color: #747474;">
                                <span class="material-icons">event_available</span>            
                                <div class="pl-2 mr-auto" style="padding-top: 2px;">Agendamentos obtidos: <strong>${this.numberOfSchedules}</strong>
                            </div>
                        </div>
                        <div class="ml-auto" >
                            <button id="cancelar" type="button" class="btn btn-outline-cancel" data-dismiss="modal">cancelar</button>
                            <button id="edit" class="mdc-button dark">
                            <div class="mdc-button__ripple"></div>
                            <i class="material-icons mdc-button__icon" aria-hidden="true">create</i>
                            <span class="mdc-button__label">editar</span>
                            </button>
                        </div>
                    </div> 
        `
    }
}

customElements.define('helper-service', ServicePost)