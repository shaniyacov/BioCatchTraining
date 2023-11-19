import React from "react";
import dog from '../../assets/dog.png';
import "./Header.css"

function Header() {
    return (
        <header className={"header"}>
            <img src={dog} alt={"logo"} className="photo"/>
            <h1>Sessions Table</h1>
        </header>
    )
}

export default Header;
