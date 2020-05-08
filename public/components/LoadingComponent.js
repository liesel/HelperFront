class LoadingComponent extends HTMLElement {
    constructor(){
        super()
        this.root = this.attachShadow({mode: 'open'})
    }

    open(){
        this.render()
        $(this.root).find('.backdrop').removeClass("show").addClass("show")
        document.onkeydown = () => { return false }
    }

    close(){
        setTimeout(()=>{
            $(this.root).find('.backdrop').removeClass("show")
            document.onkeydown = () => { return true }
        }, 300)
    }

    render(){
        this.root.innerHTML = `
            <style>
                .regular {
                    width: 300px;
                    height: 300px;
                }

                .modal {
                    width: 128px;
                    height: 128px;
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translateY(-50%) translateX(-50%);
                    background: #fff;
                    border-radius: 36px;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                }

                .show {
                    display: block !important;
                }

                .backdrop {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #00000061;
                    z-index: 9999999;
                }

                .center {
                    transform: translateY(-15%) translateX(-15%);
                }
            </style>

            <div class='backdrop'>
                <div class='modal'>
                    <lottie-player
                    src="/css/components/loading.json"
                    class='center'
                    style="height: 180px; width: 180px;"
                    autoplay
                    loop
                    speed="2"
                    ></lottie-player>
                </div>
            </div>

        `
    }
}

customElements.define("loading-component", LoadingComponent);