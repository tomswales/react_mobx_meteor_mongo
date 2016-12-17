import React from 'react';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import Dependent from './Dependent/Dependent.jsx'

const Example = observer(class Example extends React.Component {
    render() {
        let renderDependents;
        if (this.props.state.showDependentsMap.get(this.props.item._id) == true) {
            renderDependents = this.props.dependents.map((dependent) =>{
                return <Dependent key={dependent._id} text={dependent.text}/>
            });
        }
        return (<div onClick={this.handleItemClick.bind(this, this.props.item._id)}>
            <div><p><strong>{this.props.item.number} - {this.props.item.text}</strong></p></div>
            <div>{renderDependents}</div>
        </div>);
    }

    handleItemClick(_id) {
        this.props.state.addDependentFilterValue(_id);
        // following first click, function is changed to a toggling function
        this.handleItemClick = (_id) => {
            this.props.state.toggleShowDependents(_id);
        }
    }
});

export default Example;