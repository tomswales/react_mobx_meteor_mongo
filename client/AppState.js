import {extendObservable, action} from 'mobx';
import ReactiveDataManager from './ReactiveDataManager'

export default class AppState {
    constructor() {
        extendObservable(this, {
            text: "Test",
            examples: [],
            updateExamples: action((newExamples) => {
                this.examples = newExamples;
            }),
            addExample: action(()=>{
                Meteor.call("addExample");
            })
        });
        this.dataManager = new ReactiveDataManager(this);
    }
}
