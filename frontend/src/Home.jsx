import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Home = ()=> {
    const [auth, setAuth] = useState(false)
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')

    const navigate = useNavigate()
    useEffect(() => {
        axios.get('http://localhost:8082/')
            .then(res => {
                if(res.data.Status === 'Success'){
                    setName(res.data.name)
                    setAuth(true)
                }else {
                    setAuth(false)
                    setMessage(res.data.Error)
                }
            })
            .then(err => console.log(err))
    }, []);

    const handleDelete = () => {
        axios.get('http://localhost:8082/logout')
            .then(res => {
                location.reload(true)
            }).catch((err) => console.log(err))
    }

    return(
        <div className='container mt-4'>
            {
                auth? <div>
                    <h3>You are authorized {name}</h3>
                    <button onClick={handleDelete} className='btn btn-danger'>Logout</button>
                </div>
                    :
                    <div>
                        <h3>{message}</h3>
                        <Link to='/login' className='btn btn-primary'>Login</Link>
                    </div>
            }
        </div>
    )
}
export default Home