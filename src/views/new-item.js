import React from "react";
import { useForm } from "react-hook-form";
import { store } from "react-notifications-component";
import { Items } from "../_services/item.service";

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

export default function form(props) {
  const { register, handleSubmit, errors } = useForm();
  const formButton = document.querySelector("form #login");
  
  const onSubmit = (data) => {
    formButton && formButton.classList.toggle("is-loading");
    Items.newItem(data)
      .then((data) => {
        props.addItem(data);
        document.getElementById("newItemForm").reset();
        props.closeModal();
        store.addNotification({
          ...defaultNofitication,
          title: "👏",
          message: `Producto registrado`,
          type: "info",
        });
      })
      .catch(console.log)
      .finally(() => {
        formButton && formButton.classList.toggle("is-loading");
      });
  };

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Registrar un producto</p>
      </div>
      <div className="card-content">
        <form id="newItemForm" onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Nombre *</label>
            <div className="control">
              <input
                name="name"
                className="input"
                type="text"
                placeholder="Nombre del producto"
                ref={register({ required: true })}
              />
            </div>
            {errors.name && (
              <span className="help is-danger">Este campo es obligatorio</span>
            )}
          </div>
          <div className="field">
            <label className="label">Precio *</label>
            <div className="control">
              <input
                name="price"
                className="input"
                type="number"
                placeholder="Text input"
                ref={register({ required: true })}
                defaultValue=""
              />
            </div>
            {errors.price && (
              <span className="help is-danger">Este campo es obligatorio</span>
            )}
          </div>
          <div className="field">
            <label className="label">Marca</label>
            <div className="control">
              <input
                name="brand"
                className="input"
                type="text"
                placeholder="Text input"
                ref={register()}
                placeholder="Marca del producto"
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Guardar</button>
            </div>
            <div className="control">
              <button
                className="button is-link is-light"
                onClick={(e) => {
                  props.closeModal;
                  e.preventDefault();
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
