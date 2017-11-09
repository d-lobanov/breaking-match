import Storage from "./Storage.js";

const STORAGE_KEY = 'time';

function pad(n) {
    return ('00' + n).slice(-2);
}

function msToTime(time) {
    let ms = Math.floor((time % 1000) / 100);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor(time / 1000 / 60);

    return pad(minutes) + ':' + pad(seconds) + '.' + ms;
}

class TimeCounter {
    constructor() {
        this.prevTime = +new Date();
    }

    getTime() {
        return Storage.get(STORAGE_KEY, 0);
    }

    get () {
        return msToTime(this.getTime());
    }

    update() {
        const now = +new Date();
        let time = now - this.prevTime + this.getTime();

        this.prevTime = now;

        Storage.set(STORAGE_KEY, time);

        return time;
    }

    updateAndGetTimeString() {
        return msToTime(this.update());
    }

    reset() {
        return Storage.set(STORAGE_KEY, 0);
    }
}

export default new TimeCounter();
