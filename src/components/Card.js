import React, {useContext, useRef, useState} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDeleteClick}) {
  const currentUser = useContext(CurrentUserContext);
  const [isBadImage, setBadImage] = useState(false);
  const imgRef = useRef();

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `gallery__like ${isLiked && 'gallery__like_active'}`
  );

  function handleClick() {
    if (isBadImage) {
      onCardClick({
        ...card,
        link: 'https://img.freepik.com/free-vector/glitch-error-404-page-background_23-2148072533.jpg'
      });
    } else {
      onCardClick(card);
    }
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDeleteClick(card)
  }

  function handleError() {
    imgRef.current.src = 'https://img.freepik.com/free-vector/glitch-error-404-page-background_23-2148072533.jpg';
    setBadImage(true);
  }

  return (
    <div className="gallery__card">
      <img className="gallery__image" onClick={handleClick} onError={handleError} ref={imgRef} src={card.link}
           alt={card.name}/>
      <div className="gallery__image-info">
        <h2 className="gallery__title">
          {card.name}
        </h2>
        <div className="gallery__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"/>
          <span className="gallery__like-count">
            {card.likes.length}
          </span>
        </div>
      </div>
      {isOwn && <button className="gallery__delete-btn" onClick={handleDeleteClick} type="button"/>}
    </div>
  );
}

export default Card
