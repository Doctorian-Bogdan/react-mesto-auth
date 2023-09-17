import logo from "../images/logo.svg";
import {Link, NavLink, useNavigate} from "react-router-dom";

function Header({email, setLoggedIn, loggedIn}) {
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate("/sign-in");
  }

  return (
    <header className="header">
      <img src={logo} alt="логотип место" className="header__logo"/>
      {
        loggedIn ? (
          <div className="header__container">
            <p className="header__email">
              {email}
            </p>
            <Link to={"/sign-in"} onClick={handleSignOut} className="header__button">
              Выйти
            </Link>
          </div>
        ) : (
          <>
            <NavLink to="/sign-in" className={({isActive}) => `${isActive ? "header__link_active" : "header__link"}`}>
              Войти
            </NavLink>
            <NavLink to="/sign-up" className={({isActive}) => `${isActive ? "header__link_active" : "header__link"}`}>
              Регистрация
            </NavLink>
          </>
        )
      }
    </header>
  );
}

export default Header
