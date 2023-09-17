function PopupWithForm({ title, name, buttonText, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} id={`${name}Popup`}>
      <div className="popup__container">
        <h2 className="popup__title">
          {title}
        </h2>
        <form className="popup__form" id={`${name}Form`} onSubmit={onSubmit}>
          {children}
          <button className="popup__button" type="submit">
            {buttonText}
          </button>
        </form>
        <button className="popup__close-button" id={`close${name}Popup`} type="button" onClick={onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm
