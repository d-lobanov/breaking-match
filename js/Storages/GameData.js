import Storage from "./Storage.js";
import Clicks from "./Clicks.js";
import TimeCounter from "./TimeCounter.js";
import Rules from "./Rules.js";
import Cards from "./Cards.js";
import Complexity from "./Complexity.js";

const CARD_BACK = 'card-back';

class GameData {
    constructor() {
        this.clicks = Clicks;
        this.time = TimeCounter;
        this.rules = Rules;
        this.complexity = Complexity;
        this.cards = Cards;
    }

    reset() {
        this.clicks.reset();
        this.time.reset();
        this.cards.reset();
    }

    getCardBackStyle() {
        return Storage.get(CARD_BACK, 'card-back-1');
    }

    setCardBack(cardBack) {
        Storage.set(CARD_BACK, cardBack);
    }
}

export default new GameData();
