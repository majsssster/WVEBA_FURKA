import React from "react";
import "./Sidebar.css"
import {Link} from 'react-router-dom';
import add_product_icon from '../../assets/add_product_icon.png'
import list_product_icon from '../../assets/list_product_icon.png'
import add_user_icon from '../../assets/add-user_icon.png'
import list_user_icon from '../../assets/team.png'

const Sidebar = ()=>{
    return(
        <div className="sidebar">
            <Link to={'/addproduct'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src={add_product_icon} alt="" />
                    <p>Pridaj produkt</p>
                </div>
            </Link>
            <Link to={'/listproduct'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src={list_product_icon} alt="" />
                    <p>Zoznam produktov</p>
                </div>
            </Link>
            <Link to={'/adduser'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src={add_user_icon} alt="" />
                    <p>Pridaj uživateľa</p>
                </div>
            </Link>
            <Link to={'/listuser'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src={list_user_icon} alt="" />
                    <p>Zoznam používateľov</p>
                </div>
            </Link>
        </div>
    )
}
export default Sidebar