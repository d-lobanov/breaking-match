import BaseView from "./BaseView.js";
import new_game from "../Templates/new-game.js";
import redirect from "../Services/redirect.js";
import GameData from "../Storages/GameData.js";

export default class NewGame extends BaseView {
    constructor() {
        super({
            'complexities': GameData.complexity.all(),
            'back-styles': ['card-back-0', 'card-back-1', 'card-back-2']
        });

        this.complexityId = GameData.complexity.id();
        this.cardBack = GameData.getCardBackStyle();
    }

    template() {
        return new_game;
    }

    render() {
        const element = super.render();

        this.switchActiveCardBack();
        this.switchActiveComplexity();

        return element;
    }

    switchActiveCardBack() {
        const element = this.element.querySelector(`[back-id=${this.cardBack}]`);

        this.unCheckAllSelectors("back-grid");
        this.checkSelector(element);
    }

    switchActiveComplexity() {
        const element = this.element.querySelector(`[complexity-id='${this.complexityId}']`);

        this.unCheckAllSelectors("complexity-grid");
        this.checkSelector(element);
    }

    unCheckAllSelectors(id) {
        const nodeList = this.element.querySelectorAll(`#${id} > .selected`);

        Array.from(nodeList).map((e) => e.classList.remove('selected'));
    }

    checkSelector(element) {
        if (element) {
            element.closest('figure').classList.add('selected');
        }
    }

    onComplexityClick(e) {
        this.complexityId = e.target.parentElement.querySelector('[complexity-id]').getAttribute('complexity-id');
        this.switchActiveComplexity();

        GameData.complexity.set(this.complexityId);
    }

    onBackClick(e) {
        this.cardBack = e.target.closest('[back-id]').getAttribute('back-id');
        this.switchActiveCardBack();

        GameData.setCardBack(this.cardBack);
    }

    onSubmit() {
        GameData.reset();

        redirect('card-table');
    }
}
