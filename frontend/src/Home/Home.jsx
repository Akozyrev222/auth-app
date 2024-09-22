import React from "react";
import UserTable from "./UserTable/UserTable.jsx";
import {useData} from "./useData.js";


const Home = () => {
    const {auth, handleLogout, name} = useData()
    return (
        <div className='container mt-4'>
            <div className='container d-flex flex-row justify-content-between'>
                <h3>You are authorized {name}</h3>
                <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
            </div>
            {auth && <UserTable/>}
        </div>
    )
}
export default Home