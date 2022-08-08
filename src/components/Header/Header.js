import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../../images/logo2.png";
import userPhoto from "../../images/ICON/Group 2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faUtensils,
  faStore,
  faHamburger,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../SignUp/useAuth";

const Header = (props) => {
  const auth = useAuth();

  return (
    <nav className="navbar navbar-expand navbar-light bg-white py-lg-3  sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Доставка еды logo" />
        </Link>

        <ul className="navbar-nav align-items-center">

        <li className="nav-item active">
            <Link to="/explore" className="nav-link">
              <FontAwesomeIcon icon={faUtensils} />
              <span className="badge bg-light">Поиск</span>
            </Link>
          </li>

          <li className="nav-item active">
            <Link to="/pastorder" className="nav-link">
              <FontAwesomeIcon icon={faHamburger} />
              <span className="badge bg-light">Мои заказы</span>
            </Link>
          </li>

    
          <li className="nav-item active">
            <Link to="/checkout" className="nav-link">
              <FontAwesomeIcon icon={faCartArrowDown} />
              <span className="badge bg-light">
                Корзина&nbsp;{props.cart.length}
              </span>
            </Link>
          </li>


          <li className="nav-item">
            {auth.user ? (
              <Link to="/account" className="nav-link">
                {auth.user.displayName}
                <img
                  className="ml-3 circle"
                  src={auth.user.photoURL ? auth.user.photoURL : userPhoto}
                  width="35px"
                  alt=""
                />
              </Link>
            ) : (
              <Link to="/signup" className="nav-link">
                Войти
              </Link>
            )}
          </li>

          <li className="nav-item">
            {auth.user ? (
              <Link to="/" className="nav-link">
                <button
                  onClick={() => {
                    auth.signOut();
                  }}
                  className="btn btn-danger btn-rounded"
                >
                  Выйти
                </button>
              </Link>
            ) : (
              <Link to="/signup" className="nav-link">
                <button className="btn btn-danger btn-rounded">Зарегистрироваться</button>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
