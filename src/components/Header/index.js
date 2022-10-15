import React from "react";
import './Header.css';

export default ({black})=>{
    return(
        
        <header className= {black ? "black": ""} >
            
            <div className="header--logo">
                <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="Logo Netflix"/>
            </div>
            <div className="header--user">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjjmeF_2XLAEqXv3kemr2_uCVscIIwYt9yjATilVjB_Q&s" alt="Usuário Netflix" />
            </div>
        </header>
    );
}