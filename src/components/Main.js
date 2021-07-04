import '../index.css';
import React from 'react';
import editIcon from '../images/edit-icon.svg';
import addIcon from '../images/add-icon.svg';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {

  const [userName, setUserName] = React.useState('');
  const [userDescription , setUserDescription ] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  React.useEffect(()=>{
    api.getUserInfo()
    .then(res=>{
      setUserName(res.name)
      setUserDescription(res.about)
      setUserAvatar(res.avatar)
    })
    .catch(res=>{
      console.log(`Error:${res}`)
    })
  },[])

  const [cards, setCards] = React.useState([])

  React.useEffect(()=>{
    api.getCards()
    .then(res =>{
      setCards(res)
    })
    .catch(res=>{
      console.log(`Error:${res}`)
    })
  }
  ,[])

 
  return (
  <>
    <main className="main">
    <section className="profile">
      <div className="profile__info">
        <div className="profile__avatar">
          <button type="button" className="profile__overlay" onClick={props.onEditAvatar}>
            <img
              className="profile__icon"
              src={editIcon}
              alt="иконка редактирования профиля"
            />
          </button>
          <img
            className="profile__image"
            src={userAvatar}
            alt="Фото профиля"
          />
        </div>
        <div>
          <div className="profile__container">
            <h1 className="profile__title">{userName}</h1>
            <button className="button button_type_edit" onClick={props.onEditProfile} type="button" />
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
      </div>
      <button type="button" className="button button_type_add" onClick={props.onAddPlace} >
        <img
          className="button__add-icon"
          src={addIcon}
          alt="Иконка добавить"
        />
      </button>
    </section>
    <section className="elements">
      <ul className="elements__grid">
        {cards.map((item) => (
          <Card key={item._id} dataCards={item} onClick={props.onCardClick}/>
          ))}
        
      </ul>
    </section>
  </main>
    
  <template className="element__item-template" />
</>
  
  );
}

export default Main;