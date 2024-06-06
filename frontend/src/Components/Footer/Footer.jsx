import React from "react";
import "./Footer.css"
import logo from "../../assets/logo.png";
import fb from "../../assets/Facebook.png";
import instagram from "../../assets/Instagram.png";
import X from "../../assets/X.png"

const Footer =()=>{
    return(
        <div className="footer">
            <div className="footer-logo">
            <img src={logo} alt=""/>
            <p>Lokálná hojnosť</p>
            </div>
            <ul className="footer-links">
                <li>Firma</li>
                <li>Produkty</li>
                <li>O nás</li>
                <li>Kontakt</li>
                <li>FAQ</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={fb} alt=""/>
                </div>
                <div className="footer-icons-container">
                    <img src={instagram} alt="" className="instagram"/>
                </div>
                <div className="footer-icons-container">
                    <img src={X} alt="" className="X"/>
                </div>
            </div>
            <div className="footer-copyright">
                <hr/>
                <p>Copyright @ 2024 - All Right Reserved.</p>
            </div>
        </div>

    )
}
export default Footer