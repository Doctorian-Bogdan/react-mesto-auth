import React, {useContext, useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() =>{
    setName(currentUser.name);
    setDescription(currentUser.about);
  },[currentUser, isOpen])

  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'edit'}
      buttonText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          type="text"
          className="popup__input"
          id="nameInput"
          name="name"
          value={name || ''}
          onChange={handleNameChange}
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error nameInput-error" />
        <input
          type="text"
          className="popup__input"
          id="bioInput"
          name="bio"
          value={description || ''}
          onChange={handleDescriptionChange}
          placeholder="Ваш род деятельности"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="popup__error bioInput-error" />
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup
