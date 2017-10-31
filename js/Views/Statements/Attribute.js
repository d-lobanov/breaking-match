import BaseStatement from "./BaseStatement.js";

const ATTRIBUTE = 'bm-attr';

export default class Attribute extends BaseStatement {
    inspect(element, data) {
        let items = element.querySelectorAll(`[${ATTRIBUTE}]`);

        for (let i = 0, name, key; i < items.length; i++) {
            [name, key] = this.moveAttribute(items[i], ATTRIBUTE).split(':');

            items[i].setAttribute(name, data.get(key));
        }
    }
}
