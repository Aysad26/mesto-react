import React from 'react';

function DeleteSubmitPopup(props){

  const [buttonText, setButtonText] = React.useState("Да");

 
  function handleSubmit(e) {
    e.preventDefault();
    setButtonText("Сохранение...");
    props
      .onCardDelete(props.card)
      .then(() => handleClosePopup())
      .finally(() => {
        setButtonText("Да");
      });
  }

  function handleClosePopup() {
    props.onClose();
  }

  return(
    <section className={`popup popup_type_remove ${props.isOpen ? "popup_opened":""}`}>
    <div className="popup__window">
      <button type="button" className="button button_type_close" onClick={props.onClose}></button>
      <h2 className="popup__heading">Вы уверены?</h2>
      <form className="form form_type_add" onSubmit={handleSubmit} onClose={handleClosePopup} name="add-form" novalidate>
        <button className="button button_type_submit" type="submit">Да</button>
      </form>
    </div>
    <div className="popup__overlay popup__overlay_add"></div>
  </section>
  )
}
export default DeleteSubmitPopup;