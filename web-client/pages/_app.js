import '../styles/global.css'

import {start} from '../api/index'
start()

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}