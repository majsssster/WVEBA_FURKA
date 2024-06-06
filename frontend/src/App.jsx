import { Fragment,useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar';
import HomePage from './Pages/HomePage';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import fruit_banner from "./assets/banner_fruits.png";
import vegie_banner from "./assets/Mrkva.png";
import animal_banner from "./assets/banner_animal.png";
import ShopCategory from './Pages/ShopCategory';
import Footer from './Components/Footer/Footer';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/fruits' element={<ShopCategory banner={fruit_banner}category="fruits"/>}/>
        <Route path='/vegie' element={<ShopCategory banner={vegie_banner} category="vegie"/>}/>
        <Route path='/animals' element={<ShopCategory banner={animal_banner} category="animals"/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path='product/:productId' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  )




    // const [pagePositon, setPagePosition] = useState(0);

    // const handleSelect = (selectedValue) => {
    //   if (selectedValue === "home") {
    //     setPagePosition(0);
    //     }
    //   if (selectedValue === "products") {
    //     setPagePosition(1);
    //     }
    //   if (selectedValue === "vegie") {
    //     setPagePosition(2);
    //     }
    //   if (selectedValue === "fruits") {
    //     setPagePosition(3);
    //     }
    //   if (selectedValue === "animals") {
    //     setPagePosition(4);
    //     }
    //   if (selectedValue === "login") {
    //     setPagePosition(5);
    //     }
    //   if (selectedValue === "cart") {
    //       setPagePosition(6);
    //     }
    // };
  
    // const pages = [
    //   <HomePage key={0} onselect={handleSelect} />,
    //   <Products key={1} onSelect={handleSelect}/>,
    //   <Vegie key={2} onselect={handleSelect} element={<ShopCategory banner={fruit_banner} category="vegie"/>} />,
    //   <Fruits key={3} onSelect={handleSelect} element={<ShopCategory banner={vegie_banner}category="fruits"/>}  />,
    //   <Animal key={4} onSelect={handleSelect}  element={<ShopCategory banner={animal_banner} category="animals"/>}/>,
    //   <LoginSignup key={5} onSelect={handleSelect}/>,
    //   <Cart key={6} onSelect={handleSelect}/>,
    // ];
  
    // let content = pages[pagePositon];
    // return (
    //   <Fragment>
    //     <Navbar onSelect={handleSelect} />
    //     <ShopCategory/>
    //     <div className='hero'>{content}</div>
    //     <Footer/>
    //   </Fragment>
      
    // );
  }
  
  export default App;