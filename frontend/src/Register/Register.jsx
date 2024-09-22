import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useData} from "./useData.js";
import {CustomModal} from "../components/CustomModal.jsx";

const Register = () => {
    const {
        handleClose,
        handleSubmit,
        values,
        modal,
        onChangeItem
    } = useData()

    return (
        <div className='d-flex justify-content-center align-items-center bg-body-tertiary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    {Object.entries(values).map(([key]) => <div key={key} className='mb-3'>
                        <label htmlFor={key}>
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong>
                        </label>
                        <input type={key === 'name' ? 'text' : key}
                               placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                               name={key} className='form-control rounded-0'
                               onChange={e => onChangeItem(e, key)}/>
                    </div>)}
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                    <Link to={'/login'} type='submit' className='btn btn-default w-100 rounded-0'>Login</Link>
                </form>
            </div>
            <CustomModal
                show={modal.visible}
                text={modal.message}
                header={modal.header}
                success={modal.success}
                handleClose={handleClose}
            />
        </div>
    )
}
export default Register