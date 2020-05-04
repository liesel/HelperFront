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
        this.categories = schedule.categories || ["Tech", "Psycho", "Science"]

        this.render()
    }

    render (){

        var listOfCategories = ""

        this.categories.forEach((item) => {
          listOfCategories += "#"+item + "  ";
        })

        this.root.innerHTML = `
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                <link rel="stylesheet" href="/css/material-components-web.css" />
                <link rel="stylesheet" href="/css/main.css">
                <link rel="stylesheet" href="/css/components/button.css">

                <style>
                  .hashtags {
                    color: #0E6D90;
                    line-height: 2 !important;
                    word-spacing: 12px;
                  }

                  .justify-text {
                    text-align: justify;
                  }

                  .limit-text {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; /* number of lines to show */
                    -webkit-box-orient: vertical;

                    padding-top: 2px;
                    padding-bottom: 2px;
                  }

                  .title {
                    font-size: 1.125rem !important;
                  }
                </style>
        
                <div class="user-content p-2 mt-3">
                    <div class="d-flex content-info">
                      <div data-content="date">${this.createdDate}</div>
                    </div>
                    <div class="pt-1">
                      <div>
                        <span class="limit-text bold title">${this.title}</span>
                        <p class="limit-text justify-text" style="line-height: 1.5 !important;">${this.text}</p>
                        <p class="hashtags">${listOfCategories}<p>
                      </div>
                    </div>
                </div>
        `
    }
}

customElements.define("helper-schedule-next", SchedulePostNext)