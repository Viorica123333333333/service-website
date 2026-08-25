import { useEffect, useRef, useState } from 'react';
import { business } from '../../config/business';
import { navItems } from '../../config/nav';
import { useScrollLock } from '../../hooks/useScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import Icon from '../common/Icon';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useScrollLock(isMenuOpen);
  useFocusTrap(drawerRef, {
    active: isMenuOpen,
    onClose: () => setIsMenuOpen(false),
    returnFocusRef: menuButtonRef,
  });

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#hero" className={styles.logo}>
          {business.name}
        </a>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.desktopNavList}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.desktopNavLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <a href="#contact" className={`btn ${styles.headerCta}`}>
            Request a quote
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuToggle}
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
            aria-controls="meniu-mobil"
            onClick={() => setIsMenuOpen(true)}
          >
            <Icon name="menu" />
            <span className="visually-hidden">Open navigation menu</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div className={styles.overlay} onClick={closeMenu} />
          <div
            id="meniu-mobil"
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            ref={drawerRef}
          >
            <div className={styles.drawerHeader}>
              <span className={styles.logo}>{business.name}</span>
              <button
                type="button"
                className={styles.menuToggle}
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <Icon name="close" />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              <ul className={styles.drawerNavList}>
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={styles.drawerNavLink} onClick={closeMenu}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.drawerActions}>
              <a href="#contact" className="btn btn-primary" onClick={closeMenu}>
                Request a quote
              </a>
              <a href={business.phoneHref} className="btn btn-secondary" onClick={closeMenu}>
                <Icon name="phone" />
                Call now
              </a>
              <a
                href={business.whatsappHref}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                <Icon name="whatsapp" />
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
