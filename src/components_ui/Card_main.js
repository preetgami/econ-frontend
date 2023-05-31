import React from 'react';

import './card_main.css';

const Card_main = props => {
    return (
        <div className={`card_main ${props.className}`} style={props.style}>
            {props.children}
        </div>
    );
};

export default Card_main;
