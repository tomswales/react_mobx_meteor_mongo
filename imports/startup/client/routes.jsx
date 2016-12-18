import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Router, Route, browserHistory } from 'react-router';

// route components
import App from '../../ui/components/App.jsx';
import NotFound from '../../ui/components/NotFound.jsx';

// Route to home page - will render login page or redirect to dashboard overview if logged in


const renderRoutes = (state) => {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={App} state={state}/>
        </Router>
    )
};

export default renderRoutes;