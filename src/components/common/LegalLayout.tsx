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
  lastUpdatedPlaceholder = '[DATE OF LAST UPDATE]',
  children,
}: PropsWithChildren<LegalLayoutProps>) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="continut-principal" className="container">
        <div className={styles.wrapper}>
          <div className={styles.disclaimer} role="note">
            <strong>Important note</strong>
            This text is an informative, non-final template intended for an individual
            business based in Moldova. It does not constitute legal advice and must be
            reviewed and adapted by a specialist in the applicable Moldovan legislation
            (personal data protection, e-commerce, consumer rights and commercial
            communications) before the site is published.
          </div>

          <h1 className={styles.title}>{title}</h1>
          <p className={styles.updated}>Last updated: {lastUpdatedPlaceholder}</p>

          <div className={styles.content}>{children}</div>

          <a href="/" className={`btn btn-secondary ${styles.backLink}`}>
            Back to the home page
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
