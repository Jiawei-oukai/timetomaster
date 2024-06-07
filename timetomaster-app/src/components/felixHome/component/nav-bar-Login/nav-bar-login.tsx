import React from "react";
import Link from "next/link";
import style from "./nav-bar-login.module.scss";
import Image from "next/image";
import logo from "src/images/png/logo-no-background.png";

export default function NavBarLogin() {
  return (
    <nav className={style.navbar}>
      <div className={style.navLogo}>
        <Link href="/">
          <Image src={logo} width={100} height={100} alt="Logo" />
        </Link>
      </div>
      <ul className={style.navList}>
        <li className={style.navItem}>
          <Link href="/home" className={style.navLink}>
            Home
          </Link>
        </li>
        <li className={style.navItem}>
          <Link href="/motivation" className={style.navLink}>
            Motivation
          </Link>
        </li>
        <li className={style.navItem}>
          <Link href="/goal" className={style.navLink}>
            Goals
          </Link>
        </li>
        <li className={style.navItem}>
          <Link href="/account" className={style.navLink}>
            Account
          </Link>
        </li>
      </ul>
    </nav>
  );
}
