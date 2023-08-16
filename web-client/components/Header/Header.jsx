import classes from './Header.module.css'
import Image from "next/image";
import Search from "../Search/Search";
import Link from "next/link";
import classesMainContainer from '../Containers/MainContainer.module.css'

const Header = ({search, onClickToBurger}) => {

    return (
        <header>
            <div className={`${classes.main__container} ${classesMainContainer.main__container}`}>
                <div onClick={()=>onClickToBurger(true)} className={classes.burger}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className={classes.logo__container}>
                    <a href='http://khsu.ru/'>
                        <Image className={`${classes.clicked} ${classes.img}`} src='/logo.svg' alt='Логотип ХГУ' width={60} height={60}/>
                    </a>
                    <Link href='/' className='link'>
                        <h1 className={`${classes.logo__title} ${classes.clicked}`}>расписание</h1>
                    </Link>
                </div>
                <Search myClass={'display__none'} array={search}/>
            </div>

        </header>
    );
};

export default Header;