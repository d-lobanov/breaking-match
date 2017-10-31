import BaseView from "./BaseView.js";
import newGame from "../Templates/new-game.js";
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

        this.template = newGame;
    }

    render() {
        let element = super.render();

        this.checkSelector(element, 'complexity-' + this.getPreviousComplexity());
        this.checkSelector(element, this.getPreviousBack());

        return element;
    }

    checkSelector(element, id) {
        let radio = id ? element.querySelector('#' + id) : null;

        if (radio) {
            radio.checked = true;
        }
    }

    getPreviousComplexity() {
        return Storage.get('complexity', 'medium');
    }

    getPreviousBack() {
        return Storage.get('card-back', 'back-1');
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
        Storage.set('cards', null);
        Storage.set('time', 0);

        redirect('game');
    }
}
