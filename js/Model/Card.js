export default class Card {
    constructor(row, column, type, opened = false, removed = false) {
        this.row = row;
        this.column = column;
        this.type = type;
        this.opened = opened;
        this.removed = removed;

        this.id = this.row + "-" + this.column;
    }

    static createFromObject(obj) {
        return new Card(obj.row, obj.column, obj.type, obj.opened, obj.removed)
    }

    isPair(card) {
        return this.id !== card.id && this.type === card.type;
    }

    isSame(card) {
        return this.id === card.id;
    }
}