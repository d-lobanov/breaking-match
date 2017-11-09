import Storage from "./Storage.js";
import build from "../Services/CardCollectionBuilder.js";
import Card from "../Model/Card.js";

class Cards {
    constructor() {
        this.data = null;
    }

    all() {
        return this.data = this.data || this.restore();
    }

    restore() {
        let cards = Storage.get('cards', null);

        if (cards) {
            return cards.map(obj => new Card(obj.id, obj.type, obj.removed));
        }

        return build();
    }

    update(updatedCard) {
        this.data[updatedCard.id] = updatedCard;
        this.save();
    }

    reset() {
        this.data = null;
        this.save();
    }

    save() {
        Storage.set('cards', this.data);
    }
}

export default new Cards();
