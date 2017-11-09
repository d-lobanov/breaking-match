import BaseView from "./BaseView.js";
import card_table from "../Templates/card-table.js";
import redirect from "../Services/redirect.js";
import CardStateMachine from "../Services/CardStateMachine.js";
import GameData from "../Storages/GameData.js";

const CARD_FADE_TIMEOUT = 800;
const FLIPPED_CLASS = 'flipped';
const TIME_UPDATE_INTERVAL = 100;

export default class GameField extends BaseView {
    constructor() {
        super({
            'time': GameData.time.get(),
            'cards': GameData.cards.all(),
            'card-back-style': GameData.getCardBackStyle(),
            'columns': GameData.complexity.columns()
        });

        this.csm = new CardStateMachine(GameData.cards.all());

        this.timeCallbackId = setInterval(this.updateStopwatch.bind(this), TIME_UPDATE_INTERVAL);
    }

    template() {
        return card_table;
    }

    destroy() {
        clearInterval(this.timeCallbackId);

        return super.destroy();
    }

    updateStopwatch() {
        this.data.set('time', GameData.time.updateAndGetTimeString());
    }

    onClick(e) {
        const id = e.target.closest('[card-id]').getAttribute('card-id');
        const self = this;

        GameData.clicks.increment();

        this.csm.open(id)
            .onUpdated(cards => {
                cards.forEach(self.updateCard);
            })
            .onFinished(this.finishGame.bind(this));
    }

    updateCard(card) {
        GameData.cards.update(card);

        let classList = document.querySelector(`[card-id='${card.id}']`).classList;

        if (card.opened) {
            classList.add(FLIPPED_CLASS);
        } else {
            classList.remove(FLIPPED_CLASS);
        }

        if (card.removed) {
            setTimeout(() => {
                classList.add('hidden');
            }, CARD_FADE_TIMEOUT);
        }
    }

    finishGame() {
        setTimeout(() => {
            alert(`Yeah bitch. Time: ${GameData.time.get()}. Number of clicks: ${GameData.clicks.get()}.`);
            redirect('new-game');
        }, CARD_FADE_TIMEOUT);
    }

    onNewGameClick() {
        redirect('new-game');
    }
}
