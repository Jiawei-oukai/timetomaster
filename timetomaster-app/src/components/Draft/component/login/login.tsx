import React, { useState } from "react";
import { AuthCustomer } from "../../services/authCustomer-service";
import style from "./login.module.scss";

const LoginForm = () => {
  // State variables to capture user input for each field
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    const requestBody = {
      email: email,
      password: password,
    };

    const requestURI = "/customers/auth-customer";
    try {
      const jwt: any = await AuthCustomer(requestURI, requestBody);
      localStorage.setItem("token", jwt);
      window.location.href = "/home"

    } catch (error: any) {

        window.alert(error.response);
      
    }

 
    //todo: error validation
    //fix cross origin error
  };

  return (
    <div className={style.container}>
      <h1>Login</h1>
      <form onSubmit={handleOnSubmit}>
        {errorMessage && (
          <div className={style.error_message}>{errorMessage}</div>
        )}
        <div className={style.formgroup}>
          <label htmlFor="username">Email Address</label>
          <input
            autoFocus
            id="username"
            type="text"
            className={style.form_control}
            placeholder="john.doe@example.com"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={style.formgroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className={style.form_control}
            placeholder="Enter you password here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={style.btn_primary}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
