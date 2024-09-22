import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AJAX} from "../commonFunctions/AJAX/AJAX.js";
import {LOGIN, REGISTER} from "../commonFunctions/constants.js";
import login from "../Login/Login.jsx";

export const useData = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })
    const [modal, setModal] = useState({visible: false, message: '', header: '', success: false});
    const navigate = useNavigate()

    const onChangeItem = (e, key) => {
        setValues({...values, [key]: e.target.value})

    }
    const handleClose = () => {
        if (modal.success) {
            setModal({...modal, visible: false})
            navigate('/')
        } else {
            setModal({...modal, visible: false})
        }
    };
    const handleShow = () => setModal({...modal, visible: true});

    const handleSubmit = (event) => {
        event.preventDefault()
        AJAX({
                url: `${LOGIN}`,
                method: "post",
                data: values,
            }
        ).then(res => {
            if (res.data.Error) {
                setModal({visible: true, message: res.data.Error, header: 'Error', success: false})
            } else {
                setModal({
                    visible: false,
                    message: '',
                    header: '',
                    success: true
                })
                setTimeout(() => navigate('/'), 5000)

            }
        })
    }
    return {
        values,
        handleSubmit,
        handleClose,
        navigate,
        modal,
        handleShow,
        onChangeItem
    }
}