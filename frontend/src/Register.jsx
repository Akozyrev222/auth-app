import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    })
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8082/register', values)
            .then(res => {
                if(res.statusText === 'OK'){
                    navigate('/login')
                }
            })
            .then(err => console.log(err))
    }
    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input type="text" placeholder='Enter Name' name='name' className='form-control rounded-0'
                        onChange={e => setValues({...values, name: e.target.value})}/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="Email">
                            <strong>Email</strong>
                        </label>
                        <input type="email" placeholder='Enter Email' name='email' className='form-control rounded-0'
                               onChange={e => setValues({...values, email: e.target.value})}/>/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input type="password" placeholder='Enter Password' name='password' className='form-control rounded-0'
                               onChange={e => setValues({...values, password: e.target.value})}/>/>
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                    <Link to={'/login'} type='submit' className='btn btn-default w-100 rounded-0'>Login</Link>
                </form>
            </div>
        </div>
    )
}
export default Register