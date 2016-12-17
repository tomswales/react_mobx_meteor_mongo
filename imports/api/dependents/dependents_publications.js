import { Meteor } from 'meteor/meteor';
import {check} from 'meteor/check';
import Dependents from './dependents.js';

if (Meteor.isServer) {
    Meteor.publish('dependents', (dependentFilter) => {
        check(dependentFilter, [String]);
        return Dependents.find({exampleId: {$in: dependentFilter}}, {sort: {created: 1}});
    });
}