import { processSteps } from '../../config/process';
import RevealOnScroll from '../common/RevealOnScroll';
import styles from './HowItWorks.module.css';

export default function HowItWorks() {
  return (
    <section id="proces" className="section" aria-labelledby="proces-heading">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Cum lucrăm</p>
          <h2 id="proces-heading" className="section-title">
            Un proces simplu, în cinci pași
          </h2>
        </div>

        <ol className={styles.list}>
          {processSteps.map((item, index) => (
            <li key={item.step}>
              <RevealOnScroll as="div" delayMs={index * 90} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {item.step}
                </span>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepText}>{item.description}</p>
              </RevealOnScroll>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
