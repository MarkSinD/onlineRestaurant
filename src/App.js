import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider, PrivateRoute } from "./components/SignUp/useAuth";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Foods from "./components/Foods/Foods";
import FoodDetails from "./components/FoodDetails/FoodDetails";
import Blog from "./components/Blog/Blog";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import SignUp from "./components/SignUp/SignUp";
import Shipment from "./components/Shipment/Shipment";
import OrderComplete from "./components/OrderComplete/OrderComplete";
import SearchResult from "./components/SearchResult/SearchResult";
import Account from "./components/Account/Account";
import Restaurent from "./components/Restaurant/Resturant";
import PastOrder from "./components/PastOrder/FoodsPastOrder";
import Admin from "./components/Admin/AdminPage";
import Spinner from "./components/YooKassa/Spinner";
function App() {
  const [cart, setCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  function paymentHandler(amount) {
    setGrandTotal(amount);
  }

  const cartHandler = (currentFood) => {
    const alreadyAdded = cart.find((item) => item.id === currentFood.id);

    if (alreadyAdded) {
      const reamingCarts = cart.filter((item) => cart.id !== currentFood);
      setCart(reamingCarts);
    } else {
      const newCart = [...cart, currentFood];
      setCart(newCart);
    }
  };

  const [deliveryDetails, setDeliveryDetails] = useState({
    city: null,
    street: null,
    houseNumber: null,
    flatNumber: null,
    cellNumber: null,
    comments: null,
  });

  const [orderDetails, setorderDetails] = useState({
    deliveryDetails: deliveryDetails,
    orderID: null,
    timestamp: null, // TODO: Не используется
  });

  const setorderDetailsHandler = (data) => {
    setorderDetails(data);
    console.log("Save to setorderDetailsHandler: ", data)
    localStorage.setItem('orderDetails', JSON.stringify(data));
  };


  const deliveryDetailsHandler = (data) => {
    setDeliveryDetails(data);
    console.log("Save to deliveryDetailsHandler", data)
    localStorage.setItem('deliveryDetails', JSON.stringify(data));
  };

  const checkOutItemHandler = (foodID, foodQuantity) => {
    const newCart = cart.map((item) => {
      if (item.id === foodID) {
        item.quantity = foodQuantity;
      }
      return item;
    });

    const filteredCart = newCart.filter((item) => item.quantity > 0);
    setCart(filteredCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header cart={cart} />
            <Banner />
            <Foods cart={cart} />
            <Blog />
            <Footer />
          </Route>

          <Route path="/food/:restaurant/:id">
            <Header cart={cart} />
            <FoodDetails cart={cart} cartHandler={cartHandler} />
            <Footer />
          </Route>

          <Route path="/search=:searchQuery">
            <Header cart={cart} />
            <Banner />
            <SearchResult />
            <Blog />
            <Footer />
          </Route>

          <PrivateRoute path="/checkout">
            <Header cart={cart} />
            <Shipment
              cart={cart}
              orderDetails={orderDetails}
              setorderDetailsHandler={setorderDetailsHandler}
              deliveryDetails={deliveryDetails}
              setDeliveryDetails={setDeliveryDetails}
              deliveryDetailsHandler={deliveryDetailsHandler}
              checkOutItemHandler={checkOutItemHandler}
              clearCart={clearCart}
              paymentHandler={paymentHandler}
            />
            <Footer />
          </PrivateRoute>

          <Route path="/order-complete">
            <Header cart={cart} />
            <OrderComplete
              deliveryDetails={localStorage.getItem('deliveryDetails')}
              setorderDetailsHandler={setorderDetailsHandler}
              orderDetails={localStorage.getItem('orderDetails')}
            />
            <Footer />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/explore">
            <Header cart={cart} />
            <Restaurent cart={cart} />
            <Footer />
          </Route>

          <Route path="/account">
            <Header cart={cart} />
            <Account />
            <Footer />
          </Route>

          <Route exact path="/pastOrder">
            <Header cart={cart} />
            <PastOrder cart={cart} orderDetails={orderDetails} />
            <Footer />
          </Route>

          <Route path="/payment">
            {/*<StripeComponent grandTotal={grandTotal} />*/}
            <Spinner />
          </Route>

          <Route path="/admin">
            <Admin />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
