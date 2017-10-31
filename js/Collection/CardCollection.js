import CardElement from "../Elements/Card.js";
import Storage from "../Services/Storage.js";

export default class CardCollection {
    constructor(cards) {
        this.cards = cards;
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

    getGrid() {
        let rows = [];

        for (let i = 0, row, card; i < this.cards.length; i++) {
            card = this.cards[i];

            row = rows[card.row] || [];
            row[card.column] = card;

            rows[card.row] = row;
        }

        return rows;
    }
}