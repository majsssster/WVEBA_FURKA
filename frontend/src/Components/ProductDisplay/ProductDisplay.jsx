import React, { useContext } from "react";
import "./ProductDisplay.css"
import { ShopContext } from "../Context/ShopContext";

const ProductDisplay = (props) =>{
    const{product}= props;
    const {addToCart} = useContext(ShopContext);

    return(
        <div className="productdisplay">
                <img className="productdisplay-main-img" src={product.image} alt=""/>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
            
            <div className="productdisplay-right-prices">
                <div className="productdisplay-right-price-new">€{product.old_price}</div>
                <div className="productdisplay-right-price-old">€{product.new_price}</div>
            </div>
            <div className="productdispla-right-description">
                Tieto produkty su najlepsie na svete. Verte mi spoluobčania. Za slávu demácie. 
            </div>
            {/* <button onClick={()=>{addToCart(product.id)}}>DO KOŠÍKA</button> */}
            
            <div className="add-to-cart">
                {localStorage.getItem('auth-token') ? (
                    <button onClick={() => addToCart(product.id)}>
                        DO KOŠÍKA
                        </button>
                ) : (
                    <button onClick={() => window.location.replace('/')} disabled>
                        Chcete nakupovať? Je potrebné prihlásenie!
                </button>
                )}
            </div>
        </div>
        </div>
    )
}
export default ProductDisplay;
