import {useEffect, useMemo, useState} from "react";
import {AJAX} from "../../commonFunctions/AJAX/AJAX.js";
import {BLOCK, DELETE, LOGOUT, UNBLOCK} from "../../commonFunctions/constants.js";
import moment from "moment";

export const useData = () => {
    const [users, setUsers] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false)
    const fetchUsers = () => {
        AJAX({
            url: '',
            method: 'get',
        }).then(res => {
            setUsers(res.data)
        })
            .then(err => console.log(err))
    }
    useEffect(() => {
        fetchUsers()
    }, []);
    const transformedUsers = useMemo(() => {
        return users.map(user => {
            return {
                key: user.id,
                ...user,
                last_login: moment(user.last_login).format('LLL')
            }
        })
    }, [users])

    const handleBlock = () => {
        setLoading(true)
        AJAX({
            method: 'put',
            url: BLOCK,
            data: JSON.stringify(selectedRowKeys)
        }).then(res => {
            res.data.Status === 'Success' ? fetchUsers() : console.log(res.data.Error)
            setLoading(false)
        }).catch((err) => console.log(err))
    }
    const handleUnblock = () => {
        setLoading(true)
        AJAX({
            method: 'put',
            url: UNBLOCK,
            data: JSON.stringify(selectedRowKeys)
        }).then(res => {
            res.data.Status === 'Success' ? fetchUsers() : console.log(res.data.Error)
            setLoading(false)
        }).catch((err) => console.log(err))
    }

    const handleDelete = () => {
        setLoading(true)
        AJAX({
            method: 'delete',
            url: DELETE,
            data: JSON.stringify(selectedRowKeys)
        }).then(res => {
            res.data.Status === 'Success' ? fetchUsers() : console.log(res.data.Error)
            setLoading(false)
        }).catch((err) => console.log(err))
    }
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return {
        users: transformedUsers,
        handleDelete,
        rowSelection,
        handleBlock,
        loading,
        handleUnblock
    }
}