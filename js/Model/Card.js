export default class Card {
    constructor(id, type, removed = false) {
        this.id = id.toString();
        this.type = type;
        this.removed = removed;
        this.opened = false;
    }

    isPair(card) {
        return this.id !== card.id && this.type === card.type;
    }
}
