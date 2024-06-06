import React, { useEffect, useState } from "react";
import "./ListUser.css"
import  cross_icon from '../../assets/cross.png'
import edit_icon from '../../assets/editing.png'
import EditableRow from "../EditableRow/EditableRow";

const ListUser = ()=>{
    const [allusers, setAllUsers] = useState([]);
    const fetchInfo = async ()=>{
        await fetch('http://localhost:4000/allusers')
        .then((res)=>res.json())
        .then((data)=>{setAllUsers(data)});
    }

    useEffect(()=>{
        fetchInfo();

    },[])

    async function editUser(userId, newName, newEmail) {
        try {
          const response = await fetch(`http://localhost:4000/edituser/${userId}`, { 
            method: 'PUT',
            headers: { 
                Accept:'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ name: newName, email: newEmail }),
          });

          const data = await response.json();
          
          if (data.success) {
          } else {
            console.error('Error updating user:', data.message);
          }
        } catch (error) {
          console.error('Error editing user:', error);
        }
        fetchInfo();
      }

    const remove_user = async(id)=>{
        await fetch('http://localhost:4000/removeuser/'+ id,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
        })
        await fetchInfo();
    }

    return(
        <div className="list-user">
            <h1>Všetci používatelia</h1>
            <div className="listuser-format-main">
                <p>ID:</p>
                <p>Meno</p>
                <p>Email</p>
            </div>
            <div >
                <hr/>
                {allusers.map((user,index)=>{
                    return <>
                    <EditableRow
                    key={index} 
                    user={user}
                    editUser={editUser} 
                    remove_user={remove_user}
                    />
                    <hr/>
                    </>
                })}
            </div>
        </div>
    )
}
export default ListUser;