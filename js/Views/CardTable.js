import BaseView from "./BaseView.js";
import msToTime from "../Services/msToTime.js";
import card_table from "../Templates/card-table.js";
import redirect from "../Services/redirect.js";
import Storage from "../Services/Storage.js";

const TIME_INCREMENT = 100;
const CARD_FADE_TIMEOUT = 800;

export default class GameField extends BaseView {
    constructor(cardCollection, data) {
        super({
            'time': msToTime(data.time),
            'cards': cardCollection.cards,
            'card-back-style': data.cardBackStyle
        });

        this.template = card_table;

        this.cards = cardCollection;
        this.numberOfRemainingCards = cardCollection.numberOfRemainingCards;

        this.blocked = false;

        this.clicks = data.clicks;
        this.miliseconds = data.time;
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

        this.clicks++;

        if (!card.isOpen() && !this.blocked) {
            this.processClick(card);
        }
    }

    processClick(card) {
        let openedCard = this.openedCard;

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
            Storage.resetGameData();

            const time = msToTime(this.miliseconds);
            const clicks = this.clicks;

            setTimeout(() => {
                alert(`Yeah bitch. Time: ${time}. Number of clicks: ${clicks}.`);
                redirect('new-game');
            }, CARD_FADE_TIMEOUT);
        }
    }

    onNewGameClick() {
        redirect('new-game');
    }
}
