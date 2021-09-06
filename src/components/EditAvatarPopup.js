import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props){
  const [buttonText, setButtonText] = React.useState("Сохранить");
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Загрузка...");
    props
      .onUpdateAvatar({ avatar: avatarRef.current.value })
      .then(() => {
        handleClosePopup();
      })
      .finally(() => {
        setButtonText("Сохранить");
      });
  }

  function handleClosePopup() {
    props.onClose();
    setTimeout(() => (avatarRef.current.value = ""), 200);
  }
    
    return(
        <PopupWithForm  name="popup_avatar"  title ="Обновить аватар" submitText={buttonText} onSubmit={handleSubmit} isOpen={props.isOpen} onClose={handleClosePopup}>
          <fieldset className="form__input-container">
            <div className="form__item-container">
              <input
                type="url"
                className="form__item form__item_type_link-avatar"
                id="link-input-avatar"
                name="avatar"
                ref={avatarRef} 
                placeholder="Ссылка на картинку"
                required
              />
              <span className="form__input-error link-input-avatar-error" />
            </div>
          </fieldset>
        </PopupWithForm>
    )
}
export default EditAvatarPopup;


