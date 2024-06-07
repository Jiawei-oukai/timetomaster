import React, { useState } from "react";
import { createCustomer } from "../../services/createCustomer-Rest-Service"; 
import style from "./register.module.scss";

const CreaterCustomerForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [DOB, setDOB] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [phone, setPhone] = useState("");

  const handleConfirmPasswordChange = (e:any) => {
    setConfirmPassword(e.target.value);
    // Check if passwords match whenever the confirm password field is changed
    setPasswordMatch(e.target.value === password);
  };

  const handleOnSubmit = async (event:any) => {
    event.preventDefault();
    const requestBody = {
      password: confirmPassword,
    };
    const requestURI = "/customers";
    await createCustomer(requestURI, requestBody);
    window.alert("usercreated successful!");
    //todo: login on creation
    //todo: validation
  };

  return (
    <div className={style.container}>
      <h1>Register</h1>
      <form onSubmit={handleOnSubmit}>
        <div className={style.formgroup}>
          <label htmlFor="username">Name</label>
          <input
            autoFocus
            id="name"
            type="text"
            className={style.form_control}
            placeholder="John Foo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={style.formgroup}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="text"
            className={style.form_control}
            placeholder="john.foo@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={style.formgroup}>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            className={style.form_control}
            placeholder="57 Stilecroft Drive, North York"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className={style.formgroup}>
          <label htmlFor="username">Date of Birth</label>
          <input
            id="date"
            type="date"
            className={style.form_control}
            placeholder="date"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
          />
        </div>
        <div className={style.formgroup}>
          <label htmlFor="address">Country</label>
          <input
            id="country"
            type="text"
            className={style.form_control}
            placeholder="Canada"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className={style.formgroup}>
          <label htmlFor="address">Telephone Number</label>
          <input
            id="phone"
            type="text"
            className={style.form_control}
            placeholder="6472047368"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={style.formgroup}>
          <label htmlFor="address">Password</label>
          <input
            id="password"
            type="password"
            className={style.form_control}
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={style.formgroup}>
          <label htmlFor="address">Confirm Password</label>
          <input
            id="password"
            type="password"
            className={style.form_control}
            placeholder=""
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {passwordMatch ? (
            <p id="passwordMatch">Passwords match!</p>
          ) : (
            <p id="passwordMissMatch">Passwords do not match!</p>
          )}
        </div>
        <button type="submit" className={style.btn_primary}>
          Submit
        </button>
      </form>
    </div>
  );
};
//todo: disbable submit button if any field is missing or password not match
export default CreaterCustomerForm;
