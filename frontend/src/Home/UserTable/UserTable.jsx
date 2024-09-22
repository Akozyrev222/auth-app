import React from "react";
import {useData} from "./useData.js";
import {Spin, Table} from "antd";
import {DeleteOutlined, LockOutlined, UnlockOutlined} from "@ant-design/icons";

const Home = () => {
    const {
        users,
        handleDelete,
        rowSelection,
        loading,
        handleBlock,
        handleUnblock
    } = useData()
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'id'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'id'
        },
        {
            title: 'Last Login',
            dataIndex: 'last_login',
            key: 'id'
        },
        {
            title: 'Status',
            dataIndex: 'disable',
            key: 'id',
            render: (disable) => <a>{!!disable ? 'Blocked' : 'Active'}</a>,
        },
    ];


    return (
        <div className='container mt-4'>
            <div className='container d-flex gap-2 mb-4'>
                <button onClick={handleBlock} className='btn btn-outline-dark'>
                    Block <LockOutlined/>
                </button>
                <button onClick={handleUnblock} className='btn btn-outline-dark'>
                    <UnlockOutlined/>
                </button>
                <button onClick={handleDelete} className='btn btn-danger '>
                    <DeleteOutlined/>
                </button>
            </div>
            <Spin tip="Loading" spinning={loading} size="large">
                <Table rowSelection={rowSelection} columns={columns} dataSource={users}/>
            </Spin>


        </div>
    )
}
export default Home