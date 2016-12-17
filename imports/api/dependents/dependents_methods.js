import { Meteor } from 'meteor/meteor';
import Dependents from './dependents.js'

if (Meteor.isServer) {
    Meteor.methods({
        addDependent: function (text, exampleId) {
            return Dependents.insert({created: new Date(), text: text, exampleId: exampleId}, function (error, result) {
                if (error) {
                    throw new Meteor.Error("Insert failed");
                }
                else {
                    return result;
                }
            });
        }
    })
}