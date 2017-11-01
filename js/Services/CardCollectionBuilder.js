import CardCollection from "../Collection/CardCollection.js";
import Card from "../Model/Card.js";
import Storage from "./Storage.js";

const MAXIMUM_CARD_FRONT_NUMBER = 12;
const CARD_FRONT_PREFIX = 'front-';

export default class CardCollectionBuilder {
    restoreOrBuild() {
        let cards = Storage.get('cards', null);

        if (cards) {
            cards = cards.map(obj => Card.createFromObject(obj));

            return new CardCollection(cards);
        }

        return this.build();
    }

    build() {
        const rows = Storage.get('complexity.rows', 3);
        const columns = Storage.get('complexity.columns', 4);

        const cards = this.getCards(rows, columns, CARD_FRONT_PREFIX);

        return new CardCollection(cards);
    }

    getCards(rows, columns, prefix = 'card-front-') {
        let count = (rows * columns / 2).toFixed();

        let data = [];
        let styles = this.getRandomStyles(count, prefix);

        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                data.push(new Card(row + '-' + column, styles.pop()));
            }
        }

        return data;
    }

    getRandomStyles(count, prefix = 'card-front-') {
        let styles = [];

        for (let i = 0, j = 0; i < count; i++, j++) {
            j = j > MAXIMUM_CARD_FRONT_NUMBER ? 0 : j;

            styles.push(prefix + j);
        }

        styles = styles.concat(styles);

        return this.shuffle(styles);
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }

        return a;
    }
}
