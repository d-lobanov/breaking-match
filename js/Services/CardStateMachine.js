class Event {
    constructor(cards, finished) {
        this.cards = cards;
        this.finished = finished;
    }

    onUpdated(callback) {
        callback(this.cards);

        return this;
    }

    onFinished(callback) {
        if (this.finished) {
            callback();
        }

        return this;
    }
}

export default class CardStateMachine {
    constructor(cards) {
        this.cards = cards;
        this.openedCards = [];
        this.changedCards = [];
        this.numberOfRemainingCards = cards.filter(card => !card.removed).length;
    }

    _openCard(card) {
        this.openedCards.push(card);
        card.opened = true;
        this.changedCards[card.id] = card;
    }

    _closeOpenedCards() {
        this.openedCards.forEach(card => {
            card.opened = false;
            this.changedCards[card.id] = card;
        });

        this.openedCards = [];
    }

    _removeOpenedCards() {
        this.numberOfRemainingCards -= this.openedCards.length;

        this.openedCards.forEach(card => {
            card.removed = true;
            this.changedCards[card.id] = card;
        });

        this.openedCards = [];
    }

    _giveEvent() {
        const changedCards = this.changedCards;

        this.changedCards = [];

        return new Event(changedCards, this.numberOfRemainingCards <= 0);
    }

    open(id) {
        let card = this.cards[id];
        let openedCards = this.openedCards;

        if (card.opened) {
            return this._giveEvent();
        }

        if (openedCards.length >= 2) {
            this._closeOpenedCards();
        }

        this._openCard(card);

        if (openedCards.length === 2 && openedCards[0].isPair(openedCards[1])) {
            this._removeOpenedCards();
        }

        return this._giveEvent();
    }
}
