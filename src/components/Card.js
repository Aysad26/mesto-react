import React from 'react';
import Trash from '../images/Trash.svg'

function Card(props) {
  
  function handleClick() {
    props.onClick(props.dataCards);
  }  

    return(
      <li className="elements__item">
        <button className="elements__remove elements__remove_inactive" style={{ backgroundImage: `url(${Trash})` }} type="button" />
        <img className="elements__image" src={props.dataCards.link} alt={props.name} onClick={handleClick} />
        <div className="elements__info">
          <h2 className="elements__title">{props.dataCards.name}</h2>
          <div className="elements__like-container">
            <button className="elements__like" type="button" />
            <p className="elements__like-counter">{props.dataCards.likes.length}</p>
          </div>
        </div>
      </li>
  )
}

export default Card