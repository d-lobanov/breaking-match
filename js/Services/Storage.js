const PREFIX = 'bm-';

export default class Storage {
    static set (key, value) {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));
    }

    static get (key, defaultValue = null) {
        let path = key.split('.');

        key = path.shift();

        let value = localStorage.getItem(PREFIX + key);

        if (typeof value !== 'undefined' && value !== 'undefined' && value) {
            value = JSON.parse(value);
        } else {
            value = defaultValue;
        }

        return path.length > 0 ? path.reduce((res, key) => res[key] || defaultValue, value) : value;
    }

    static resetGameData() {
        Storage.set('time', 0);
        Storage.set('cards', null);
        Storage.set('clicks', 0);
    }
}
