import GameField from '../Views/CardTable.js';
import NewGame from '../Views/NewGame.js';
import redirect from "../Services/redirect.js";
import Rules from "../Views/Rules.js";
import RulesModel from "../Storages/Rules.js";

export default class GameController {
    static showCardTable() {
        return new GameField();
    }

    static newGame() {
        return new NewGame();
    }

    static index() {
        RulesModel.areRead() ? redirect('new-game') : redirect('rules');
    }

    static rules() {
        return new Rules();
    }
}
