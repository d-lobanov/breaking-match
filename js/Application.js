import GameController from "./Controllers/GameController.js";
import Storage from "./Services/Storage.js";

const routes = {
    'game': GameController.index,
    'new-game': GameController.create
};

class Application {
    constructor() {
        this.action = Storage.get('action', 'new-game');
    }

    run() {
        this.renderContainer();
    }

    redirect(action) {
        this.action = action;
        this.renderContainer();

        Storage.set('action', this.action = action);
    }

    resolveController() {
        if (!routes[this.action]) {
            this.action = 'new-game';
        }

        return routes[this.action];
    }

    renderContainer() {
        const controllerCallback = this.resolveController();

        const view = controllerCallback();

        document.getElementById('content').innerHTML = '';
        document.getElementById('content').appendChild(view.render());
    }
}

export default new Application();