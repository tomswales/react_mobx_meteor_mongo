import React from 'react';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import Example from './Example/Example.jsx';

const App = observer(class App extends React.Component {
    render() {
        let examples = toJS(this.props.route.state.examples);
        let dependents = toJS(this.props.route.state.dependents);

        let renderExamples;
        renderExamples = examples.map((item) => {
            let itemDependents = dependents.filter((dependent) => {
                return dependent.exampleId == item._id;
            });
            return <Example key={item._id} state={this.props.route.state} item={item} dependents={itemDependents}/>
        });
        if (!this.props.route.state.examplesLoading) {
            return (
                <div>
                    <h2>Test</h2>
                    {renderExamples}
                    <button onClick={this.handleAddClick.bind(this)}>Add example</button>
                </div>
            );
        }
        else {
            return (<div>Loading data...</div>);
        }

    }

    handleAddClick() {
        this.props.route.state.addExample();
    }
});

export default App;