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
                <div className={styles.logo}>
                    logo
                </div>

                <div className={styles.navbar}>

                    <div className={styles.tab}>
                    <Link className={selectedTab === 'Today' ? styles.selectedLink : styles.normalLink} to="/home">
                        Today
                    </Link>
                    </div>
                    <div className={styles.tab}>
                    <Link className={selectedTab === 'Goals' ? styles.selectedLink : styles.normalLink} to="/goals">
                        Goals
                    </Link>
                    </div>
                    <div className={styles.tab}>
                    <Link className={selectedTab === 'Statistics' ? styles.selectedLink : styles.normalLink} to="/statistics">
                        Statistics
                    </Link>
                    </div>
                    <div className={styles.tab}>
                    <Link className={selectedTab === 'Achievement' ? styles.selectedLink : styles.normalLink} to="/jl">
                        Achievement
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
