import React, {useEffect, useState} from 'react';
import './SearchResult.css';
import { useParams, Link } from 'react-router-dom';
import FoodItem from '../FoodItem/FoodItem';
import {client} from "../client";

const SearchResult = () => {
    const { searchQuery } = useParams();
    const [listBreakfast, setlistBreakfast] = useState([]);
    const [listBurger, setlistBurger] = useState([]);
    const [listDinner, setlistDinner] = useState([]);
    const [listDrinks, setlistDrinks] = useState([]);
    const [listIcecream, setlistIcecream] = useState([]);
    const [listLunch, setlistLunch] = useState([]);
    const [listPizza, setlistPizza] = useState([]);
    const [listSandwich, setlistSandwich] = useState([]);
    const [listShawarma, setlistShawarma] = useState([]);
    const [list, setList] = useState([]);
    const allTables = ["breakfast", "burger", "dinner", "drinks", "icecream", "lunch", "pizza", "sandwich", "shawarma"]


    useEffect(async () => {
        client
          .fetch(
            `*[_type == "breakfast"]{
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
          .then((data) => {
              setlistBreakfast(data);
          })
          .catch((error) => console.log("Error: ", error))
    }, [])
    useEffect(async () => {
        client
          .fetch(
            `*[_type == "burger"]{
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
          .then((data) => {
              setlistBurger(data);
          })
          .catch((error) => console.log("Error: ", error))
    }, [])
    useEffect(async () => {
        client
          .fetch(
            `*[_type == "dinner"]{
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
          .then((data) => {
              setlistDinner(data);
          })
          .catch((error) => console.log("Error: ", error))
    }, [])
    useEffect(async () => {
        client
          .fetch(
            `*[_type == "drinks"]{
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
          .then((data) => {
              setlistDrinks(data);
          })
          .catch((error) => console.log("Error: ", error))
    }, [])
    useEffect(async () => {
        client
          .fetch(
            `*[_type == "icecream"]{
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
          .then((data) => {
              setlistIcecream(data);
          })
          .catch((error) => console.log("Error: ", error))
    }, [])
    useEffect(async () => {
        client
          .fetch(
            `*[_type == "lunch"]{
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
          .then((data) => {
              setlistLunch(data);
          })
          .catch((error) => console.log("Error: ", error))
    }, [])
    useEffect(async () => {
        client
          .fetch(
            `*[_type == "pizza"]{
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
          .then((data) => {
              setlistPizza(data);
          })
          .catch((error) => console.log("Error: ", error))
    }, [])
    useEffect(async () => {
        client
          .fetch(
            `*[_type == "sandwich"]{
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
          .then((data) => {
              setlistSandwich(data);
          })
          .catch((error) => console.log("Error: ", error))
    }, [])
    useEffect(async () => {
        client
          .fetch(
            `*[_type == "shawarma"]{
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
          .then((data) => {
              setlistShawarma(data);
          })
          .catch((error) => console.log("Error: ", error))
    }, [])
    useEffect(() => {
        setList([...listBreakfast, ...listBurger, ...listDinner, ...listDrinks, ...listIcecream, ...listLunch, ...listPizza, ...listSandwich, ...listShawarma])
    }, [listBreakfast, listBurger, listDinner, listDrinks, listIcecream, listLunch, listPizza, listSandwich, listShawarma])

    console.log("List: ", list);
    const SearchResult = list.filter(food => food.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return (
        <section className="food-area my-5">
            <div className="container">
                <h3 className="text-center search-res-title">Результаты поиска</h3>
                <div className="row my-5">
                    {
                        SearchResult.map(food => <FoodItem key={food.id} food={food}></FoodItem>)
                    }
                    {
                        SearchResult.length === 0 && <h1 className="col-12 display-5 text-center">No food found!</h1>
                    }
                </div>

                <div className="text-center">
                    <Link to="/">
                        <button className="btn btn-danger">See Our All Foods</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SearchResult;