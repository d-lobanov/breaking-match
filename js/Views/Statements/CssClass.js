import BaseStatement from "./BaseStatement.js";

const ATTRIBUTE = 'bm-class';

export default class CssClass extends BaseStatement {
    inspect(element, data) {
        let items = element.querySelectorAll(`[${ATTRIBUTE}]`);

        for (let i = 0, name; i < items.length; i++) {
            name = this.moveAttribute(items[i], ATTRIBUTE);

            items[i].classList.add(data.get(name));
        }
    }
}
