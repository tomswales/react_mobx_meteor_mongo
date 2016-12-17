import {Meteor} from 'meteor/meteor';
import {autorun} from 'mobx';
import Examples from '../imports/api/examples/examples'

// A class for managing Meteor subscriptions based on observed changes in a state store
export default class ReactiveDataManager {
    // state - a Mobx store instance
    constructor(state) {
        // a map for keeping track of Meteor observers and subscriptions
        this.examplesObserver = {};

        // a Mobx autorun function for fetching data
        let examplesDataManager = autorun(() => {
            let dataManager = this;
            // query an observable in the Mobx store (should trigger the autorun when this changes)
            // create a new Meteor subscription
            let examplesSubscription = Meteor.subscribe("examples", {
                // callback when the Meteor subscription is ready
                onReady: () => {
                    this.examplesObserver = Examples.find().observe(
                        {
                            added: () =>{
                                let refreshedExamples = Examples.find().fetch();
                                state.updateExamples(refreshedExamples);
                            },
                            changed: () => {
                                let refreshedExamples = Examples.find().fetch();
                                state.updateExamples(refreshedExamples);
                            }
                        });
                },
                // callback when Meteor subscription stopped
                onStop: () => {
                    if (this.examplesObserver) {
                        this.examplesObserver.stop();
                    }
                }
            });
        });
    }
}

