import React from "react";
import { Link } from "react-router-dom";
import "./landing.styles.css";


const Landing = () => {
    return (
        <div className="landing-container">
            <div >
            <h1>DOGGYS APP</h1>
            <Link to="/home">
                <button >HOME</button>
            </Link>
            </div>
        </div>
    )
}

export default Landing;