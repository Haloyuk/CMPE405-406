import React from "react"
import { LuUser2 } from "react-icons/lu";
import "./RegisterForm.css"


function RegisterForm() {
    return (
        <div className="wrapper">
        <form action="">
            <div className="logo"></div>
            <div className="input-box">
                <LuUser2 /><input type="text" placeholder="Name" required/>
            </div>
            <div className="input-box">
                <input type="text" placeholder="Surname" required/>
            </div>
            <div className="input-box">
            <input type="text" placeholder='Username' required/> 
            </div>
            <div className="input-box">
             <input type="password" placeholder='Password' required/> 
            </div>
            <div className="input-box">
             <input type="password" placeholder='Canfirmed Password' required/> 
            </div>
            <div className="input-box">
                <input type="email" placeholder="E-mail" required/>
            </div>
            <p>Select your gender:         </p>  
            <input type="radio" name="gender" value="male" required/>
            <label for="male">Male   </label>
            <input type="radio" name="gender" value="female" required/>
            <label for="female">   Female</label><br/><br/>
            
                <button type='submit'>Register</button>
        </form>
        </div>
    );
}

export default RegisterForm