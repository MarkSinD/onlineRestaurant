import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import burger from "../../images/foodicon/burger.png";
import drink from "../../images/foodicon/cold drinks.png";

import iceCream from "../../images/foodicon/ice cream.png";
import pizza from "../../images/foodicon/pizza.png";
import sandwich from "../../images/foodicon/sandwich.png";
import shawarma from "../../images/foodicon/shawarma.png";
import FoodItem from "../FoodItem/FoodItem";
import "./Foods.css";
import {client} from "../client";

const Restaurent = (props) => {
  const [foods, setFoods] = useState([]);
  const [restaurant, setrestaurant] = useState("breakfast");
  const [category, setCategory] = useState("Завтрак");

  console.log("foods: ", foods);
  console.log("restaurant: ", restaurant);
  console.log("category: ", category);


  useEffect(() => {
    client
      .fetch(
        `*[_type == "${restaurant}"]{
      id,
      category,
      restaurant,
      name,
      description,
       image{
        asset->{
          _id,
          url
        },
      },
      story,
      price
    }`
      )
      .then((data) => {setFoods(data); setCategory(data[0].category)})
      .catch((error) => console.log("Error: ", error));
  }, [restaurant]);


  return (
    <section className="food-area my-5">
      <div className="container">
        <div>
          <h1 className="restaurant-name">{category}</h1>
        </div>
        <nav>
          <ul className="nav justify-content-center mt-5">
            <li
              className="nav-item"
              onClick={() => setrestaurant("breakfast")}
            >
              <span
                to="Завтраки"
                className={
                  restaurant === "breakfast"
                    ? "active nav-link"
                    : "nav-link"
                }
              >
                <img
                  src={shawarma}
                  alt="foodIcon"
                  width="55px"
                  className="mr-2"
                />
                Завтраки
              </span>
            </li>
            <li
              className="nav-item"
              onClick={() => setrestaurant("burger")}
            >
              <span
                to="Бургеры"
                className={
                  restaurant === "burger" ? "active nav-link" : "nav-link"
                }
              >
                <img
                  src={burger}
                  alt="foodIcon"
                  width="35px"
                  className="mr-2"
                />
                Бургеры
              </span>
            </li>
            <li className="nav-item" onClick={() => setrestaurant("pizza")}>
              <span
                to="Пицца"
                className={
                  restaurant === "pizza" ? "active nav-link" : "nav-link"
                }
              >
                <img src={pizza} alt="foodIcon" width="35px" className="mr-2" />
                Пицца
              </span>
            </li>
            <li
              className="nav-item"
              onClick={() => setrestaurant("sandwich")}
            >
              <span
                to="Сендвичи"
                className={
                  restaurant === "sandwich" ? "active nav-link" : "nav-link"
                }
              >
                <img
                  src={sandwich}
                  alt="foodIcon"
                  width="35px"
                  className="mr-2"
                />
                Сендвичи
              </span>
            </li>
            <li
              className="nav-item"
              onClick={() => setrestaurant("icecream")}
            >
              <span
                to="Мороженое"
                className={
                  restaurant === "Cream Bell" ? "active nav-link" : "nav-link"
                }
              >
                <img
                  src={iceCream}
                  alt="foodIcon"
                  width="35px"
                  className="mr-2"
                />
                Мороженое
              </span>
            </li>
            <li
              className="nav-item"
              onClick={() => setrestaurant("drinks")}
            >
              <span
                to="Напитки"
                className={
                  restaurant === "drinks"
                    ? "active nav-link"
                    : "nav-link"
                }
              >
                <img src={drink} alt="foodIcon" width="30px" className="mr-2" />
                Напитки
              </span>
            </li>
          </ul>
        </nav>

        <div className="row my-5">
          {foods.map((food) => (
            <FoodItem food={food} key={food.id} />
          ))}
        </div>

        <div className="text-center">
          {props.cart.length ? (
            <Link to="/checkout">
              <button className="btn btn-danger">Проверить еду</button>
            </Link>
          ) : (
            <button disabled className="btn btn-secondary">
              Проверить еду
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Restaurent;
