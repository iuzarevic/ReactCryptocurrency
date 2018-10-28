import React from 'react';

/**
 * Fetch error helper
 * 
 * @param {object} response 
 */
export const handleResponse = (response) => {
    return response.json().then(json => {
        return response.ok ? json : Promise.reject(json);
    });
}

/**
 * Rendering change percent arrow or render it without arrow
 * 
 * @param {string} percent 
 */
export const renderChangePercent = (percent) => {
    if(percent > 0) {
        return <span className="percent-raised">{percent}% <i className="icon ion-md-arrow-up"></i></span>
    } else if (percent < 0) {
        return <span className="percent-fallen">{percent}% <i className="icon ion-md-arrow-down"></i></span>
    } else {
        return <span>{percent}</span>
    }
}
