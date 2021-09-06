import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup (props){
  const [buttonText, setButtonText] = React.useState("Создать");
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleLinkChange(e) {
    setLink(e.target.value);
  }
  function handleClosePopup() {
    props.onClose();
    setTimeout(() => {
      setName("");
      setLink("");
    }, 200);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Сохранение...");
    props
      .onAddPlace({ name, link })
      .then(() => handleClosePopup())
      .finally(() => {
        setButtonText("Создать");
      });
  }

    return(
        <PopupWithForm name ="popup_add-cards "  title ="Новое место" submitText={buttonText} onClose={handleClosePopup} onSubmit={handleSubmit} isOpen={props.isOpen} onClose={props.onClose}>
            <fieldset className="form__input-container">
            <div className="form__item-container">
              <input
                type="text"
                className="form__item form__item_type_title"
                id="title-input"
                name="name"
                placeholder="Название"
                onChange={handleNameChange}
                value={name}
                minLength={2}
                maxLength={30}
                required
              />
              <span className="form__input-error title-input-error" />
            </div>
            <div className="form__item-container">
              <input
                type="url"
                className="form__item form__item_type_link"
                id="link-input"
                name="link"
                placeholder="Ссылка на картинку"
                required
                onChange={handleLinkChange}
                value={link}
              />
              <span className="form__input-error link-input-error" />
            </div>
          </fieldset>
        </PopupWithForm> 
    )
}
export default AddPlacePopup ;