import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Home/Home.jsx";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/register' element={<Register/>}></Route>
                <Route path='/login' element={<Login/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
