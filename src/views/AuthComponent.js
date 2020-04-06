import React from "react";
import { useForm } from "react-hook-form";
import { store } from "react-notifications-component";

import { authenticationService } from "../_services/authentication.service.js";

const defaultNotification = {
  insert: "top",
  container: "top-right",
  animationIn: ["animated", "jackInTheBox"],
  animationOut: ["animated", "bounceOut"],
  dismiss: {
    duration: 3000,
    onScreen: true,
  },
};

export default function form(props) {
  const { register, handleSubmit, errors } = useForm();

  let options = {};

  const formButton = document.querySelector("form #login");

  const onSubmit = (data) => {
    formButton && formButton.classList.toggle("is-loading");
    authenticationService
      .login(JSON.stringify(data))
      .then((res) => {
        props.closeModal();
        let displayName = authenticationService.currentUserValue.displayName
          ? authenticationService.currentUserValue.displayName
          : "";
        options = {
          ...defaultNotification,
          title: "👋",
          message: `Hola! ${displayName}`,
          type: "success",
        };
        document.getElementById("authForm").reset();
      })
      .catch((err) => {
        options = {
          ...defaultNotification,
          title: "😭",
          message: `Verifica los datos que ingresaste`,
          type: "info",
        };
        console.log(err);
      })
      .finally(() => {
        store.addNotification(options);
        formButton && formButton.classList.toggle("is-loading");
      });
  };

  return (
    <div className="card">
      <div className="card-header">
        <p className="card-header-title">Iniciar Sesion</p>
      </div>
      <div className="card-content">
        <form onSubmit={handleSubmit(onSubmit)} id="authForm">
          <div className="field">
            <label className="label">Correo</label>
            <div className="control">
              <input
                name="email"
                className="input"
                type="email"
                placeholder="Nombre del producto"
                ref={register({ required: true })}
              />
            </div>
            {errors.email && (
              <span className="help is-danger">Este campo es obligatorio</span>
            )}
          </div>
          <div className="field">
            <label className="label">Contraseña</label>
            <div className="control">
              <input
                name="pass"
                className="input"
                type="password"
                placeholder="Contraseña"
                ref={register({ required: true, min: 5 })}
              />
            </div>
            {errors.pass && (
              <span className="help is-danger">Este campo es obligatorio</span>
            )}
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button id="login" className="button is-link">
                Continuar
              </button>
            </div>
            <div className="control">
              <button
                className="button is-link is-light"
                onClick={(e) => {
                  props.closeModal();
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
