import React from "react";
import "../styles/card.css";

const Card = ({title, body, onMoreInfo}) => {
    return (
        <div className="card">
            <div className="card-details">
                <p className="text-title">{title}</p>
                <p className="text-body">{body}</p>
            </div>
            <button className="card-button" onClick={onMoreInfo}>
                More Info
            </button>
        </div>
    );
};

export default Card;
