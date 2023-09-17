import React, {useState} from "react";
import {Link} from "react-router-dom";

function Register({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({ email, password });
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="auth__input"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          className="auth__input"
          placeholder="Пароль"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button className="auth__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="auth__text">
        Уже зарегистрированы?{" "}
        {
          <Link to="/sign-in" className="auth__link" >
            Войти
          </Link>
        }
      </p>
    </section>
  );
}

export default Register
