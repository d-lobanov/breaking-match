import Storage from "./Storage.js";

const RULES_READ_FLAG = 'rules-were-read';

class Rules {
    areRead() {
        return Storage.get(RULES_READ_FLAG, false);
    }

    markAsRead() {
        Storage.set(RULES_READ_FLAG, true);
    }
}

export default new Rules();
