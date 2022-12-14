import axios from "axios";
import firebase from "firebase";
import React, { useEffect, useState } from "react";
import "./dashboardCard.css";

export default function DashBoardCards() {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

  const adminRef = firebase
    .firestore()
    .collection("admin")
    .doc("miKN5ZPi6GUIht4qDTG4");

  const usersRef = firebase
    .firestore()
    .collection("users");

  const [orderQty, setOrderQty] = useState(0);
  const [sales, setSales] = useState(0);
  const [qty, setQty] = useState(0);
  const [profit, setProfit] = useState(0);
  const [restaurant, setrestaurant] = useState(0);
  const [countCustomers, setCountCustomers] = useState(0);

  const baseurl =
    "https://urbaan-eatery.herokuapp.com/api/v1/restaurant/getAllRestaurant  ";
  useEffect(() => {
    const fetchdata = async () => {
      await axios
        .get(baseurl, config)
        .then((res) => {
          setrestaurant(res.data.data.length);
        })
        .catch((errr) => {
          console.log(errr);
        });
    };
    fetchdata();

    adminRef.get().then((res) => {
      const data = res.data();
      setOrderQty(data.orderCount);
      setQty(data.productSalesCount);
      setSales(data.totalSales.toFixed(2));
      setProfit((data.totalSales * 0.08).toFixed(2));
    });

    usersRef.get().then(res => {
      setCountCustomers(res.size);
    })
  }, []);

  return (
    <div>
      <div class="cards shadow-lg p-3 mb-5 bg-white rounded">
        <div class=" cardss [ is-collapsed ] shadow-lg p-3 mb-5 bg-white rounded ">
          <div class="card__inner [ js-expander ]">
            <span>
              {" "}
              <h1> {orderQty} </h1>
            </span>
            <i class="fa fa-folder-o"></i>
          </div>
          <div class="card__expander">Всего заказов</div>
        </div>
        <div class=" cardss [ is-collapsed ] shadow-lg p-3 mb-5 bg-white rounded">
          <div class="card__inner [ js-expander ]">
            <span>
              {" "}
              <h1>{sales} ₽</h1>
            </span>
            <i class="fa fa-folder-o"></i>
          </div>
          <div class="card__expander">Итоговая сумма</div>
        </div>
        <div class=" cardss [ is-collapsed ] shadow-lg p-3 mb-5 bg-white rounded">
          <div class="card__inner [ js-expander ]">
            <span>
              <h1>{restaurant}</h1>
            </span>
            <i class="fa fa-folder-o"></i>
          </div>
          <div class="card__expander">Ресторанов</div>
        </div>

        <div class=" cardss [ is-collapsed ] shadow-lg p-3 mb-5 bg-white rounded">
          <div class="card__inner [ js-expander ]">
            <span>
              <h1>{qty}</h1>
            </span>
            <i class="fa fa-folder-o"></i>
          </div>
          <div class="card__expander">Позиций продано</div>
        </div>

        <div class=" cardss [ is-collapsed ] shadow-lg p-3 mb-5 bg-white rounded">
          <div class="card__inner [ js-expander ]">
            <span>
              <h1>{profit} ₽</h1>
            </span>
            <i class="fa fa-folder-o"></i>
          </div>
          <div class="card__expander">Прибыль 8%</div>
        </div>

        <div class=" cardss [ is-collapsed ] shadow-lg p-3 mb-5 bg-white rounded">
          <div class="card__inner [ js-expander ]">
            <span>
              <h1>{countCustomers}</h1>
            </span>
            <i class="fa fa-folder-o"></i>
          </div>
          <div class="card__expander">Клиентов</div>
        </div>
      </div>
    </div>
  );
}
