import BaseView from "./BaseView.js";
import rules from "../Templates/rules.js";
import redirect from "../Services/redirect.js";
import Storage from "../Services/Storage.js";


export default class Rules extends BaseView {
    constructor() {
        super();

        this.template = rules;
    }

    onSubmit() {
        Storage.set('rules-were-read', true);

        redirect('new-game');
    }
}
