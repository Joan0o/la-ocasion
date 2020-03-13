import React from 'react'
import { useForm } from 'react-hook-form'

export default function form(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        fetch('https://us-central1-papeleria-ba86e.cloudfunctions.net/api/login',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                props.addItem(data)
                props.closeModal()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="card">
            <div className="card-header">
                <p className="card-header-title">Iniciar Sesion</p>
            </div>
            <div className="card-content">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        {errors.email && <span className="help is-danger">Este campo es obligatorio</span>}
                    </div>
                    <div className="field">
                        <label className="label">Contraseña</label>
                        <div className="control">
                            <input
                                name="pass"
                                className="input"
                                type="password"
                                placeholder="Contraseña"
                                ref={register({ required: true, min: 5 })}/>
                        </div>
                        {errors.pass && <span className="help is-danger">Este campo es obligatorio</span>}
                    </div>
                    
                    <div className="field is-grouped">
                        <div className="control">
                            <button className="button is-link">Guardar</button>
                        </div>
                        <div className="control">
                            <button className="button is-link is-light" onClick={props.closeModal}>Cancelar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}