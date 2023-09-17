import React, {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link
    })
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      title={'Новое место'}
      name={'addPlace'}
      buttonText={'Добавить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          type="text"
          className="popup__input"
          id="placeNameInput"
          name="name"
          placeholder="Название"
          value={name}
          onChange={handleNameChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__error placeNameInput-error"/>
        <input
          type="url"
          className="popup__input"
          id="placeLinkInput"
          name="link"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleLinkChange}
          required
        />
        <span className="popup__error placeLinkInput-error"/>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup
