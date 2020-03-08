import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/list.js'

require('./mystyles.scss');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    fetch('/items')
    .then(res => res.json())
    .then((data) => {
      this.setState({ list: data.map(d => d.name)})
    })
    .catch(console.log)
  }

  addItem(e) {
    e.preventDefault();

    let list = this.state.list;
    const newItem = document.getElementById("addInput");
    const form = document.getElementById("addItemForm");

    if (newItem.value != "") {
      list.push(newItem.value);
      this.setState({
        list: list
      });
      newItem.classList.remove("is-danger");
      form.reset();
    } else {
      newItem.classList.add("is-danger");
    }
  }

  removeItem(item) {
    const list = this.state.list.slice();
    list.some((el, i) => {
      if (el === item) {
        list.splice(i, 1);
        return true;
      }
    });
    this.setState({
      list: list
    });
  }

  render() {
    return (
      <div className="content">
        <div className="container">
          <section className="section">
            <List items={this.state.list} delete={this.removeItem} />
          </section>
          <hr />
          <section className="section">
            <form className="form" id="addItemForm">
              <div className="field has-addons">
                <div className="control">
                  <input className="input" type="text" id="addInput" placeholder="Something to do..." />
                </div>
                <div className="control">
                  <a className="button is-info" onClick={this.addItem}>
                    Add
                  </a>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('root'));