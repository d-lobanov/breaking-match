import GameController from "./Controllers/GameController.js";
import Storage from "./Services/Storage.js";

const routes = {
    'card-table': GameController.showCardTable,
    'new-game': GameController.newGame
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

        let content = controllerCallback().render();

        content.classList.add(this.action);

        document.getElementById('content').innerHTML = '';
        document.getElementById('content').appendChild(content);
    }
}

export default new Application();