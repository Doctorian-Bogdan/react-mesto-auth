import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopup({ isOpen, onClose, onDelete, deletableCard }) {

  function handleSubmit(e) {
    e.preventDefault();

    onDelete(deletableCard);
  }

  return (
    <PopupWithForm
      title={'Вы уверены?'}
      name={'delete'}
      buttonText={'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeletePopup
