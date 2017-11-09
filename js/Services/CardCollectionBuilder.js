import Card from "../Model/Card.js";
import GameData from "../Storages/GameData.js";

const MAXIMUM_CARD_FRONT_NUMBER = 12;
const CARD_FRONT_PREFIX = 'front-';

export class CardCollectionBuilder {
    build(rows, columns) {
        const ids = this.getIds(rows * columns);

        let data = [];

        for (let i = 0, j = 0; i < ids.length; i += 2) {
            const style = CARD_FRONT_PREFIX + j;
            const [firstId, secondId] = [ids[i], ids[i + 1]];

            data[firstId] = new Card(firstId, style);
            data[secondId] = new Card(secondId, style);

            j = (j + 1) % MAXIMUM_CARD_FRONT_NUMBER;
        }

        return data;
    }

    getIds(count) {
        const ids = Array.from(new Array(count).keys());

        return this.shuffle(ids);
    }

    shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
    }
}

export default function build() {
    const complexity = GameData.complexity;

    return new CardCollectionBuilder().build(complexity.rows(), complexity.columns());
}
