import {Meteor} from 'meteor/meteor';
import {autorun, toJS} from 'mobx';
import Examples from '../imports/api/examples/examples'
import Dependents from '../imports/api/dependents/dependents'


// A class for managing Meteor subscriptions based on observed changes in a state store
export default class ReactiveDataManager {
    // state - a Mobx store instance
    constructor(state) {
        // a Mobx autorun function for fetching data
        let examplesDataManager = autorun(() => {
            // variable for keeping track of Meteor observer
            let examplesObserver;

            // reusable method for updating the state store with fresh data
            let refreshExamples = (state) => {
                let refreshedExamples = Examples.find().fetch();
                state.updateExamples(refreshedExamples);
            };

            // create a new Meteor subscription
            state.setExamplesLoading (true);
            let examplesSubscription = Meteor.subscribe("examples", {
                // callback when the Meteor subscription is ready
                onReady: () => {
                    examplesObserver = Examples.find().observe({
                            added: () =>{
                                refreshExamples(state);
                            },
                            changed: () => {
                                refreshExamples(state);
                            }
                    });
                    state.setExamplesLoading (false);
                },
                // callback when Meteor subscription stopped
                onStop: () => {
                    if (examplesObserver) {
                        // if subscription stops, also stop the observer of the results
                        examplesObserver.stop();
                    }
                }
            });
        });

        let dependentsDataManager = autorun(() => {
            // variable for keeping track of Meteor observer
            let dependentsObserver;

            let dependentFilter = toJS(state.dependentFilter);

            // reusable method for updating the state store with fresh data
            let refreshDependents = (state) => {
                let refreshedDependents = Dependents.find().fetch();
                state.updateDependents(refreshedDependents);
            };

            // create a new Meteor subscription
            state.setDependentsLoading (true);
            let dependentsSubscription = Meteor.subscribe("dependents", dependentFilter, {
                // callback when the Meteor subscription is ready
                onReady: () => {
                    dependentsObserver = Dependents.find().observe({
                        added: () =>{
                            refreshDependents(state);
                        },
                        changed: () => {
                            refreshDependents(state);
                        }
                    });
                    state.setDependentsLoading (false);
                },
                // callback when Meteor subscription stopped
                onStop: () => {
                    if (dependentsObserver) {
                        // if subscription stops, also stop the observer of the results
                        dependentsObserver.stop();
                        console.log("subscription stopped");
                    }
                }
            });
        });
    }
}

