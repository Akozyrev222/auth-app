import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useData} from "./useData.js";
import {CustomModal} from "../components/CustomModal.jsx";

const Login = () => {
    const {modal, handleClose, handleSubmit, values, onChangeItem} = useData()
    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-In</h2>
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
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
                    <Link to={'/register'} type='submit' className='btn btn-default w-100 rounded-0'>Create
                        Account</Link>
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
export default Login