// put in rate limiter

import { Meteor } from 'meteor/meteor';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

// Don't let people write arbitrary data to their 'profile' field from the client
Meteor.users.deny({
    update() {
        return true;
    }
});

if (Meteor.isServer) {
    // Only allow 2 login attempts per connection per 5 seconds
    
}
