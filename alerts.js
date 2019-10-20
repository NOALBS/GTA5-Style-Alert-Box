class Alert {
    /**
     * @param {string} elementId The div id you want to use for alerts.
     */
    constructor(elementId) {
        this.div = document.getElementById(elementId);
        this.div.addEventListener("animationend", this.animationEndHandler.bind(this));
        new MutationObserver(this.deleteHandler).observe(this.div, { childList: true });
    }

    /**
     * Method to generate the HTML from the specified template and data.
     * @param {String} template The template you want to use.
     * @param {Object} data The data the template uses.
     * @returns {String} HTML of the template with the data inserted.
     */
    template(template, data) {
        switch (template) {
            case "notificationPicture":
                return `
                        <div class="elem">
                            <div class="alert alertWithPicture fadein">
                                <div class="IMG">
                                    <img src="${data.image}" alt="img">
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
            case "notification":
                return `
                    <div class="elem">
                            <div class="alert alertNormal fadein">
                                <p>${data.text}</p>
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

    /**
     * Deletes the notification after 15 seconds.
     * @param {any} mutationsList Mutationlist from observer
     */
    deleteHandler(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                for (let nodes of mutation.addedNodes) {
                    setTimeout(() => {
                        nodes.remove();
                    }, 15000);
                }
            }
        }
    }
}
