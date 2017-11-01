const PREFIX = 'bm-';

function jsonParse(val, d) {
    if (typeof val !== 'undefined' && val !== 'undefined' && val) {
        return JSON.parse(val);
    }

    return d;
}

class Storage {
    set (key, value) {
        localStorage.setItem(PREFIX + key, JSON.stringify(value));

        return this;
    }

    get (key, defaultValue = null) {
        let path = key.split('.');

        key = path.shift();

        let value = jsonParse(localStorage.getItem(PREFIX + key), defaultValue);

        if (path.length < 1) {
            return value;
        }

        for (let i in path) {
            if (!value) {
                return defaultValue;
            }

            value = value[path[i]] || defaultValue;
        }

        return value;
    }

    resetGameData() {
        this.set('time', 0)
            .set('clicks', 0)
            .set('cards', null);
    }
}

export default new Storage();