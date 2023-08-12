import React from 'react';
import classes from './Header.module.css'
import Image from "next/image";
import Search from "../Search/Search";

const Header = () => {
    return (
        <header>
            <div className={classes.main__container}>
                <div className={classes.logo__container}>
                    <a href='http://khsu.ru/'>
                        <Image className={`${classes.clicked} ${classes.img}`} src='/logo.svg' alt='Логотип ХГУ' width={60} height={60}/>
                    </a>
                    <h1 className={`${classes.logo__title} ${classes.clicked}`}>расписание</h1>
                </div>
                <Search/>
            </div>
        </header>
    );
};

export default Header;