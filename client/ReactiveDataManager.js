import {Meteor} from 'meteor/meteor';
import {autorun, toJS} from 'mobx';
import Examples from '../imports/api/examples/examples'
import Dependents from '../imports/api/dependents/dependents'


// A class for managing Meteor subscriptions based on observed changes in a state store
export default class ReactiveDataManager {
    // state - a Mobx store instance
    constructor(state) {
        this.examplesSubscription = null;
        this.dependentsSubscription = null;
        this.examplesObserver = null;
        this.dependentsObserver = null;

        // a Mobx autorun function for fetching data
        let examplesDataManager = autorun(() => {
            // reusable method for updating the state store with fresh data
            let refreshExamples = (state) => {
                let refreshedExamples = Examples.find().fetch();
                state.updateExamples(refreshedExamples);
            };

            if (this.examplesSubscription) {
                this.examplesSubscription.stop();
            }

            if (this.examplesObserver) {
                this.examplesObserver.stop();
            }

            // create a new Meteor subscription
            state.setExamplesLoading (true);
            this.examplesSubscription = Meteor.subscribe("examples", {
                // callback when the Meteor subscription is ready
                onReady: () => {
                    this.examplesObserver = Examples.find().observe({
                        added: () => {
                            refreshExamples(state);
                        },
                        changed: () => {
                            refreshExamples(state);
                        }
                    });
                    state.setExamplesLoading(false);
                }
            });
        });

        let dependentsDataManager = autorun(() => {
            let dependentFilter = toJS(state.dependentFilter);

            // reusable method for updating the state store with fresh data
            let refreshDependents = (state) => {
                let refreshedDependents = Dependents.find().fetch();
                state.updateDependents(refreshedDependents);
            };

            if (this.dependentsSubscription) {
                this.dependentsSubscription.stop();
            }
            if (this.dependentsObserver) {
                this.dependentsObserver.stop();
            }

            // create a new Meteor subscription
            state.setDependentsLoading (true);
            this.dependentsSubscription = Meteor.subscribe("dependents", dependentFilter, {
                // callback when the Meteor subscription is ready
                onReady: () => {
                    this.dependentsObserver = Dependents.find().observe({
                        added: () =>{
                            refreshDependents(state);
                        },
                        changed: () => {
                            refreshDependents(state);
                        }
                    });
                    state.setDependentsLoading (false);
                }
            });
        });
    }
}

