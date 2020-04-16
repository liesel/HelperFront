class FeedContainer extends HTMLElement {
    constructor(){
        super();
        this.root = this.attachShadow({mode: 'open'})
    }

    get shadow(){
        return this.root
    }

    connectedCallback(){
        console.log('container connected')
        this.render()
    }

    render() {
        var fragment = $(document.createDocumentFragment())
        var styles = ["https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
                      "https://fonts.googleapis.com/icon?family=Material+Icons",
                      "/css/material-components-web.css",
                      "/css/main.css",
                      "/css/components/button.css"]
    
        styles.forEach(style => {
            var link = $(document.createElement('link'))
            link.attr("rel", "stylesheet")
            link.attr("href", style)
            fragment.append(link)
        })

        $(this.root).append(fragment) 
    }
}

customElements.define("feed-container", FeedContainer)