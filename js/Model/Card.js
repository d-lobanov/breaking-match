export default class Card {
    constructor(id, type, opened = false, removed = false) {
        this.id = id;
        this.type = type;
        this.opened = opened;
        this.removed = removed;
    }

    static createFromObject(obj) {
        return new Card(obj.id, obj.type, obj.opened, obj.removed)
    }

    isPair(card) {
        return this.id !== card.id && this.type === card.type;
    }

    isSame(card) {
        return this.id === card.id;
    }
}