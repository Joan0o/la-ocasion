import React from "react";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";

import List from "../components/list.js";
import NewItem from "./new-item.js";
import AuthComponent from "./AuthComponent.js";
import { authenticationService } from "../_services/authentication.service.js";
import { Items } from "../_services/item.service.js";

const defaultNofitication = {
  insert: "top",
  container: "top-right",
  animationIn: ["animated", "jackInTheBox"],
  animationOut: ["animated", "bounceOut"],
  dismiss: {
    duration: 2500,
    onScreen: true,
  },
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      list: [],
      currentUser: null,
    };
  }

  logout() {
    authenticationService.logout();
    store.addNotification({
      ...defaultNofitication,
      title: "👋",
      message: `Adios!`,
      type: "info",
    });
  }

  newItemModal() {
    let element = document.getElementById("new-item");
    element && element.classList.toggle("is-active");
  }

  authModal() {
    let element = document.getElementById("auth");
    element && element.classList.toggle("is-active");
  }

  addItem(item) {
    let list = this.state.list.slice();

    list.push(item);
    this.setState({
      list: list,
    });
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
      list: list,
    });
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe((x) =>
      this.setState({ currentUser: x })
    );
    Items.getAll()
      .then((res) => res.json())
      .then((data) => {
        this.setState({ list: data });
      })
      .catch(console.log);
  }

  render() {
    const currentUser = this.state.currentUser;
    return (
      <div className="content">
        {currentUser ? (
          <button
            className="button is-fullwidth is-danger"
            onClick={this.logout}
          >
            Cerrar sesión
          </button>
        ) : (
          <button
            className="button is-fullwidth is-danger"
            onClick={this.authModal}
          >
            Iniciar sesión
          </button>
        )}
        <div className="container">
          <div id="auth" className="modal">
            <div className="modal-background" onClick={this.authModal}></div>
            <div className="modal-content">
              <section className="section">
                <AuthComponent closeModal={this.authModal}></AuthComponent>
              </section>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={this.authModal}
            ></button>
          </div>
          <section className="section">
            <List items={this.state.list} delete={this.removeItem} />
          </section>
          <hr />
          <div id="new-item" className="modal">
            <div className="modal-background" onClick={this.newItemModal}></div>
            <div className="modal-content">
              <section className="section">
                <NewItem
                  addItem={this.addItem}
                  closeModal={this.newItemModal}
                ></NewItem>
              </section>
            </div>
            <button
              className="modal-close is-large"
              aria-label="close"
              onClick={this.newItemModal}
            ></button>
          </div>
          {currentUser && (
            <div id="floating-button" onClick={this.newItemModal}>
              <p className="plus">+</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default HomePage;
