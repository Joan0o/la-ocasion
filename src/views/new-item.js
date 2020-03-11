import React from 'react'
import { useForm } from 'react-hook-form'

export default function form(props) {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        fetch('/items',
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then((data) => {
                props.addItem(data)
                props.closeModal()
            })
            .catch(console.log)
    }

    return (
        <div className="card">
            <div className="card-header">
                <p className="card-header-title">Registrar un producto</p>
            </div>
            <div className="card-content">
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        {errors.name && <span className="help is-danger">Este campo es obligatorio</span>}
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
                                defaultValue="" />
                        </div>
                        {errors.price && <span className="help is-danger">Este campo es obligatorio</span>}
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
                                placeholder="Marca del producto" />
                        </div>
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