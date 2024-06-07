"use client";
import style from "./login.module.scss"
import React, { useState } from "react";
import Image from "next/image";
import "./login.module.scss";
import logo from "src/images/png/logo-white.png";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginIdentifier = () => {
  const router = useRouter();

  const handleEmailFormSubmit = async (e:any) => {
    e.preventDefault();
    router.push("/login");
  };

  const handleGoogleFormsubmit = () => {};

  return (
    <div className={style.Identifier}>
      <div>
        <Image src={logo} width={200} height={200} alt="Logo" />
      </div>
      <div>
        <form onSubmit={handleEmailFormSubmit}>
          <button type="submit" className={style.btn_primary}>
            Login with your email address
          </button>
        </form>
      </div>
      <div className={style.IdentifierText}>
        <h3>
          Don&#39;t have an account?
          <Link href={"/register"} id={style.signupRedirection}>
            {" "}
            Sign Up
          </Link>
        </h3>
      </div>
      <div className={style.IdentifierText}>OR</div>
      <div>
        <form>
          <button type="submit" className={style.btn_primary}>
            <span data-provider="google"></span>
            <span>Continue with Google</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginIdentifier;
