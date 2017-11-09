import Storage from "./Storage.js";

class Clicks {
    constructor(clicks) {
        this.data = clicks;
    }

    reset() {
        this.data = 0;
        this.save();
    }

    get () {
        return this.data;
    }

    increment() {
        this.data++;
        this.save();
    }

    save() {
        Storage.set('clicks', this.data);
    }
}

export default new Clicks(Storage.get('clicks', 0));
