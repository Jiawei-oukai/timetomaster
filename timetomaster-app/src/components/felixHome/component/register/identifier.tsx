"use client";
import React from "react";
import Image from "next/image";
import style from "./register.module.scss";
import logo from "src/images/png/logo-white.png";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupIdentifier = () => {
  const router = useRouter();

  const handleEmailFormSubmit = async (e:any) => {
    e.preventDefault();
    router.push("/register");
  };

    const handleGoogleFormsubmit = (e:any) => {
        e.preventDefault();
  };

  return (
    <div className={style.Identifier}>
      <div>
        <Image
          src={logo}
          width={200}
          height={200}
          alt="Logo"
        />
      </div>
      <div>
        <form onSubmit={handleEmailFormSubmit}>
          <button type="submit" className={style.btn_primary}>
            Sign up with your email address
          </button>
        </form>
      </div>
      <div className={style.IdentifierText}>
        <h3>
          Already have an account?
          <Link href={"/login"} id={style.signupRedirection}>
            {" "}
            Login
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

export default SignupIdentifier;
