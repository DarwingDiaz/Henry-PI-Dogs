import React from "react";
import { Link } from "react-router-dom";
import "./landing.styles.css";


const Landing = () => {
    return (
        <div className="landing-container">
            <div >
            <h1 className="title">PI-Dogs</h1>
            <Link to="/home">
                <button className="goHome">Go Home!</button>
            </Link>
            </div>
        </div>
    )
}

export default Landing;