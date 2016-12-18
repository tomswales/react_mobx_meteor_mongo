import { Meteor } from 'meteor/meteor';
import Examples from './examples.js';

if (Meteor.isServer) {
    Meteor.publish('examples', () => {
        return Examples.find({}, {sort: {created: 1}});
    });
}