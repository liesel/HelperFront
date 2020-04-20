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

    // countLines(){
    //   var el = $(this.root).find('.content-text')[0];
    //   console.log(el)
    //   var divHeight = $(el).height($(el).val());
    //   var lineHeight = parseFloat(el.style.lineHeight)
    //   console.log(divHeight)
    //   console.log(lineHeight)
    //   var lines = divHeight / lineHeight;
    //   console.log(lines)
    // }

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
                </style>
        
                <div class="user-content p-2 mt-3">
                    <div class="d-flex content-info">
                      <div data-content="date">${this.createdDate}</div>
                    </div>
                    <div class="pt-1">
                      <div>
                        <span class="bold" style="font-size: 1.125rem !important;">${this.title}</span>
                        <p class="content-text justify-text" style="line-height: 1.5 !important;">${this.text}</p>
                        <p class="hashtags">${listOfCategories}<p>
                      </div>
                    </div>
                </div>
        `
    }
}

customElements.define("helper-schedule-next", SchedulePostNext)