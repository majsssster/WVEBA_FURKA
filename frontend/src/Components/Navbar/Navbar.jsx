import  React, { useContext, useState } from "react";
import "./Navbar.css"
import { Link } from "react-router-dom"
import { useRef } from "react";

import icon from "../../assets/cart-icon.png";
import logo from "../../assets/logo.png";
import { ShopContext } from "../Context/ShopContext";
import nav_dropdown from "../../assets/nav_dropdown.png"

const Navbar = ({onSelect}) =>{
  const [menu,setMenu] = useState("products")
  const {getTotalCartItems}= useContext(ShopContext)
  const menuRef= useRef();

  const dropdown_toggle = (e)=>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

    return(
    <div className="navbar">
          <div className="nav-logo">
            <img className="logo" src={logo}></img>
            <p>Lokálna hojnosť</p>
          </div>
          <img className="nav-dropdown" onClick={dropdown_toggle}  src={nav_dropdown} alt=""/> 
          <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("products")}}><Link style={{textDecoration: 'none'}} to='/'>Produkty</Link>{menu==="products"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("fruits")}}><Link style={{textDecoration: 'none'}} to='/fruits'>Ovocie</Link>{menu==="fruits"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("vegie")}}><Link style={{textDecoration: 'none'}} to='/vegie'>Zelenina</Link>{menu==="vegie"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("animals")}}><Link style={{textDecoration: 'none'}} to='animals'>Živočíšne</Link>{menu==="animals"?<hr/>:<></>}</li>
        </ul>
            <div className="nav-login-cart">
              {localStorage.getItem('auth-token')
              ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:
              <Link to='login'> <button onSelect={() => onSelect("login")}> Prihlásenie</button></Link>}
            <Link to='cart'><img  className="cart"src={icon} onSelect={()=> onSelect("cart")} alt=""  ></img></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
          </div>
    </div>
)
}
export default Navbar;


