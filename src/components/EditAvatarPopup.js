import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'profile'}
      buttonText={'Обновить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          type="url"
          className="popup__input"
          id="profileLinkInput"
          name="link"
          placeholder="Ссылка на картинку"
          ref={avatarRef}
          required
        />
        <span className="popup__error profileLinkInput-error" />
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup
