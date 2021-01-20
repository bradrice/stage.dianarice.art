import Head from 'next/head'
import styles from './layout.module.scss'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Header from './header/Header'

export default function Layout({ children }) {
    return (
        <div className={styles.layout}>
            <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta
            name="description"
            content="Diana Rice, Artist" />
            <title>Diana Rice, Artist</title>

        </Head>
        <Header/>
        <div className="container-fluid">
        <div className="main">{children}</div>
        </div>
        </div>
    )
  }
  