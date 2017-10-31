import Game from '../Views/Game.js';
import NewGame from '../Views/NewGame.js';
import CardCollectionBuilder from "../Services/CardCollectionBuilder.js";

export default class GameController {
    static index() {
        const collection = (new CardCollectionBuilder).restoreOrBuild();

        return new Game(collection);
    }

    static create() {
        return new NewGame();
    }
}
