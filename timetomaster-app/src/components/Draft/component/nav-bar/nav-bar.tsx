import React from "react";
import Link from "next/link";
import style from "./nav-bar.module.scss";
import Image from "next/image";
import logo from "src/images/png/logo-no-background.png";

export default function NavBarIndex() {
  return (
    <nav className={style.navbar}>
      <div className={style.navLogo}>
        <Link href="/">
          <Image src={logo} width={100} height={100} alt="Logo" />
        </Link>
      </div>
      <ul className={style.navList}>
        <li className={style.navItem}>
          <Link href="/" className={style.navLink}>
            Get Started
          </Link>
        </li>
        <li className={style.navItem}>
          <Link href="/learn" className={style.navLink}>
            Learn More
          </Link>
        </li>
        <li className={style.navItem}>
          <Link href="/register" className={style.navLink}>
            Sign Up
          </Link>
        </li>
        <li className={style.navItem}>
          <Link href="/login" className={style.navLink}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}
