import GameController from "./Controllers/GameController.js";
import Storage from "./Storages/Storage.js";

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
        this.view = null;
    }

    run() {
        this.renderContainer();
    }

    destroyView() {
        if (this.view) {
            this.view.destroy();
        }

        this.view = null;
    }

    redirect(action) {
        this.action = action;
        this.destroyView();

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

        this.view = controllerCallback();

        if (!this.view || typeof this.view.render !== 'function') {
            this.view = null;

            return;
        }

        let content = this.view.render();

        content.classList.add(this.action);

        document.getElementById('content').innerHTML = '';
        document.getElementById('content').appendChild(content);
    }
}

export default new Application();