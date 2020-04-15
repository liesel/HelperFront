class SchedulePostNext extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'})
    }

    set schedule(schedule){

        this.id = schedule.id || '1';
        this.text = schedule.text || "Aprenda ser reconhecido, muito bem remunerado para crescer como um(a) profissional de sucesso!"
        this.createdDate = schedule.created || "Seg, 03 de abril - 19:00 às 21:00";
        this.title = schedule.title || "Consultoria de Carreira";

        this.render()
    }

    render (){
        this.root.innerHTML = `
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                <link rel="stylesheet" href="../assets/css/material-components-web.css" />
                <link rel="stylesheet" href="../assets/css/main.css">
                <link rel="stylesheet" href="../assets/css/components/button.css">
        
                <div class="user-content p-2 mt-3">
                    <div class="d-flex content-info">
                      <div data-content="date">${this.createdDate}</div>
                    </div>
                    <div class="pt-1">
                      <div>
                        <span class="bold" style="font-size: 1.125rem !important;">${this.title}</span>
                        <p class="content-text">${this.text}</p>
                        <ul class="list-group list-group-horizontal hashtag-list">
                          <li class="list-group-item">#categorias</li>
                          <li class="list-group-item">#categorias</li>
                        </ul>
                      </div>
                    </div>
                </div>
        `
    }
}

customElements.define("helper-schedule-next", SchedulePostNext)