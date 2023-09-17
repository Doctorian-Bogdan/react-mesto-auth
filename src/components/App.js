import React, { useState, useEffect }  from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import Loader from "./Loader";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deletableCard, setDeletableCard] = useState({});
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoaderOpen, setLoaderOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setLoaderOpen(true);

    if(loggedIn) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser(res)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
          setLoaderOpen(false);
        })
      api.getInitialCards()
        .then((res) => {
          setCards(res)
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
          setLoaderOpen(false);
        })
    }
  }, [loggedIn]);

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setDeletePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
    setDeletableCard({});
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleDeleteClick(card) {
    setDeletePopupOpen(true);
    setDeletableCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    setLoaderOpen(true);

    if(!isLiked) {
      api.setLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
          setLoaderOpen(false);
        })
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
          setLoaderOpen(false);
        })
    }
  }

  function handleCardDelete(card) {
    setLoaderOpen(true);

    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        setLoaderOpen(false);
      })
  }

  function handleUpdateUser({name, about}) {
    setLoaderOpen(true);

    api.editUserInfo(name, about)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        setLoaderOpen(false);
      })
  }

  function handleUpdateAvatar({ avatar }) {
    setLoaderOpen(true);

    api.updateProfilePicture(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        setLoaderOpen(false);
      })
  }

  function handleAddPlace({ name, link }) {
    setLoaderOpen(true);

    api.addNewCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        setLoaderOpen(false);
      })
  }

  function handleAuthorize({ email, password }) {
    setLoaderOpen(true);

    auth.authorize(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setEmail(email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setSuccess(false);
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        setLoaderOpen(false);
      })
  }

  function handleRegister({ email, password }) {
    setLoaderOpen(true);

    auth.register(email, password)
      .then(() => {
        setSuccess(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        setSuccess(false);
        console.log(`Ошибка: ${err}`)
      })
      .finally(() => {
        setInfoTooltipOpen(true);
        setLoaderOpen(false);
      })
  }

  function handleTokenCheck() {
    setLoaderOpen(true);

    const token = localStorage.getItem('token');
    if(token) {
      auth.checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate("/",{replace: true});
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        })
        .finally(() => {
          setLoaderOpen(false);
        })
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={email}
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
        />

        <Routes>
          <Route
            path="*"
            element={<Navigate to="/sign-in" />}
          />

          <Route
            path="sign-in"
            element={<Login onSubmit={handleAuthorize}/>}
          />

          <Route
            path="sign-up"
            element={<Register onSubmit={handleRegister} />}
          />

          <Route
            path="/"
            element={
            <ProtectedRoute
              loggedIn={loggedIn}
              element={Main}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDeleteClick={handleDeleteClick}
              cards={cards}
            />
            }
          />
        </Routes>

        {loggedIn && <Footer />}

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
          deletableCard={deletableCard}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />

        <Loader
          isOpen={isLoaderOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
