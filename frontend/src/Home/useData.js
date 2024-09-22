import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios, {get} from "axios";
import {AJAX} from "../commonFunctions/AJAX/AJAX.js";
import {LOGOUT, VERIFY} from "../commonFunctions/constants.js";
import Cookies from 'js-cookie';

export const useData = () => {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        const token = Cookies.get('token')
        if (token) {
            AJAX({method: 'get', url: VERIFY})
                .then(res => {
                    if (res.data.Status === 'Success') {
                        setAuth(true)
                        setName(res.data.name)
                    } else {
                        navigate('/login')
                        setAuth(false)
                    }
                })
                .then(err => console.log(err))
        }
    }, []);
    const handleLogout = () => {
        AJAX({
            method: 'get',
            url: LOGOUT
        })
            .then(res => {
                location.reload(true)
            }).catch((err) => console.log(err))
    }

    return {
        handleLogout,
        auth,
        name,
    }
}