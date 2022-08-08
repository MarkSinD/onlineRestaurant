import React from "react";
import { Link } from "react-router-dom";

const RecommendFood = (props) => {
  console.log("RecommendFood props.recommendFoods: ", props.recommendFoods);
  const { id, image, restaurant } = props.recommendFoods;

  return (
    <Link to={"../food/" + restaurant + "/" + id}>
      <img
        className={
          id === props.currentFood.id
            ? "selected moor-images mr-3"
            : "moor-images mr-3"
        }
        src={image.asset.url}
        height="150px"
        alt="food-image"
      />
    </Link>
  );
};

export default RecommendFood;
