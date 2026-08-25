import { useState } from 'react';
import { faqItems } from '../../config/faq';
import Icon from '../common/Icon';
import styles from './Faq.module.css';

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className="section" aria-labelledby="faq-heading">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-heading" className="section-title">
            Answers to frequently asked questions
          </h2>
        </div>

        <ul className={styles.list}>
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const triggerId = `faq-trigger-${item.id}`;

            return (
              <li key={item.id} className={styles.item}>
                <h3>
                  <button
                    type="button"
                    id={triggerId}
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                  >
                    {item.question}
                    <Icon
                      name="chevron-down"
                      className={`${styles.triggerIcon} ${isOpen ? styles.triggerIconOpen : ''}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
                  hidden={false}
                >
                  <div className={styles.panelInner}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
