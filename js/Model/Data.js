export default class Data {
    constructor(data) {
        this.data = data;
        this.setterSubscribers = {};
    }

    set (key, value) {
        this.data[key] = value;

        this.notifySubscribers(key, value);
    }

    get (path, defaultValue = null) {
        let data = this.data;

        path = path.split('.');

        for (let i = 0; i < path.length; i++) {
            if (!data.hasOwnProperty(path[i])) {
                return defaultValue;
            }

            data = data[path[i]];
        }

        return data;
    }

    subscribe(key, callback) {
        let subscribers = this.setterSubscribers[key] || [];

        subscribers.push(callback);

        this.setterSubscribers[key] = subscribers;
    }

    unsubscribeAll() {
        this.setterSubscribers = [];
    }

    notifySubscribers(key, value) {
        let subscribers = this.setterSubscribers[key] || [];

        subscribers.map(callback => {
            callback(key, value);
        });
    }
}
