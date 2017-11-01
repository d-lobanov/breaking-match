import GameController from "./Controllers/GameController.js";
import Storage from "./Services/Storage.js";

const routes = {
    'card-table': GameController.showCardTable,
    'new-game': GameController.newGame,
    'index': GameController.index,
    'rules': GameController.rules,
};

const DEFAULT_ACTION = 'index';

class Application {
    constructor() {
        this.action = Storage.get('action', DEFAULT_ACTION);
    }

    run() {
        this.renderContainer();
    }

    redirect(action) {
        this.action = action;
        this.renderContainer();

        Storage.set('action', action);
    }

    resolveController() {
        if (!routes[this.action]) {
            this.action = DEFAULT_ACTION;
        }

        return routes[this.action];
    }

    renderContainer() {
        const controllerCallback = this.resolveController();
        const view = controllerCallback();

        if (!view || typeof view.render !== 'function') {
            return;
        }

        let content = view.render();

        content.classList.add(this.action);

        document.getElementById('content').innerHTML = '';
        document.getElementById('content').appendChild(content);
    }
}

export default new Application();