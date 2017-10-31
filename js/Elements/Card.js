const FLIPPED_CLASS = 'flipped';

export default class CardElement {
    constructor(element, card, collection) {
        this.element = element;
        this.card = card;
        this.collection = collection;
    }

    open() {
        this.collection.openCard(this.card);

        this.element.classList.add(FLIPPED_CLASS);
    }

    close() {
        this.collection.closeCard(this.card);

        this.element.classList.remove(FLIPPED_CLASS);
    }

    remove() {
        this.collection.removeCard(this.card);

        this.element.classList.add('hidden');
    }

    isOpen() {
        this.element.classList.contains(FLIPPED_CLASS);
    }

    isPair(cardElement) {
        return this.card.isPair(cardElement.card);
    }

    isSame(cardElement) {
        return this.card.isSame(cardElement.card);
    }
}