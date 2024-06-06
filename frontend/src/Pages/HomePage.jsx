import { onselect } from "react";
import "../Styles/HomePage.css"
import kosik from "../assets/kosik.png"
import Offers from "../Components/Offers/Offers";

const HomePage = ({onselect}) => {
  const handleClick = () => {
    navigate('/fruits');
  };
    return (
      <div>
      <div className="hero">
        <div className="hero-left">
            <ul>
              <h2>Produkty z domácich fariem, polí, lúk a vidiekov.</h2>
              <p>Domáce produkty sú čerstvejšie a obsahujú menej konzervantov a pridaných látok ako produkty z obchodov.</p>
            </ul>
        </div>
        <div className="hero-right">
          <img src={kosik} ></img>
        </div>
      </div>


      <div className="haha">
        <Offers/>
      </div>
      </div>
    );
  };
  
  export default HomePage;