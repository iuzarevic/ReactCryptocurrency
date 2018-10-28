import React from 'react';
import {Link} from 'react-router-dom';
import "./Notfound.css";

const Notfound = () => {
    return (
        <div className="NotFound">
            <h1 className="NotFound-title">Error. Page not found !</h1>
            <Link to="/" className="NotFound-link">Homepage</Link>
        </div>
    );
}

export default Notfound;