import React from "react";
import style from  "./goodbye.module.scss"


const GoodbyeMessage = () => {
    return (
      <div className={style.goodbyeMessage}>
        <p>
          We are Sad to see you go. You can re-signup anytime you want to do so.
        </p>
        <p>Goodbye!!</p>
      </div>
    );
}

export default GoodbyeMessage;