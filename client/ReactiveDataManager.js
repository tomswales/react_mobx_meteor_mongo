import {Meteor} from 'meteor/meteor';
import {autorun, toJS} from 'mobx';
import Examples from '../imports/api/examples/examples'
import Dependents from '../imports/api/dependents/dependents'


// A class for managing Meteor subscriptions based on observed changes in a state store
export default class ReactiveDataManager {
    // state - a Mobx store instance
    constructor(state) {
        //  We want to enforce max of only one subscription and observer at a time for each data manager
        this.examplesSubscription = null;
        this.examplesObserver = null;
        this.dependentsSubscription = null;
        this.dependentsObserver = null;

        // a Mobx autorun function for fetching data
        let examplesDataManager = autorun(() => {
            // reusable method for updating the state store with fresh data
            let refreshExamples = (state) => {
                let refreshedExamples = Examples.find().fetch();
                state.updateExamples(refreshedExamples);
            };

            // If a current subscription exists, it is now invalidated by the mobx autorun, so stop it
            if (this.examplesSubscription) {
                this.examplesSubscription.stop();
            }
            // same with the observer for the subscription
            if (this.examplesObserver) {
                this.examplesObserver.stop();
            }

            // create a new Meteor subscription
            state.setExamplesLoading (true);
            this.examplesSubscription = Meteor.subscribe("examples", {
                // callback when the Meteor subscription is ready
                onReady: () => {
                    // create a Meteor observer to watch the subscription for changes and update data when they occur
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

            // If a current subscription exists, it is now invalidated by the mobx autorun, so stop it
            if (this.dependentsSubscription) {
                this.dependentsSubscription.stop();
            }
            // same with the observer for the subscription
            if (this.dependentsObserver) {
                this.dependentsObserver.stop();
            }

            // create a new Meteor subscription, but only if there are some filter values
            if (dependentFilter.length > 0) {
                this.dependentsSubscription = Meteor.subscribe("dependents", dependentFilter, {
                    // callback when the Meteor subscription is ready
                    onReady: () => {
                        // create a Meteor observer to watch the subscription for changes and update data when they occur
                        this.dependentsObserver = Dependents.find().observe({
                            added: () =>{
                                refreshDependents(state);
                            },
                            changed: () => {
                                refreshDependents(state);
                            }
                        });
                    }
                });
            }
        });
    }
}

