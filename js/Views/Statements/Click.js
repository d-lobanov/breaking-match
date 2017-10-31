import BaseStatement from "./BaseStatement.js";

const ATTRIBUTE = 'bm-click';

export default class Click extends BaseStatement {
    inspect(element) {
        let items = element.querySelectorAll(`[${ATTRIBUTE}]`);

        for (let i = 0, name; i < items.length; i++) {
            name = this.moveAttribute(items[i], ATTRIBUTE);

            items[i].onclick = this.view[name].bind(this.view);
        }
    }
}
