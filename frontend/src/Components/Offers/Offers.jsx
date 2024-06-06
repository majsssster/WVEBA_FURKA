import React from "react";
import "./Offers.css"
import exclucive_image from '../../assets/exclusive_image2.png'

const Offers= ()=> {
    return(
        <div className='offers'>
            <div className="offers-left">
                <h1>Exkluzívne </h1>
                <h1>Ponuky pre teba</h1>
                <p>Len najlepšie produkty </p>
                <button>Klikaj teraz</button>
            </div>
            <div className="offers-right">
                <img src={exclucive_image} alt=""/>
            </div>
        </div>
    )
}

export default Offers