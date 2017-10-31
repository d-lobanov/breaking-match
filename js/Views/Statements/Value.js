import BaseStatement from "./BaseStatement.js";

const ATTRIBUTE = 'bm-val';

export default class Value extends BaseStatement {
    inspect(element, data) {
        let items = element.querySelectorAll(`[${ATTRIBUTE}]`);

        for (let i = 0, name; i < items.length; i++) {
            name = this.moveAttribute(items[i], ATTRIBUTE);

            items[i].innerText = data.get(name);
        }
    }
}
