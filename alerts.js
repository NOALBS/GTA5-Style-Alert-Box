class Alert {
    constructor() {
        this.div = document.getElementById("alerts");
        this.div.addEventListener("animationend", this.animationEndHandler.bind(this));
    }

    /**
     * Method to generate the HTML from the specified template and data.
     * @param {String} template The template you want to use.
     * @param {Object} data The data the template uses.
     * @returns {String} HTML of the template with the data inserted.
     */
    template(template, data) {
        switch (template) {
            case "test":
                return `
                        <div class="elem">
                            <div class="alert fadein">
                                <div class="IMG">
                                    <img src="https://via.placeholder.com/1000x1000" alt="img">
                                </div>
                                <div class="INFO">
                                    <p class="H1">${data.title}</p>
                                    <p class="smaller">${data.sub}</p>
                                </div>
                                <div class="TEXT">
                                    <p>${data.text}</p>
                                </div>
                            </div> 
                        </div>
                    `;

            default:
                break;
        }
    }

    /**
     * Method to add a new alert to the page.
     * @param {String} template The template you want to use.
     * @param {Object} data The data the template uses.
     */
    add(template, data) {
        let alert = this.template(template, data);

        this.animationStartHandler();
        this.div.insertAdjacentHTML("beforeend", alert);
    }

    /**
     * This method adds the slidein animation to all elements with the class ".elem".
     */
    animationStartHandler() {
        let d = document.querySelectorAll(".elem");

        for (const [index, el] of d.entries()) {
            el.classList.add("slidein");
        }
    }

    /**
     * Animationend event handler.
     * @param {any} e
     */
    animationEndHandler(e) {
        // console.log(e);
        if (e.animationName == "fadein") {
            e.target.classList.remove("fadein");
        }

        if (e.animationName == "slidein") {
            e.target.classList.remove("slidein");
        }
    }
}
