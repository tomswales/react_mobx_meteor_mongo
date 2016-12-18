import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Meteor } from 'meteor/meteor';

export default Examples = new Mongo.Collection('examples');

Examples.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

Examples.schema = new SimpleSchema({

    created: {
        type: Date,
        optional: false
    },
    number: {
        type: Number,
        optional: false
    },
    text: {
        type: String,
        optional: true
    }
});