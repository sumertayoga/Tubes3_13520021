import React from "react";
import './App.css';
import {Link} from "react-router-dom";

function Nav(){
    return(
        <nav>
            <Link to="/add">
                <h3>add</h3>
            </Link>
            <Link to="/tesdna">
                <h3>tesdna</h3>
            </Link>
            <Link to="/riwayat">
                <h3>riwayat</h3>
            </Link>

        </nav>
    )
}

export default Nav;