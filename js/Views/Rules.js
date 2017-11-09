import BaseView from "./BaseView.js";
import rules from "../Templates/rules.js";
import redirect from "../Services/redirect.js";
import RuleModel from "../Storages/Rules.js";


export default class Rules extends BaseView {
    template() {
        return rules;
    }

    onSubmit() {
        RuleModel.markAsRead();

        redirect('new-game');
    }
}
