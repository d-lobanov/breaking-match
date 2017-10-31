export default class BaseStatement {
    constructor(view) {
        this.view = view;
    }

    /**
     * Get and remove attribute from element.
     *
     * @param element
     * @param attribute
     */
    moveAttribute(element, attribute) {
        let item = element.attributes.getNamedItem(attribute);

        if (item) {
            element.attributes.removeNamedItem(attribute);

            return item.value;
        }

        return null;
    }
}
