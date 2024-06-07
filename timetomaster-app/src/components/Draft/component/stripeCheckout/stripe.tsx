import React from "react";
import style from "./stripe.module.scss";
import { stripeCreateSession } from "../../services/strip-rest-service";

export default function StipeCheckOut() {
  
  const handleOnclick = async (event:any) => {
    
    try {
 const url: any = await stripeCreateSession("/stripe-payment-intent");
    window.alert(url)
    } catch (error) {
      window.alert(error)
    }
    event.preventDefault();
    //window.location.href = url.url  
 }

  return (
    <div>
      <form>
        <button onClick={handleOnclick}>Pay Now</button>
      </form>
    </div>
  );
}
