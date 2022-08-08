import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import "./button.css";

const FoodItemPastOrders = (props) => {
  const { id, name, description, price, image, restaurant } = props.food;

  console.log("props.food: ", props.food);

  return (
    <div className="col-md-4 mb-4">
      <Link to={"food/" + restaurant + "/" + id}>
        <div className="card text-center">
          <img src={image.asset.url} alt="FoodItem" className="card-img-top" />
          <div className="card-body">
            <h5>{name}</h5>
            <p>{description}</p>
            <h4>{price} ₽</h4>
          </div>
          <Button />
        </div>
      </Link>
    </div>
  );
};

export default FoodItemPastOrders;
