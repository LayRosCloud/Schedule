import Header from "../Header/Header";
import classes from './MainContainer.module.css'
import Head from "next/head";
import {useEffect, useState} from "react";
import Search from "../Search/Search";
import Link from "next/link";
import Footer from "../Footer/Footer";

const MainContainer = ({children, search}) => {
    const [isActiveSideMenu,setIsActiveSideMenu] = useState(false)

    useEffect(()=>{
        window.addEventListener(`resize`, event => {
            if(event.currentTarget.innerWidth > 600){
                setIsActiveSideMenu(false)
            }
        }, false);
    },[])

    const clickBurger = (value) => {
        setIsActiveSideMenu(value)
    }

    return (
        <>
            <Head>
                <title>Расписание</title>
                <link rel="shortcut icon" href="/logo.png" type="image/x-icon"/>
            </Head>

            <Header search={search} onClickToBurger={clickBurger}/>
            {isActiveSideMenu
                ?<div>
                    <div className={classes.back} onClick={()=>clickBurger(false)}></div>
                    <div className={classes.container}>
                        <div className={classes.side__menu}>
                            <div onClick={()=>clickBurger(false)} className={classes.burger}>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div className={classes.logo__schedule}>
                                <Link href='/' className='link'>
                                    <h1>расписание</h1>
                                </Link>
                            </div>
                            <Search array={search} setIsActiveSideValue={setIsActiveSideMenu}/>
                        </div>
                    </div>
                </div>
                :''}


            <main className={classes.main__container}>
                {children}
            </main>

            <Footer/>
        </>
    );
};

export default MainContainer;