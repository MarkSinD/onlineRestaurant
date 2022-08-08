import React, {useEffect, useState} from "react";
import "./Shipment.css";
import {useForm} from "react-hook-form";
import firebase from "../firebase-config";
import {Redirect, useHistory} from 'react-router-dom';

const Shipment = (props) => {
  console.log("Shipment")
  useEffect(() => {
    window.scrollTo(0, 0);
    const delivery = {
      city,
      street,
      houseNumber,
      flatNumber,
      cellNumber,
      comments,
    }
    localStorage.setItem('deliveryDetails', JSON.stringify(delivery));
    console.log("SAVE")
  }, []);

  const {city, street, houseNumber, flatNumber, cellNumber, comments} = props.deliveryDetails;
  const [userid, setuserid] = useState();
  const {register, handleSubmit, errors} = useForm();
  const [showModelPayment, setShowModelPayment] = useState(false);
  const history = useHistory();
  const onSubmit = (register) => {
    console.log("OnSubmit");
    props.deliveryDetailsHandler(register);
  };
  const subTotal = props.cart.reduce((acc, crr) => {
    return acc + crr.price * crr.quantity;
  }, 0);

  const totalQuantity = props.cart.reduce((acc, crr) => {
    return acc + crr.quantity;
  }, 0);

  const tax = (subTotal / 100) * 5;
  const deliveryFee = totalQuantity && 40;
  const grandTotal = subTotal + tax + deliveryFee;
  useEffect(() => {
    const user = () => {
      const user = firebase.auth().currentUser;
      setuserid(user.uid);
    };
    user();
    async function addressFunc(){
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid).get().then(res => {
          props.setDeliveryDetails(res.data().address);
        });
    }
    addressFunc();
  }, []);

  function handlePayment() {
    const body = {
      shopId: `912799`,
      secretKey: `test_garbo-TWSpOPtuQuvy8YjdAgWUPa0DFt10VJNPmnTJM`,
      value: grandTotal,
      returnUrl: `https://eat-front.herokuapp.com/order-complete`,
      description: `EAT`
    }

    const formBody = Object.keys(body).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&');

    history.push("/payment");
    setShowModelPayment(true);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');

    const requestOptions = {
      method: 'POST',
      headers,
      body: formBody
    };
    fetch('https://yookassa-payment.herokuapp.com/init', requestOptions)
      .then((response) => response.json())
      .then((responseData) => {
        window.location.replace(responseData)
      }).catch(e => {console.log("Error. Ошибка в оплате: ", e)});
    onSubmit();
    onOrderComplete().then(() => {console.log("Заказ успешно создан")}).catch((e) => {console.log("Error: ", e);});
  }

  async function onOrderComplete() {
    const totalOrdersRef = await firebase.firestore().collection("orders");
    const adminDataRef = await firebase
      .firestore()
      .collection("admin")
      .doc("miKN5ZPi6GUIht4qDTG4");

    console.log("1");
    const addressRef = await firebase
      .firestore()
      .collection("users")
      .doc(userid);

    console.log("2");
    const ordersRef = await firebase
      .firestore()
      .collection("users")
      .doc(userid)
      .collection("orders");

    console.log("3");
    await adminDataRef.update({
      totalSales: firebase.firestore.FieldValue.increment(grandTotal),
      orderCount: firebase.firestore.FieldValue.increment(1),
      productSalesCount: firebase.firestore.FieldValue.increment(totalQuantity),
    });
    console.log("4");

    const b = await addressRef.get().then((res)=> {
      return res;
    })

    if(!b.exists){
      await addressRef.set({
        moneySpent: grandTotal,
        address: props.deliveryDetails,
        orderCount: 1,
      });
    } else {
      await addressRef.update({
        moneySpent: firebase.firestore.FieldValue.increment(grandTotal),
        address: props.deliveryDetails,
        orderCount: firebase.firestore.FieldValue.increment(1),
      });
    }

    console.log("5");
    await totalOrdersRef.add({
      products: props.cart,
      address: props.deliveryDetails,
    });

    console.log("6 ");
    await ordersRef
      .add({
        products: props.cart,
        address: props.deliveryDetails,
      })
      .then(function (docRef) {
        props.setorderDetailsHandler({
          deliveryDetails: props.deliveryDetails,
          orderID: docRef.id,
        });

        console.log("Tutorial created with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding Tutorial: ", error);
      });
  }

  return (
    <div className="shipment container my-5">
      <div className="row">
        <div className="col-md-5">
          <h4>Изменить сведения о доставке</h4>
          <hr/>
          <form onSubmit={handleSubmit(onSubmit)} className="py-5">
            <div className="form-group">
              <input
                name="city"
                className="form-control"
                ref={register({required: true})}
                defaultValue={city}
                placeholder="Город"
              />
              {errors.city && (
                <span className="error">Эта опция обязательна</span>
              )}
            </div>
            <div className="form-group">
              <input
                name="street"
                className="form-control"
                ref={register({required: true})}
                defaultValue={street}
                placeholder="Улица"
              />
              {errors.street && (
                <span className="error">Эта опция обязательна</span>
              )}
            </div>

            <div className="form-group">
              <input
                name="houseNumber"
                className="form-control"
                ref={register({required: true})}
                defaultValue={houseNumber}
                placeholder="Номер дома"
              />
              {errors.houseNumber && (
                <span className="error">Эта опция обязательна</span>
              )}
            </div>

            <div className="form-group">
              <input
                name="flatNumber"
                className="form-control"
                ref={register({required: true})}
                defaultValue={flatNumber}
                placeholder="Номер квартиры (Если есть)"
              />
            </div>

            <div className="form-group">
              <input
                name="cellNumber"
                className="form-control"
                defaultValue={cellNumber}
                ref={register({required: true})}
                placeholder="Телефонный номер"
              />
              {errors.cellNumber && (
                <span className="error">Эта опция обязательна</span>
              )}
            </div>

            <div className="form-group">
              <textarea
                name="comments"
                ref={register({required: true})}
                defaultValue={comments}
                placeholder="Комментарий"
                className="form-control"
                cols="30"
                rows="2"
              />
            </div>

            <div className="form-group">
              <button className="btn btn-danger btn-block" type="submit">
                Сохранить & Продолжить
              </button>
            </div>
          </form>
        </div>
        <div className="offset-md-1 col-md-5">
          <div className="restaurant-info mb-3">
            <h5>Прибытие через 20-30 минут</h5>
          </div>

          {props.cart.map((item) => (
            <div className="single-checkout-item mb-3 bg-light rounded d-flex align-items-center justify-content-between p-3">
              <img
                width="140px"
                className="moor-images"
                src={item?.image.asset.url}
                alt="food-image"
              />
              <div className="px-4">
                <h6>{item.name}</h6>
                <h4 className="text-danger">{item.price} ₽</h4>
                <p>
                  <small>Доставка</small>
                </p>
              </div>

              <div className="checkout-item-button ml-3 btn">
                <button
                  onClick={() =>
                    props.checkOutItemHandler(item.id, item.quantity + 1)
                  }
                  className="btn font-weight-bolder"
                >
                  +
                </button>

                <button className="btn bg-white rounded">
                  {item.quantity}
                </button>

                {item.quantity > 0 ? (
                  <button
                    onClick={() =>
                      props.checkOutItemHandler(item.id, item.quantity - 1)
                    }
                    className="btn font-weight-bolder"
                  >
                    -
                  </button>
                ) : (
                  <button className="btn font-weight-bolder">-</button>
                )}
              </div>
            </div>
          ))}

          {!props.cart.length && (
            <h3 className="py-3">
              Ничего не добавено <a href="/"> выбрать</a>
            </h3>
          )}

          <div className="cart-calculation">
            <p className="d-flex justify-content-between">
              <span>Общая сумма: {totalQuantity}</span>
              <span>{subTotal.toFixed(1)} ₽</span>
            </p>

            <p className="d-flex justify-content-between">
              <span>Налог</span>
              <span>{tax.toFixed(1)} ₽</span>
            </p>

            <p className="d-flex justify-content-between">
              <span>Доставка</span>
              <span>{deliveryFee} ₽</span>
            </p>

            <p className="h5 d-flex justify-content-between">
              <span>Всего</span>
              <span>{grandTotal.toFixed(1)} ₽</span>
            </p>

            {/*{totalQuantity ? (
              toDoor && road && flat && businessName && address || true ? (
                <Link
                  to={{
                    pathname: "/payment",
                    state: orderID,
                  }}
                >
                  <button
                    onClick={handlePayment}
                    className="btn btn-block btn-danger"
                  >
                    Check Out Your Food
                  </button>
                </Link>
              ) : (
                <button disabled className="btn btn-block btn-secondary">
                  Заполните данные для доставки
                </button>
              )
            ) : (
              <button disabled className="btn btn-block btn-secondary">
                Нечего оплачивать
              </button>
            )}*/}

            {totalQuantity ? (
              <button
                onClick={handlePayment}
                className="btn btn-block btn-danger"
              >
                Оплатить
              </button>
            ) : (
              <button disabled className="btn btn-block btn-secondary">
                Нечего оплачивать
              </button>
            )}

            {
              showModelPayment ? (
                <Redirect to={{pathname: "/order-complete",}}/>
              ) : (<></>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
