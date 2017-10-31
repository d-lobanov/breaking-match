const PREFIX = 'bm-';

export default class Storage {
    static set (key, value) {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
    }

    static get (key, defaultValue = null) {
        let value = localStorage.getItem(PREFIX + key);

        if (typeof value !== 'undefined' && value !== 'undefined' && value) {
            return JSON.parse(value);
        }

        return defaultValue;
    }

    static resetGameData() {
        Storage.set('time', 0);
        Storage.set('cards', null);
        Storage.set('clicks', 0);
    }
}
