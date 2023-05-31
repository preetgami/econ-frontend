import React from "react";
import Card from "./Card";
import "./cardlist.css"
function CardList(props) {
    const isMobile = window.innerWidth <= 768;

    return (
        <div className="card-grid"  >
            {props.cards.map((card, index) => (
                <div className="card-list-item" key={index}>
                    <Card
                        image={card.image}
                        title={card.title}
                        description={card.description}
                        price={card.price}
                        id={card._id}
                    />
                </div>

            ))}
        </div>
    );
}

export default CardList;