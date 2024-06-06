import React, { useEffect, useState } from "react";
import "./ListProduct.css"
import  cross_icon from '../../assets/cross.png'
import edit_icon from '../../assets/editing.png'
import EditableRow2 from "../EditableRow/EditableRow2";

const ListProduct = ()=>{
    const [allproducts, setAllProducts] = useState([]);
    const fetchInfo = async ()=>{
        await fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
        fetchInfo();

    },[])

    async function editProduct(productId, newName, newImage, newCategory, newNewPrice, newOldPrice){
        try {
            const response = await fetch(`http://localhost:4000/editproduct/${productId}`,{
                method: 'PUT',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({name: newName, image: newImage, category: newCategory,new_price: newNewPrice, old_price: newOldPrice })
            })
            
            const data = await response.json();
            

            if(data.success){
                console.log('Update uspesny')
            }else{
                console.error('Error updating product:', data.message);
            }
        } catch (error) {
            console.error('Error editing product:', error);
        }
        fetchInfo();
    }
    


    const remove_product = async(id)=>{
        await fetch('http://localhost:4000/removeproduct/' +id,{
            method:'DELETE',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
        })
        alert("Removed");
        await fetchInfo();
    }

    return(
        <div className="list-product">
            <h1>Zoznam vsetkych produktov</h1>
            <div className="listproduct-format-main">
                <p>Produkty</p>
                <p>Názov</p>
                <p>Stará cena</p>
                <p>Nová cena</p>
                <p>Kategória</p>
            </div>
            <div className="listproduct-allproduct">
                <hr/>
                {allproducts.map((product,index)=>{
                    return <>
                    <EditableRow2
                    key={index} 
                    product={product}
                    editProduct={editProduct}
                    remove_product={remove_product}
                    />
                    <hr/>
                    </>
                })}
            </div>
        </div>
    )
}
export default ListProduct;