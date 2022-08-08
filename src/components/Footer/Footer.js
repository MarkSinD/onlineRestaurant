import React from "react";
import "./Footer.css";
import whiteLogo from "../../images/logo2.png";
import { Link } from "react-router-dom";
// import firebase from "firebase";
import { useAuth } from "../SignUp/useAuth";
const Footer = () => {
  const auth = useAuth();
  const uid = auth.user == undefined ? "sddfd" : auth.user.uid;
  return (
    <footer className="bg-color py-3">
      <div className="container">
        <div className="row footer-top py-5">
          <div className="col-md-6 mb-5">
            <img src={whiteLogo} alt="white-logo" />
          </div>
          <div className="col-md-3">
            <ul className="list-unstyled">
              <li>
                <Link to="#">О нас</Link>
              </li>
              <li>
                <Link to="/blog">Читать наш блог</Link>
              </li>
              <li>
                <Link to="/signup">Зарегистрироваться</Link>
              </li>
              <li>
                <Link to="/restaurants">Добавить ресторан</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-unstyled">
              <li>
                <Link to="/help">Помощь</Link>
              </li>
              <li>
                <Link to="/faq">Прочитать FAQ</Link>
              </li>
              <li>
                <Link to="/cities">Посмотреть все города</Link>
              </li>
              <li>
                <Link to="/restaurants">Ресторары рядом со мной</Link>
              </li>
              <li>
                {uid === process.env.REACT_APP_BASE_URL ? (
                  <Link to="/admin">Admin Page</Link>
                ) : (
                  <div />
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom d-flex justify-content-between">
          <small className="text-secondary">
            Copyright &copy; 2022 ДОСТАВКА ЕДЫ. Создано с &nbsp;
            <span role="img">❤️</span>
            <span>
              <a
                className="text-color"
                href="https://github.com/Yash1256/Urban-Eatery"
              ></a>
            </span>
          </small>
          <ul className="list-inline">
            <li className="list-inline-item ml-3">
              <Link to="/policy">Политика приватности</Link>
            </li>
            <li className="list-inline-item  ml-3">
              <Link to="/terms">Условия эксплуатации</Link>
            </li>
            <li className="list-inline-item  ml-3">
              <Link to="/pricing">Цены</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
