import BaseView from "./BaseView.js";
import msToTime from "../Services/msToTime.js";
import gameField from "../Templates/game.js";
import redirect from "../Services/redirect.js";
import Storage from "../Services/Storage.js";

const TIME_INCREMENT = 100;
const CARD_FADE_TIMEOUT = 800;

export default class Game extends BaseView {
    constructor(cardCollection) {
        super({
            'rows': cardCollection.getGrid(),
            'card-back': Storage.get('card-back', 'back-0')
        });

        this.template = gameField;
        this.miliseconds = Storage.get('time', 0);
        this.cards = cardCollection;
        this.blocked = false;
        this.numberOfRemainingCards = cardCollection.numberOfRemainingCards;
    }

    render() {
        setInterval(this.updateStopwatch.bind(this), TIME_INCREMENT);
        this.checkIfGameFinished();

        return super.render();
    }

    updateStopwatch() {
        this.miliseconds += TIME_INCREMENT;

        Storage.set('time', this.miliseconds);

        this.data.set('time', msToTime(this.miliseconds));
    }

    onClick(e) {
        let card = this.cards.getByElement(e.target);
        let openedCard = this.openedCard;

        if (card.isOpen() || this.blocked) {
            return;
        }

        card.open();

        if (!this.openedCard || this.openedCard.isSame(card)) {
            this.openedCard = card;

            return;
        }

        if (this.openedCard.isPair(card)) {
            this.removeCards(card, openedCard);
            this.checkIfGameFinished();
        } else {
            this.closeCards(card, openedCard);
        }

        this.openedCard = null;
    }

    closeCards(...cards) {
        const self = this;

        this.blocked = true;

        setTimeout(() => {
            cards.map(card => card.close());
            self.blocked = false;
        }, CARD_FADE_TIMEOUT);
    }

    removeCards(...cards) {
        this.numberOfRemainingCards -= cards.length;

        setTimeout(() => {
            cards.map(card => card.remove());
        }, CARD_FADE_TIMEOUT);
    }


    checkIfGameFinished() {
        if (this.numberOfRemainingCards <= 0) {
            Storage.set('time', 0);
            Storage.set('cards', null);

            const time = msToTime(this.miliseconds);

            setTimeout(() => {
                alert(`Yeah bitch. Your time is ${time}`);
                redirect('new-game');
            }, CARD_FADE_TIMEOUT);
        }
    }
}