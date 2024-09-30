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
                console.log(res.data.user)
                if (res.data.user) {
                    setAuth(true)
                    setName(res.data.user)
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
                location.reload(true)
            }).catch((err) => console.log(err))
    }

    return {
        handleLogout,
        auth,
        name,
    }
}