import React, { useContext }  from 'react';
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDeleteClick,
  cards
}) {
  const currentUser = useContext(CurrentUserContext);

  const initialCards = cards.map((card) => (
    <Card
      card={card}
      key={card._id}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDeleteClick={onCardDeleteClick}
    />
    ));

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__picture-container">
            <img src={currentUser.avatar} alt="аватар" className="profile__picture" />
            <div className="profile__picture-overlay" onClick={onEditAvatar}></div>
          </div>
          <div className="profile__about">
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit-btn" type="button" onClick={onEditProfile} />
            </div>
            <p className="profile__bio">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__button" type="button" onClick={onAddPlace} />
      </section>
      <section className="gallery">
        {initialCards}
      </section>
    </main>
  );
}

export default Main
