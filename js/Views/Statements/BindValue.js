import BaseStatement from "./BaseStatement.js";

const ATTRIBUTE = 'bm-bval';

export default class BindValue extends BaseStatement {
    constructor(view) {
        super(view);

        this.subscriptions = {};
    }

    inspect(element, data) {
        let items = element.querySelectorAll(`[${ATTRIBUTE}]`);

        for (let i = 0, name; i < items.length; i++) {
            name = this.moveAttribute(items[i], ATTRIBUTE);

            items[i].innerText = data.get(name);

            this.subscribe(data, name, items[i]);
        }
    }

    subscribe(data, name, element) {
        let subscriptions = this.subscriptions[name] || [];

        subscriptions.push(element);

        this.subscriptions[name] = subscriptions;

        data.subscribe(name, this.updateValue.bind(this));
    }

    updateValue(key, value) {
        let subscriptions = this.subscriptions[key] || [];

        subscriptions.map(element => {
            element.innerText = value;
        });
    }
}
