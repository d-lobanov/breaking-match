import GameController from "./Controllers/GameController.js";
import QueryParams from "./Services/QueryParams.js";

const routes = {
    'game': GameController.index,
    'new-game': GameController.create
};

export class Application {
    run() {
        const controllerCallback = this.resolveController();

        const view = controllerCallback();

        document.getElementById('content').appendChild(view.render());
    }

    resolveController() {
        let action = QueryParams.getParameterByName('action');

        if (!action || !routes[action]) {
            action = 'new-game';
        }

        return routes[action];
    }
}
