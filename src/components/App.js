import React from 'react';
import '../index.css';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick (){
    setIsEditAvatarPopupOpen(true)
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick (){
     setIsEditProfilePopupOpen (true)
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick (){
    setIsAddPlacePopupOpen(true)
  }

  const [selectedCard, setSelectedCard] = React.useState({});
  const handleCardClick = (card) => {setSelectedCard(card)}

  function closeAllPopups(){
    setIsEditProfilePopupOpen (false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({})
  }

  React.useEffect(() => {
    const handleEsc = (event) => {
      const btnEscape = 27;
       if (event.keyCode === btnEscape) {
        closeAllPopups()
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
  <div className="root">
    <Header />
    <Main 
      onEditAvatar={handleEditAvatarClick}
      onEditProfile={handleEditProfileClick}
      onAddPlace ={handleAddPlaceClick}
      onCardClick={handleCardClick}
    />
    <Footer />
    <PopupWithForm  name ="popup_profile "  title ="Редактировать профиль" submitText="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
      <fieldset className="form__input-container">
        <div className="form__item-container">
          <input
            type="text"
            className="form__item form__item_type_name"
            name="name"
            id="name-input"
            placeholder="Ваше имя"
            minLength={2}
            maxLength={40}
            required
          />
          <span className="form__input-error name-input-error" />
        </div>
        <div className="form__item-container">
          <input
            type="text"
            className="form__item form__item_type_job"
            id="job-input"
            name="job"
            placeholder="Вид деятельности"
            minLength={2}
            maxLength={200}
            required
          />
          <span className="form__input-error job-input-error" />
        </div>
      </fieldset>
    </PopupWithForm>
    <PopupWithForm  name ="popup_add-cards "  title ="Новое место" isOpen={isAddPlacePopupOpen} submitText="Создать" onClose={closeAllPopups}>
      <fieldset className="form__input-container">
        <div className="form__item-container">
          <input
            type="text"
            className="form__item form__item_type_title"
            id="title-input"
            name="name"
            placeholder="Название"
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
          />
          <span className="form__input-error link-input-error" />
        </div>
      </fieldset>
    </PopupWithForm>
    <PopupWithForm  name ="popup_avatar"  isOpen={isEditAvatarPopupOpen} submitText="Сохранить" onClose={closeAllPopups}>
      <fieldset className="form__input-container">
        <div className="form__item-container">
          <input
            type="url"
            className="form__item form__item_type_link-avatar"
            id="link-input-avatar"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="form__input-error link-input-avatar-error" />
        </div>
      </fieldset>
    </PopupWithForm>
    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
  </div>
  );
}

export default App;
