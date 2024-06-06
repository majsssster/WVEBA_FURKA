import React, { useState, useEffect } from 'react';
import "../ListUser/ListUser.css";
import  cross_icon from '../../assets/cross.png'

const EditableRow = ({ user, editUser, remove_user}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  useEffect(() => {
    setFormData({ name: user.name, email: user.email });
  }, [user]); // Update formData when user changes

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await editUser(user._id, formData.name, formData.email);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveClick2 = async () => {
    try {
      await remove_user(user._id);
    } catch (error) {
      console.error(error);
    }
  };



  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <tr className="listuser-format-main listuser-format">
      <td className='listuser-format'>{user._id}</td>
      {isEditing ? (
        <>
          <td className="listuser-format">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </td>
          <td  className="listuser-format">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </td>
        </>
      ) : (
        <>
          <td className="listuser-format">{user.name}</td>
          <td className="listuser-format">{user.email}</td>
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
      <img onClick={handleSaveClick2} className="listuser-remove-icon" src={cross_icon}alt=""></img>
      </td>
    </tr>
  );
};

export default EditableRow;