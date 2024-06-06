import React, { useState } from "react";
import "../Styles/Loginsignup.css"

const LoginSignup = ()=>{

    const[state,setState]= useState("Login");
    const [formData,setFormData] = useState({
        username:"",
        password:"",
        email:"",
    })

    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }


    const login = async()=>{
        console.log("Login Function Executed", formData);
        let responseData;
        await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
           },
           body: JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.errors)
        }
        
    }


    const signup= async()=>{
        console.log("Signup Function Executed", formData);
        let responseData;
        await fetch('http://localhost:4000/signup',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'Content-Type':'application/json',
           },
           body: JSON.stringify(formData),
        }).then((response)=>response.json()).then((data)=>responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.error)
        }

    }

    return(
        <div className="loginsignup">
            <div className="loginsignup-container">
            <h1>{state}</h1>
            <div className="loginsignup-fields">
                {state==="Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Meno"/>:<></>}
                <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Emailová adresa"/>
                <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Heslo"/>
            </div>
            <button onClick={()=>{state==="Login"?login():signup()}}>Potvrdiť</button>
            {state==="Sign Up"
            ?<p className="loginsignup-login"> Už máte účet?<span  onClick={()=>{setState("Login")}}>Prihláste sa tu</span></p>
            :<p className="loginsignup-login"> Nemáte ešte účet? <span onClick={()=>{setState("Sign Up")}}>Zaregistrujte sa tu</span></p>}
            
            <div className="loginsignup-agree">
                <input type="checkbox"/>
                <p>Pokračovaním súhlasite z uvedenými podmienkami používania a ochrane súkromia.</p>
            </div>
            </div>
        </div>
    )
}

export default LoginSignup;