import React from 'react';

export default class NotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <p>
                Whoops! We couldn't find the page you are looking for!
            </p>
        );
    }
}