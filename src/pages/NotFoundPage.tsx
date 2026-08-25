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
        title={`Page not found | ${business.name}`}
        description="The requested page could not be found."
        path="/404"
        noindex
      />
      <SkipLink />
      <Header />
      <main id="continut-principal" className="container">
        <div className={styles.wrapper}>
          <p className={`eyebrow ${styles.eyebrow}`}>404 error</p>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.text}>
            Sorry, the page you're looking for doesn't exist or has been moved. Return to
            the home page, or get in touch with us directly for any question about your
            furniture assembly.
          </p>
          <div className={styles.actions}>
            <a href="/" className="btn btn-primary">
              Back to the home page
            </a>
            <a href={business.phoneHref} className="btn btn-secondary">
              Call now
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
