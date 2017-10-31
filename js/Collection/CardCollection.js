import CardElement from "../Elements/Card.js";
import Storage from "../Services/Storage.js";

export default class CardCollection {
    constructor(cards, columns) {
        this.cards = cards;
        this.columns = columns;
        this.numberOfRemainingCards = cards.filter(card => !card.removed).length;
    }

    getByElement(element) {
        element = element.closest('[card-id]');

        const id = element.getAttribute('card-id');

        return new CardElement(element, this.get(id), this);
    }

    get (id) {
        return this.cards.find(card => card.id === id);
    }

    openCard(card) {
        card.opened = true;

        this.store();
    }

    closeCard(card) {
        card.opened = false;

        this.store();
    }

    removeCard(card) {
        this.numberOfRemainingCards--;
        card.removed = true;

        this.store();
    }

    store() {
        Storage.set('cards', this.cards);
    }
}