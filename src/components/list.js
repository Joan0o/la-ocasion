import React from 'react';
import ItemBox from './item-box.js';

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
            item => item.name.toLowerCase().includes(this.state.filterText)
        )

        return (
            <div>
                <input type="text" className="input" placeholder="Search..." onChange={this.handleChange} />
                <div className="cards">
                    <div className="container">
                        <div className="columns is-multiline is-mobile">
                            {filteredList.map((item, index)=> (
                                <div key={item.id} className="column is-6">
                                    <ItemBox  item={item}>></ItemBox>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default List;