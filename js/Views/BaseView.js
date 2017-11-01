import ForStatement from "./Statements/For.js";
import IfStatement from "./Statements/If.js";
import ValueStatement from "./Statements/Value.js";
import BindValueStatement from "./Statements/BindValue.js";
import ClickStatement from "./Statements/Click.js";
import Data from "../Model/Data.js";
import Attribute from "./Statements/Attribute.js";
import CssClass from "./Statements/CssClass.js";

export default class BaseView {
    constructor(data) {
        this.template = '';

        this.data = new Data(data);

        this.element = null;

        this.for = new ForStatement(this);
        this.if = new IfStatement(this);
        this.bindValue = new BindValueStatement(this);
        this.value = new ValueStatement(this);
        this.attr = new Attribute(this);
        this.click = new ClickStatement(this);
        this.class = new CssClass(this);
    }

    render() {
        let element = document.createElement('div');

        element.innerHTML = this.template.trim();

        this.element = element;

        return this.doRender(element);
    }

    doRender(element) {
        this.for.inspect(element, this.data);
        this.if.inspect(element, this.data);
        this.bindValue.inspect(element, this.data);
        this.value.inspect(element, this.data);
        this.attr.inspect(element, this.data);
        this.click.inspect(element, this.data);
        this.class.inspect(element, this.data);

        return element;
    }
}
