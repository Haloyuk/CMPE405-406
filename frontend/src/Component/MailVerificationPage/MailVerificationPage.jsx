import React from "react";
import "./MailVerificationPage.css";

function MailVerificationPage () {
    return (
        <div className="">
            
            <div className="popup">
                <img src="tick.png"/>
                <h2>Success!</h2>
                <p>The verification link has been sent to your mail, please check. If you have not received the mail, you can click the resend button.</p><br></br>
            <a href="login">
            <button className="btn">Go Back To Login Page </button></a>&emsp;&emsp;
            <button className="btn">Resend Link</button>
            </div>
            <div>
                
            </div>
        </div>
    )
};

export default MailVerificationPage