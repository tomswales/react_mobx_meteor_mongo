import {Meteor} from 'meteor/meteor';
import {autorun} from 'mobx';
import Examples from '../imports/api/examples/examples'

// A class for managing Meteor subscriptions based on observed changes in a state store
export default class ReactiveDataManager {
    // state - a Mobx store instance
    constructor(state) {
        // a Mobx autorun function for fetching data
        let examplesDataManager = autorun(() => {
            // variables for keeping track of Meteor observers
            let examplesObserver;

            // reusable method for updating the state store with fresh data
            let refreshExamples = (state) => {
                let refreshedExamples = Examples.find().fetch();
                state.updateExamples(refreshedExamples);
            };

            // create a new Meteor subscription
            let examplesSubscription = Meteor.subscribe("examples", {
                // callback when the Meteor subscription is ready
                onReady: () => {
                    examplesObserver = Examples.find().observe(
                        {
                            added: () =>{
                                refreshExamples(state);
                            },
                            changed: () => {
                                refreshExamples(state);
                            }
                        });
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
    }
}

