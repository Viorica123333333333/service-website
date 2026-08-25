import { business } from '../../config/business';
import { navItems } from '../../config/nav';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <p className={styles.brand}>{business.name}</p>
            <p>{business.fullName}</p>
            <p>
              Montaj mobilă și dulapuri în {business.baseLocation} și în alte localități din
              Republica Moldova ({business.servedAreas}).
            </p>
          </div>

          <div>
            <p className={styles.columnTitle}>Navigare</p>
            <ul className={styles.linkList}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={styles.columnTitle}>Contact</p>
            <ul className={styles.linkList}>
              <li>
                <a href={business.phoneHref}>{business.phone}</a>
              </li>
              <li>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </li>
              <li>
                <a href={business.whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>{business.workingHours}</li>
              {business.registrationDetails && <li>{business.registrationDetails}</li>}
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>
            © {currentYear} {business.name}. Toate drepturile rezervate.
          </p>
          <nav aria-label="Legal">
            <ul className={styles.legalLinks}>
              <li>
                <a href="/politica-de-confidentialitate">Politica de confidențialitate</a>
              </li>
              <li>
                <a href="/politica-cookie">Politica privind modulele cookie</a>
              </li>
              <li>
                <a href="/termeni-si-conditii">Termeni și condiții</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
