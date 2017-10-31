import BaseStatement from "./BaseStatement.js";

const ATTRIBUTE = 'bm-for';

export default class For extends BaseStatement {
    inspect(element, data) {
        let items = element.querySelectorAll(`[${ATTRIBUTE}]`);

        for (let i = 0; i < items.length; i++) {
            this.process(items[i], data);
        }
    }

    process(element, data) {
        let [index, rows] = this.getIndexes(element);
        let newElements = [];

        const temp = data.get(index);

        rows = data.get(rows);

        for (let i in rows) {
            let clone = element.cloneNode(true);

            data.set(index, rows[i]);

            this.view.doRender(clone);

            newElements.push(clone);
        }

        this.replaceElement(newElements, element);

        if (temp) {
            data.set(index, temp);
        }
    }

    replaceElement(newElements, element) {
        const parent = element.parentElement;

        parent.removeChild(element);

        newElements.map(element => parent.appendChild(element));
    }

    getIndexes(element) {
        const value = this.moveAttribute(element, ATTRIBUTE);
        const match = /(\w+)\s+in\s+(\w+)/g.exec(value);

        return [match[1], match[2]];
    }
}
