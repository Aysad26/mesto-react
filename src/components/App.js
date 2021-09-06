import React from 'react';
import api from '../utils/Api';
import '../index.css';
import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { CurrentCardsContext} from '../contexts/CurrentCardsContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteSubmitPopup from './DeleteSubmitPopup';


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

  const [deleteSubmitPopup, setDeleteSubmitPopup] = React.useState(false);
  const [deleteCard, setDeleteCard] = React.useState({});
  function handleDeleteSubmitPopup (card){
    setDeleteCard(card)
    setDeleteSubmitPopup(true)
  }

  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false); 

  const [selectedCard, setSelectedCard] = React.useState({});

  const [cards, setCards] = React.useState([]);
  
  function handleCardClick(dataCards) { 
    setSelectedCard(dataCards); 
    setImagePopupOpen(true); 
  } 

 function closeAllPopups(){
    setIsEditProfilePopupOpen (false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setImagePopupOpen(false);
    setSelectedCard({})
    setDeleteSubmitPopup(false)
  }

  React.useEffect(() => {
    const handleEsc = (event) => {
      const btnEscape = 27;
       if (event.keyCode === btnEscape) {
        closeAllPopups()
      }
    };

    if (isEditProfilePopupOpen === true || isEditAvatarPopupOpen === true || isAddPlacePopupOpen === true || isImagePopupOpen === true) {
      window.addEventListener('keydown', handleEsc);
    };

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
    
  }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, isImagePopupOpen]);

  const [currentUser,setCurrentUser] = React.useState({})

  React.useEffect(()=>{
    api.getUserInfo()
    .then(res =>{
      setCurrentUser(res)
    })
    .catch(res=>{
      console.log(`Ошибка:${res}`)
    })
  },[])

  function handleUpdateUser (e){
    api.changeUserInfo(e)
    .then((res)=>{
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch(res=>{
      console.log(`Ошибка:${res}`)
    })
  }

  function handleUpdateAvatar(e){
    api.changeUserImage(e)
    .then((res)=>{
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch(res=>{
      console.log(`Ошибка:${res}`)
    })
  }

  const [currentCards,setCurrentCards] = React.useState([])
  
  React.useEffect(()=>{
    api.getCards()
    .then( res =>{
      setCurrentCards(res)
    })
    .catch(res=>{
      console.log(`Error:${res}`)
    })
  },[])

 
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch(res=>{
        console.log(`Error:${res}`)
      });
  }

 
  function handleCardDelete (card) {
    const isOwn = card.owner._id === currentUser._id;
    api.changeCardStatus(card._id, isOwn)
    .then((newCard) => {
      setCurrentCards((currentCards) => [...currentCards].filter((c) => c._id === card._id ? console.log(newCard) : c));
      closeAllPopups();
    }).catch(res=>{
      console.log(`Error:${res}`)
    });

   }


   function handleAddPlaceSubmit(e){
    api.addCard(e)
    .then( newCard =>{
      setCurrentCards([newCard, ...currentCards]);
      closeAllPopups();
    })
    .catch(newCard=>{
      console.log(`Error:${newCard}`)
    })
   }

  return (
  <div className="root">
    <CurrentCardsContext.Provider value={currentCards}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main 
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddCard ={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards = {currentCards} 
          onCardLike ={handleCardLike}
          onCardDelete ={handleDeleteSubmitPopup}
        />
        <Footer />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
        <DeleteSubmitPopup 
                card={deleteCard} 
                isOpen={deleteSubmitPopup}
                onClose={closeAllPopups}
                onCardDelete={handleCardDelete}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
      </CurrentUserContext.Provider>
    </CurrentCardsContext.Provider>
  </div>
  );
}

export default App;
