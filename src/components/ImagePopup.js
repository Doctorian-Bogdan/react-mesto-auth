function ImagePopup({ card, onClose}) {
  return (
    <div className={`popup popup_bg_darker ${card.link && "popup_opened"}`} id="imagePopup">
      <div className="popup__wrapper">
        <img className="popup__image" src={card.link} alt={card.name} />
        <button className="popup__close-button" onClick={onClose} id="closeImagePopup" type="button">

        </button>
        <p className="popup__subtitle">
          {card.name}
        </p>
      </div>
    </div>
  );
}

export default ImagePopup
