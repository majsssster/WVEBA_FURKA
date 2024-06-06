import React, { useContext } from "react";
import './CartItems.css'
import { ShopContext } from "../Context/ShopContext";
import remove_icon from '../../assets/cross.png'

const CartItems=()=>{
        const {getTotalCartAmount, all_product,cartItems,removeFromCart} = useContext(ShopContext)
    return(
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Produkty</p>
                <p>Nazov</p>
                <p>Cena</p>
                <p>Množstvo</p>
                <p>Celkovo</p>
                <p>Odstraniť</p>
            </div>
            <hr/>
                {all_product.map((e)=>{
                    if(cartItems[e.id]>0)
                        {
                            return <div>
                                        <div className="cartitems-format cartitems-format-main">
                                            <img src={e.image} alt="" className="carticon-product-icon"/>
                                            <p>{e.name}</p>
                                            <p>€{e.new_price}</p>
                                            <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                            <p>€{e.new_price*cartItems[e.id]}</p>
                                            <img className="cartitems-remove-icon" src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt=""></img>
                                        </div>
                                        <hr/> 
                                    </div>
                        }
                        return null;
                })}
                <div className="cartitems-down">
                    <div className="cartitems-total">
                        <h1>Počet položiek v košíku</h1>
                        <div>
                            <div className="cartitems-total-item">
                                <p>Cena celkovo</p>
                                <p>€{getTotalCartAmount()}</p>
                            </div>
                            <hr/>
                            <div className="cartitems-total-item">
                                <p>Poštovné</p>
                                <p>Zadarmo</p>
                            </div>
                            <hr/>
                            <div className="cartitems-total-item">
                                <h3>Celkovo</h3>
                                <h3>€{getTotalCartAmount()}</h3>
                            </div>
                        </div>
                        <div></div>
                        <button>Pokračovať k súhrnu</button>
                    </div>
                </div>
        </div>
    )
}
export default CartItems