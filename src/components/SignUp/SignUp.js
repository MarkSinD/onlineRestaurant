import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../images/logo2.png";
import "./SignUp.css";
import { useAuth } from "./useAuth";

const SignUp = () => {
  const [returningUser, setReturningUser] = useState(true);
  const { register, handleSubmit, watch, errors } = useForm();

  const auth = useAuth();

  const onSubmit = (data) => {
    if (returningUser) {
      if (data.email && data.password) {
        auth.signIn(data.email, data.password);
      }
    } else {
      if (data.name && data.email && data.password && data.confirm_password) {
        auth.signUp(data.email, data.confirm_password, data.name);
      }
    }
  };

  console.log("User: ", auth);
  return (
    <div className="sign-up">
      <div className="container">
        <div className="logo text-center py-4">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        {returningUser ? (
          <form onSubmit={handleSubmit(onSubmit)} className="py-3">
            <h1 className="lead text-center py-3">Добро пожаловать</h1>
            {auth.user != null && (
              <p className="text-danger">* {auth.user.error}</p>
            )}

            <div className="form-group">
              <input
                name="email"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Электронная почта"
              />
              {errors.email && <span className="error">Введите электронную почту</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                ref={register({ required: true })}
                placeholder="Пароль"
              />
              {errors.password && (
                <span className="error">Введите пароль</span>
              )}
            </div>

            <div className="form-group">
              <button className="btn btn-danger btn-block" type="submit">
                Войти
              </button>
            </div>
            <button
              className="btn btn-success  btn-block"
              onClick={auth.signInWithGoogle}
            >
              Войти через Google
            </button>
            <div className="option text-center my-3">
              <label className="btn btn-success  btn-block text-white" onClick={() => setReturningUser(false)}>
                Создать новый аккаунт
              </label>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="py-5">
            {auth.user != null && (
              <p className="text-danger">* {auth.user.error}</p>
            )}

            <div className="form-group">
              <input
                name="name"
                className="form-control"
                ref={register({
                  required: "Name is required",
                })}
                placeholder="Логин"
              />
            </div>

            <div className="form-group">
              <input
                name="email"
                className="form-control"
                ref={register({
                  required: "Введите почту",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Некорректная почта",
                  },
                })}
                placeholder="Почта"
              />
              <span className="error">
                {errors.email && errors.email.message}
              </span>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="пароль"
              />
              <span className="error">
                {errors.password && errors.password.message}
              </span>
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirm_password"
                className="form-control"
                ref={register({
                  validate: (value) => value === watch("password"),
                })}
                placeholder="Подтвердите пароль"
              />
              {errors.confirm_password && (
                <span className="error">Пароль не подходит</span>
              )}
            </div>

            <div className="form-group">
              <button className="btn btn-danger btn-block" type="submit">
                Зарегистрироваться
              </button>
            </div>

            <div className="option text-center my-3">
              <label onClick={() => setReturningUser(true)}>
                Войти
              </label>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
