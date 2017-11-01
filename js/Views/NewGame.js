import BaseView from "./BaseView.js";
import new_game from "../Templates/new-game.js";
import redirect from "../Services/redirect.js";
import Storage from "../Services/Storage.js";

const COMPLEXITY_MAPPING = [
    {
        'id': '0',
        'rows': 3,
        'columns': 4,
    },
    {
        'id': '1',
        'rows': 3,
        'columns': 6,
    },
    {
        'id': '2',
        'rows': 3,
        'columns': 8,
    },
];

function getComplexity(id) {
    return COMPLEXITY_MAPPING.find(i => i.id.toString() === id);
}

export default class NewGame extends BaseView {
    constructor() {
        super({
            'complexities': [
                {'id': 0, 'style': 'complexity-0', 'caption': '[ 3 x 4 ]'},
                {'id': 1, 'style': 'complexity-1', 'caption': '[ 3 x 6 ]'},
                {'id': 2, 'style': 'complexity-2', 'caption': '[ 3 x 8 ]'}
            ],
            'back-styles': ['card-back-0', 'card-back-1', 'card-back-2']
        });

        this.template = new_game;
    }

    render() {
        let element = super.render();

        const backStyle = Storage.get('card-back', 'card-back-1');
        const complexityId = Storage.get('complexity.id', 1);

        this.switchActiveCardBack(backStyle);
        this.switchActiveComplexity(complexityId);

        Storage.set('card-back', backStyle);
        Storage.set('complexity', getComplexity(complexityId));

        return element;
    }

    switchActiveCardBack(back) {
        let element = this.element.querySelector(`[back-id=${back}]`);
        const parent = this.element.querySelector('#back-grid');

        this.unCheckAllSelectors(parent);
        this.checkSelector(element);
    }

    switchActiveComplexity(complexity) {
        let element = this.element.querySelector(`[complexity-id='${complexity}']`);
        const parent = this.element.querySelector('#complexity-grid');

        this.unCheckAllSelectors(parent);
        this.checkSelector(element);
    }

    unCheckAllSelectors(parent) {
        let element = parent.querySelector('.selected');

        if (element) {
            element.classList.remove('selected');
        }
    }

    checkSelector(element) {
        if (element) {
            element.closest('figure').classList.add('selected');
        }
    }

    onComplexityClick(e) {
        const id = e.target.parentElement.querySelector('[complexity-id]').getAttribute('complexity-id');

        this.switchActiveComplexity(id);

        Storage.set('complexity', getComplexity(id));
    }

    onBackClick(e) {
        const id = e.target.closest('[back-id]').getAttribute('back-id');

        this.switchActiveCardBack(id);

        Storage.set('card-back', id);
    }

    onSubmit() {
        Storage.resetGameData();

        redirect('card-table');
    }
}
