import BaseStatement from "./BaseStatement.js";

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

        let result = !!data.get(statement.replace(/^!/, ''));

        if (statement[0] === '!' ? result : !result) {
            element.remove();
        } else {
            element.outerHTML = element.innerHTML;
        }
    }
}
