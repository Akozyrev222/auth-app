import {useEffect, useMemo, useState} from "react";
import {AJAX} from "../../commonFunctions/AJAX/AJAX.js";
import {BLOCK, DELETE, LOGOUT, UNBLOCK} from "../../commonFunctions/constants.js";
import moment from "moment";

export const useData = () => {
    const [users, setUsers] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false)
    const handleLogout = () => {
        AJAX({
            method: 'get',
            url: LOGOUT
        })
            .then(res => {
                location.reload(true)
            }).catch((err) => console.log(err))
    }
    const fetchUsers = () => {
        AJAX({
            url: '',
            method: 'get',
        }).then(res => {
            res.data.Status === 'Success' ?
                setUsers(res.data.users) : handleLogout()
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

    const handleBlock = async () => {
        setLoading(true)
        const response = await AJAX({
            method: 'put',
            url: BLOCK,
            data: {blockedUsersId: selectedRowKeys}
        })
        response.data.Status === 'Success' ? fetchUsers() : handleLogout()
        setLoading(false)
        /*.then(res => {
            res.data.Status === 'Success' ? fetchUsers() : console.log(res.data.Error)
            setLoading(false)
            res.data.Status === 'Error'?
        }).catch((err) => console.log(err))*/
    }
    const handleUnblock = () => {
        setLoading(true)
        AJAX({
            method: 'put',
            url: UNBLOCK,
            data: {unblockedUsersId: selectedRowKeys}
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
            data: {deleteUsersId: selectedRowKeys}
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