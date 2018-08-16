import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import JSON from './data.json';

// COMPONENTS
import Header from './components/header';
import DataList from './components/data_list';

class App extends Component {

    state = {
        data: JSON,
        filtered: [],
        keywords: ""
    }

    filtered = []

    getKeyword = (event) => {

        let keywords = event.target.value;

        this.setState({
            keywords
        });

    }

    traverseObject = (node) => {
        if(typeof node === "object") {
            Object.entries(node).forEach(([key, value]) => {

                let keywords = this.state.keywords;
                
                if(value === keywords) {
                    console.log(node);
                    this.filtered.push(node);
                }

                if(keywords.indexOf('.') === 0) {
                    keywords = keywords.slice(1);

                    if(node.classNames && node.classNames.includes(keywords)) {
                        console.log(node);
                        this.filtered.push(node);
                    }
                }

                if(keywords.indexOf('#') === 0) {
                    keywords = keywords.slice(1);

                    if(node.identifier && node.identifier.includes(keywords)) {
                        console.log(node);
                        this.filtered.push(node);
                    }
                }

                this.traverseObject(value);
                
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.filtered === prevState.filtered && this.filtered !== []) {
            this.setState({
                filtered: this.filtered
            });
            this.filtered = [];
        }
    }


    render () {

        let dataFiltered = this.state.filtered;
        let dataWhole = this.state.data;

        this.traverseObject(this.state.data);
        
        return (
            <div>
                <Header keywords={this.getKeyword}/>
                <DataList data={dataFiltered === 0 ? dataWhole : dataFiltered}>
                    <h3>
                        The data:
                    </h3>
                </DataList>
            </div>
        )
    }
}


ReactDOM.render(<App/>, document.querySelector('#root'));