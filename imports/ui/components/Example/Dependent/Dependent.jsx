import React from 'react';
import {observer} from 'mobx-react';

const Dependent = observer(class Dependent extends React.Component {
    render() {
        return <div><p>- {this.props.text}</p></div>
    }
});

export default Dependent;