import React from "react";
import "./Admin.css";
import Sidebar from '../../Components/Sidebar/Sidebar';
import {Routes,Route} from 'react-router-dom';
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import AddUser from "../../Components/AddUser/AddUser";
import ListUser from "../../Components/ListUser/ListUser";

const Admin = () =>{
    return(
        <div className="admin">
            <Sidebar/>
            <Routes>
                <Route path='/addproduct' element={<AddProduct/>}></Route>
                <Route path="/listproduct" element={<ListProduct/>}></Route>
                <Route path="/adduser" element={<AddUser/>}></Route>
                <Route path="/listuser"element={<ListUser/>}></Route>
            </Routes>
        </div>
    )
}

export default Admin