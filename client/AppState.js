import {Meteor} from 'meteor/meteor';
import {extendObservable, action, useStrict, toJS, computed} from 'mobx';
import ReactiveDataManager from './ReactiveDataManager'

export default class AppState {
    constructor() {
        // state can only be updated through actions
        useStrict(true);

        /*MOBX STATE*/
        extendObservable(this, {
            examplesLoading: false,
            examples: [],
            // updates examples with fresh data
            updateExamples: action((newExamples) => {
                this.examples = newExamples;
            }),
            setExamplesLoading: action((boolean) => {
                this.examplesLoading = boolean;
            }),
            dependentFilter: [],
            addDependentFilterValue: action((exampleId) => {
                let filterArray = toJS(this.dependentFilter);
                if (!filterArray.includes(exampleId)) {
                    filterArray.push(exampleId);
                    this.dependentFilter= filterArray;
                }
            }),
            dependentsLoading: false,
            dependents: [],
            // updates examples with fresh data
            updateDependents: action((newDependents) => {
                this.dependents = newDependents;
            }),
            setDependentsLoading: action((boolean) => {
                this.dependentsLoading = boolean;
            })
        });

        /*FUNCTIONS TO CALL METEOR METHODS*/
        // calls Meteor to add a new example
        this.addExample = () =>{
            Meteor.call("addExample");
        };

        /*REACTIVE DATA MANAGEMENT*/
        this.dataManager = new ReactiveDataManager(this);
    }
}
