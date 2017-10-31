function pad(n) {
    return ('00' + n).slice(-2);
}

export default function msToTime(time) {
    let ms = ((time % 1000) / 100).toFixed(0);
    let seconds = ((time / 1000) % 60).toFixed(0);
    let mins = Math.floor(time / 1000 / 60);

    return pad(mins) + ':' + pad(seconds) + '.' + ms;
}
