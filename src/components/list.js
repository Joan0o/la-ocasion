import React from 'react';
import Card from './card.js';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            filterText: ""
        }
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.items !== this.state.items;
    }

    handleChange(e) {
        this.setState({
            filterText: e.target.value
        });
    }

    render() {
        const filteredList = this.props.items.filter(
            item => item.toLowerCase().includes(this.state.filterText)
        )

        return (
            <div>
                <input type="text" className="input" placeholder="Search..." onChange={this.handleChange} />
                <div className="cards">
                    <div className="container">
                        <div className="colums is-multiline">
                            <ul>
                                {filteredList.map(item => (
                                    <Card item={item} className="column is-quarter"></Card>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default List;