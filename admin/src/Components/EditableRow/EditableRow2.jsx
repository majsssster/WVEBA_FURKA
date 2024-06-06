import React, { useState, useEffect } from 'react';
import "../ListProduct/ListProduct.css";
import  cross_icon from '../../assets/cross.png'

const EditableRow2 =({product, editProduct, remove_product}) =>{
    const [isEditing, setIsEditing] = useState(false);
    const[image,setImage]= useState(false);
    const [formData, setFormData] = useState({
    name: product.name,
    image:  product.image,
    category:  product.category,
    new_price:  product.new_price,
    old_price:  product.old_price,
    });

    useEffect(() => {
        setFormData({ name: product.name, 
            image:  product.image,
            category:  product.category,
            new_price:  product.new_price,
            old_price:  product.old_price, });
    }, [product]); 

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
          await editProduct(product._id, formData.name, formData.image,formData.category, formData.new_price, formData.old_price);
          setIsEditing(false);
        } catch (error) {
          console.error(error);
        }
    };

    const handleSaveClick2 = async () => {
        try {
          await remove_product(product._id);
        } catch (error) {
          console.error(error);
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
return(
    <tr className='listproduct-format-main listproduct-format' >
        {isEditing?(
            <>
        <td className='listproduct-format '>
            <input onChange={imageHandler} type="file" name="image" id="file-input" />
            </td>
            <td listproduct-format className='listproduct-format'>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                />
            </td >
            <td className='listproduct-format'>
            <input
                type="number"
                name="old_price"
                value={formData.old_price}
                onChange={handleChange}
                />
            </td>
            <td>
            <input
                type="number"
                name="new_price"
                value={formData.new_price}
                onChange={handleChange}
                />
            </td>
            <td>
                <select value={formData.category} onChange={handleChange} name="category" className="add-product-selector">
                <option value="fruits">Ovocie</option>
                <option value="vegie">Zelenina</option>
                <option value="animals">Zivocisne</option>
            </select>
        </td>
        </>
        ):(
            <>
            <td  className="listproduct-format">
                <img className='listproduct-product-icon' src={product.image}></img> 
            </td>
            <td className="listproduct-format">{product.name}</td>
            <td className="listproduct-format">{product.old_price}</td>
            <td className="listproduct-format">{product.new_price}</td>
            <td className="listproduct-format">{product.category}</td>
            </>
        )}
        <td>
        {isEditing ? (
          <button onClick={handleSaveClick} className="listproduct-edit-icon">Save</button>
        ) : (
          <button onClick={handleEditClick} className="listproduct-edit-icon">Edit</button>
        )}
        </td>
        <td>
            <img onClick={handleSaveClick2} className="listproduct-remove-icon" src={cross_icon}alt=""></img>
        </td>
        
    </tr>
    ); 
    };

export default EditableRow2;