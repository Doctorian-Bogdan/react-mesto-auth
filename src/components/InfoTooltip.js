import React from "react";
import iconSuccess from "../images/icon__success.svg"
import iconBad from "../images/icon__bad.svg"

function InfoTooltip({isOpen, onClose, isSuccess}) {

  return (
    <div className={`popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <img src={isSuccess ? iconSuccess : iconBad}
             alt={isSuccess ? "иконка успешной регистрации" : "иконка неудавшейся регистрации"}
             className="popup__icon"/>
        <h2 className="popup__title popup__title_centered">
          {isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button className="popup__close-button" type="button" onClick={onClose}/>
      </div>
    </div>
  );
}

export default InfoTooltip
