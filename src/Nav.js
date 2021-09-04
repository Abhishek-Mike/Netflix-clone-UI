import React, { useEffect, useState } from 'react'
import "./Nav.css"

function Nav() {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    //as it scrolls, it will for to function transitionNavBar
    useEffect(() =>{
        window.addEventListener("scroll",transitionNavBar);
        return () => window.removeEventListener("scroll",transitionNavBar);
    },[])

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <div className="nav__contents">
            <img className="nav__logo"
                 src="https://cdn.iconscout.com/icon/free/png-512/netflix-282224.png" 
                 alt=""
            />

            <img className="nav__avatar"
                 src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/1bdc9a33850498.56ba69ac2ba5b.png"
                 alt=""
            />
            </div>
        </div>
    )
}

export default Nav
