import React from 'react';
import Header from "../Header/Header";
import classes from './MainContainer.module.css'

const MainContainer = ({children}) => {
    return (
        <>
            <Header/>
            <main className={classes.main__container}>
                {children}
            </main>
        </>
    );
};

export default MainContainer;