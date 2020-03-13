import React from 'react'

class ItemBox extends React.Component {
    render() {
        return (
            <div className="box item-container">
                <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                <div>
                    <p> {this.props.item.name} </p>
                    <p> ${this.props.item.price}</p>
                </div>
            </div>
        );
    }
}

export default ItemBox