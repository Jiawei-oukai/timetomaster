import styles from './header.module.scss';
import React from 'react';
import { Link } from "react-router-dom";
import settingIcon from './settingicon.png';
import Image from 'next/image';

interface HeaderProps {
    selectedTab: string; 
}

export default function Header({ selectedTab }: HeaderProps) {
    return (
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>logo</div>

          <div className={styles.navbar}>
            <div className={styles.tab}>
              <Link
                className={
                  selectedTab === "GetStarted"
                    ? styles.selectedLink
                    : styles.normalLink
                }
                to="/"
              >
                Get Started
              </Link>
            </div>
            <div className={styles.tab}>
              <Link
                className={
                  selectedTab === "LearnMore"
                    ? styles.selectedLink
                    : styles.normalLink
                }
                to="/"
              >
                Learn More
              </Link>
            </div>
            <div className={styles.tab}>
              <Link
                className={
                  selectedTab === "SignUP"
                    ? styles.selectedLink
                    : styles.normalLink
                }
                to="/register"
              >
                Sign Up
              </Link>
            </div>
            <div className={styles.tab}>
              <Link
                className={
                  selectedTab === "Login"
                    ? styles.selectedLink
                    : styles.normalLink
                }
                to="/login/"
              >
                Login
              </Link>
            </div>
          </div>

          <div className={styles.setting}>
            <Image src={settingIcon} alt="" width={30} height={30} />
          </div>
        </div>
      </header>
    );
}
