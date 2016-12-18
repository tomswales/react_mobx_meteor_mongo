import { Meteor } from 'meteor/meteor';
import Examples from './examples.js'

if (Meteor.isServer) {
    Meteor.methods({
        addExample: function () {
            let exampleCount = Examples.find().count();
            return Examples.insert({created: new Date(), text: ("Example " + (exampleCount + 1)), number: (exampleCount + 1)}, function (error, result) {
                if (error) {
                    throw new Meteor.Error("Insert failed");
                }
                else {
                    return result;
                }
            });
        },
        removeExample: function(_id) {
            check(_id, "String");
            return Examples.remove({_id: _id});
        }
    })
}