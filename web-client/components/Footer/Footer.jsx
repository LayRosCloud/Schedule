import classes from './Footer.module.css'
import {useRouter} from "next/router";

const Footer = () => {
    const router = useRouter();
    return (
        <div className={classes.container}>
            <h4 className={classes.title}>связаться с разработчиками</h4>
            <div className={classes.container__inner}>
                <div onClick={()=>router.push('https://vk.com/liraaex')} className={classes.link__container}>
                    <p className={classes.link}>ВС</p>
                </div>
                <div onClick={()=>router.push('https://vk.com/de1us1on')} className={classes.link__container}>
                    <p className={classes.link}>МЖ</p>
                </div>
                <div onClick={()=>router.push('https://vk.com/petukhov2001')} className={classes.link__container}>
                    <p className={classes.link}>СП</p>
                </div>
            </div>
            <p className={classes.title}>Все права принадлежат <b>ХГУ</b> с 2023 г.</p>
        </div>

    );
};

export default Footer;