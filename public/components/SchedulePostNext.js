class SchedulePostNext extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'})
    }

    set schedule(schedule){
        this.id           = schedule._id;
        this.text         = schedule.description;
        var startDate     = new Date(schedule.ScheduleDate);
        var endDate       = new Date(schedule.ScheduleDateEnd);
        console.log(startDate);
        this.createdDate  = schedule.created || `${DateUtils.getDayOfWeek(startDate)}, ${startDate.getDate()} de ${DateUtils.getMonthName(startDate)} - ${startDate.getHours()}:${startDate.getMinutes()} às ${endDate.getHours()}:${endDate.getMinutes()}`;
        this.title        = schedule.serviceName;
        this.categories   = [];
        schedule.categories.forEach((category) =>{
          this.categories.push(category.category.name)
        })
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
                    padding-bottom: 4px;
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

                  .next-content {
                    padding-left: 16px;
                    padding-right: 24px;
                    padding-top: 16px;
                  }
                </style>
        
                <div class="user-content next-content mt-3">
                    <div class="d-flex content-info">
                      <div data-content="date">${this.createdDate}</div>
                    </div>
                    <div class="pt-1">
                        <span class="limit-text bold title">${this.title}</span>
                        <p class="limit-text justify-text" style="line-height: 1.5 !important;">${this.text}</p>
                        <p class="hashtags">${listOfCategories}<p>
                    </div>
                </div>
        `
    }
}

customElements.define("helper-schedule-next", SchedulePostNext)