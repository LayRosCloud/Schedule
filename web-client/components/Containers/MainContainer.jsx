import Header from "../Header/Header";
import classes from './MainContainer.module.css'
import Head from "next/head";

const MainContainer = ({children, search}) => {
    return (
        <>
            <Head>
                <title>Расписание</title>
                <link rel="shortcut icon" href="/logo.png" type="image/x-icon"/>
            </Head>
            <Header search={search}/>
            <main className={classes.main__container}>
                {children}
            </main>
        </>
    );
};

export default MainContainer;