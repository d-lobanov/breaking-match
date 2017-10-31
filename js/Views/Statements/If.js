import BaseStatement from "./BaseStatement.js";
import trim from "../../Services/trim.js";

const TAG_NAME = 'bm-if';

export default class If extends BaseStatement {
    inspect(element, data) {
        let items = element.querySelectorAll(`${TAG_NAME}`);

        for (let i = 0; i < items.length; i++) {
            this.process(items[i], data);
        }
    }

    process(element, data) {
        let statement = element.getAttribute('statement');
        const index = trim(statement, '!');

        let result = Boolean(data.get(index));

        if (statement[0] === '!' ? result : !result) {
            element.remove();
        } else {
            element.outerHTML = element.innerHTML;
        }
    }
}
