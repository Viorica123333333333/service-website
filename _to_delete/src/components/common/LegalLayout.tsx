import type { PropsWithChildren } from 'react';
import SkipLink from './SkipLink';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './LegalLayout.module.css';

interface LegalLayoutProps {
  title: string;
  lastUpdatedPlaceholder?: string;
}

export default function LegalLayout({
  title,
  lastUpdatedPlaceholder = '[DATA ULTIMEI ACTUALIZĂRI]',
  children,
}: PropsWithChildren<LegalLayoutProps>) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="continut-principal" className="container">
        <div className={styles.wrapper}>
          <div className={styles.disclaimer} role="note">
            <strong>Notă importantă</strong>
            Acest text este un model informativ, orientativ, destinat unei afaceri individuale
            din Republica Moldova. Nu reprezintă consultanță juridică și trebuie verificat și
            adaptat de un specialist în legislația aplicabilă din Republica Moldova (protecția
            datelor cu caracter personal, comerț electronic, drepturile consumatorilor și
            comunicări comerciale) înainte de publicarea site-ului.
          </div>

          <h1 className={styles.title}>{title}</h1>
          <p className={styles.updated}>Ultima actualizare: {lastUpdatedPlaceholder}</p>

          <div className={styles.content}>{children}</div>

          <a href="/" className={`btn btn-secondary ${styles.backLink}`}>
            Înapoi la pagina principală
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
