import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AJAX} from "../commonFunctions/AJAX/AJAX.js";
import {LOGOUT, VERIFY} from "../commonFunctions/constants.js";

export const useData = () => {
    const [auth, setAuth] = useState(false)
    const [name, setName] = useState('')
    const navigate = useNavigate()


    useEffect(() => {
        AJAX({method: 'get', url: VERIFY})
            .then(res => {
                if (res.data.token) {
                    setAuth(true)
                    setName(res.data.name)
                    navigate('/')
                } else {
                    navigate('/login')
                    setAuth(false)
                }
            })
            .then(err => console.log(err))
    }, []);
    const handleLogout = () => {
        AJAX({
            method: 'get',
            url: LOGOUT
        })
            .then(res => {
                navigate('/login')
                location.reload(true)
            }).catch((err) => console.log(err))
    }

    return {
        handleLogout,
        auth,
        name,
    }
}