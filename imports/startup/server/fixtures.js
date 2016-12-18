import { Meteor } from 'meteor/meteor';
import Examples from '../../api/examples/examples';
import Dependents from '../../api/dependents/dependents';

// import collections from api

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
    // Check if collection is empty: Collections.find().count() == 0;
    //Define some data
    // Insert all data items into database

    if (Examples.find().count()== 0) {
        let one = Examples.insert({created: new Date(), number: 1, text: "Example 1"}, (result) =>{
            Dependents.insert({created: new Date(), text: "Dependent 1", exampleId: one});
            Dependents.insert({created: new Date(), text: "Dependent 2", exampleId: one});
            Dependents.insert({created: new Date(), text: "Dependent 3", exampleId: one});
        });
        let two = Examples.insert({created: new Date(), number: 2, text: "Example 2"}, (result) =>{
            Dependents.insert({created: new Date(), text: "Dependent 4", exampleId: two});
            Dependents.insert({created: new Date(), text: "Dependent 5", exampleId: two});
            Dependents.insert({created: new Date(), text: "Dependent 6", exampleId: two});
        });
    }
});