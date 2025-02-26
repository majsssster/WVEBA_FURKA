import React, { useContext } from "react";
import "../Styles/ShopCategory.css"
import { ShopContext } from "../Components/Context/ShopContext";
import dropdown_icon from "../assets/dropdown_icon.png";
import Item from "../Components/Item/Item"


const ShopCategory= (props) =>{
    const {all_product}= useContext(ShopContext)
    return(
        <div className="shop-category">
            <img className="shopcategory-banner" src={props.banner} alt=""/>
            <div className="shopcategory-indexSort">
                <p>
                    <span> Zobrazených 1-4</span> z 4 produktov
                </p>
                {/* <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon}/> 
                </div> */}
            </div>
            <div className="shopcategory-products">
                {all_product.map((item,i)=>{
                    if (props.category===item.category){
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    }
                    else{
                        return null;
                    }
                })}
            </div>
            <div>
                {/* <div className="shopcategory-loadmore">
                    Objav dalsie
                </div> */}
            </div>
        </div>
    )
}

export default ShopCategory