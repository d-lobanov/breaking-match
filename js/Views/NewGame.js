import BaseView from "./BaseView.js";
import new_game from "../Templates/new-game.js";
import Storage from "../Services/Storage.js";
import redirect from "../Services/redirect.js";

const COMPLEXITY_MAPPING = {
    0: {
        'rows': 3,
        'columns': 4,
    },
    1: {
        'rows': 3,
        'columns': 6,
    },
    2: {
        'rows': 3,
        'columns': 8,
    },
};

export default class NewGame extends BaseView {
    constructor() {
        super();

        this.template = new_game;
    }

    render() {
        let element = super.render();

        const previousComplexity = Storage.get('complexity', 'medium');
        const previousBack = Storage.get('card-back', 'back-1');

        this.checkSelector(element, 'complexity-' + previousComplexity);
        this.checkSelector(element, previousBack);

        return element;
    }

    checkSelector(element, id) {
        let radio = id ? element.querySelector('#' + id) : null;

        if (radio) {
            radio.checked = true;
        }
    }

    onComplexityClick(e) {
        const value = e.target.value;
        const complexity = COMPLEXITY_MAPPING[value];

        Storage.set('complexity', value);

        Storage.set('rows', complexity.rows);
        Storage.set('columns', complexity.columns);
    }

    onBackClick(e) {
        Storage.set('card-back', e.target.value);
    }

    onSubmit() {
        Storage.resetGameData();

        redirect('card-table');
    }
}
