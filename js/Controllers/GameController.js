import GameField from '../Views/CardTable.js';
import NewGame from '../Views/NewGame.js';
import CardCollectionBuilder from "../Services/CardCollectionBuilder.js";
import Storage from "../Services/Storage.js";

export default class GameController {
    static showCardTable() {
        const collection = (new CardCollectionBuilder).restoreOrBuild();
        const get = Storage.get;

        return new GameField(collection, {
            'columns': get('complexity.columns'),
            'cardBackStyle': get('card-back', 'card-back-0'),
            'time': get('time', 0),
            'clicks': get('clicks', 0)
        });
    }

    static newGame() {
        return new NewGame();
    }
}
