import GameField from '../Views/CardTable.js';
import NewGame from '../Views/NewGame.js';
import CardCollectionBuilder from "../Services/CardCollectionBuilder.js";

export default class GameController {
    static showCardTable() {
        const collection = (new CardCollectionBuilder).restoreOrBuild();

        return new GameField(collection);
    }

    static newGame() {
        return new NewGame();
    }
}
