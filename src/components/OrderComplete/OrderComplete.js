import React, { useEffect } from 'react';
import MapImg from '../../images/img/map.png';
import * as firebase from "firebase/app";
import Rider from '../../images/img/rider.png';
import RiderHelmet from '../../images/img/helmet.png';

const OrderComplete = (props) => {
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const {deliveryDetails, orderID} = JSON.parse(props.orderDetails);
    const {city, street, houseNumber, flatNumber, cellNumber, comments} = deliveryDetails;

    const ordersRef = firebase.firestore().collection("/user");

    const cancelorder = function(e){
        e.preventDefault() ; 
        if(orderID != "" || orderID != null){
            ordersRef.doc(orderID).delete().then(function(res) {
                console.log("Заказ отменен ", res);
                props.setorderDetailsHandler({
                    deliveryDetails : null, 
                    orderID : null   
                })
                
            }).catch((err) => {
              console.log(err) ; 
            })
        }else {
        console.log("order ID was null , cant do any thing")
    }
} 

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-8">
                    <img className="img-fluid" src={MapImg} alt="" />
                </div>
                <div className="col-md-4 pl-md-5">
                    <div className="bg-light p-3 rounded">
                        <img className="w-25 ml-5" src={Rider} alt="" />
                        <div className="bg-white  rounded p-3 my-3">
                        <div>
                                <h5>Номер заказа</h5>
                                <p>{orderID ? orderID : "Заказ отменен"}</p>
                            </div>
                            <div>
                                <h5>Адрес доставки</h5>
                                <p>{ city ? city + ", " + street + ", " + houseNumber + ", " + flatNumber : "Заказ отменен"}</p>
                            </div>
                            <div>
                                <h5>Контактный телефон</h5>
                                <p>{cellNumber ?? "Заказ отменен"}</p>
                            </div>
                            <div>
                                <h5>Комментарий</h5>
                                <p>{comments ?? "Заказ отменен"}</p>
                            </div>
                            <div>
                                <h5>Адрес магазина</h5>
                                <p>г.Краснодар, ул.Красная, 136</p>
                            </div>
                        </div>
                        <h1>20 минут</h1>
                        <p>Оставшееся время</p>

                        <div className="bg-white rounded p-3 d-flex">
                            <img className="w-25 mr-2" src={RiderHelmet} alt="" />
                            <div>
                                <h6>Иванов Иван Иванович</h6>
                                <p>Ваш доставщик</p>
                            </div>
                        </div>
                         
                        <button className="btn btn-block my-3 btn-info">
              <a class="text-white" href="tel:+79898262940">
                Контакты
              </a>
            </button>

                        <button className="btn btn-block my-3 btn-danger" onClick={cancelorder}>Отменить заказ</button>
                        
                        
                         </div>
                </div>
            </div>
        </div>
    );
};

export default OrderComplete; 