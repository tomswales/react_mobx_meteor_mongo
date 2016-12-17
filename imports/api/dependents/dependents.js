import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

export default Dependents = new Mongo.Collection('dependents');

Dependents.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

Dependents.schema = new SimpleSchema({

    created: {
        type: Date,
        optional: false
    },
    exampleId: {
        type: String,
        optional: false
    },
    text: {
        type: String,
        optional: true
    }
});