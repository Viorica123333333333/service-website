import SkipLink from '../components/common/SkipLink';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import PageMeta from '../components/common/PageMeta';
import { business } from '../config/business';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <>
      <PageMeta
        title={`Pagina nu a fost găsită | ${business.name}`}
        description="Pagina solicitată nu a putut fi găsită."
        path="/404"
        noindex
      />
      <SkipLink />
      <Header />
      <main id="continut-principal" className="container">
        <div className={styles.wrapper}>
          <p className={`eyebrow ${styles.eyebrow}`}>Eroare 404</p>
          <h1 className={styles.title}>Pagina nu a fost găsită</h1>
          <p className={styles.text}>
            Ne pare rău, pagina pe care o căutați nu există sau a fost mutată. Reveniți la
            pagina principală sau contactați-ne direct pentru orice întrebare legată de montajul
            mobilei dumneavoastră.
          </p>
          <div className={styles.actions}>
            <a href="/" className="btn btn-primary">
              Înapoi la pagina principală
            </a>
            <a href={business.phoneHref} className="btn btn-secondary">
              Sunați acum
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
