import { business } from '../../config/business';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="despre" className="section" aria-labelledby="despre-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.portraitWrap}>
          <img
            className={styles.portrait}
            src="/images/about/portret.svg"
            alt={`Professional portrait of ${business.fullName} [PLACEHOLDER IMAGE — replace with a real photograph]`}
            width={720}
            height={960}
            loading="lazy"
          />
        </div>

        <div className={styles.copy}>
          <p className="eyebrow">About me</p>
          <h2 id="despre-heading" className="section-title">
            {business.fullName}
          </h2>
          <p>
            Hello! My name is {business.fullName}, and I've been assembling furniture, with a
            focus on wardrobes, for over {business.yearsExperience} years. I've learned, job
            after job, that a successful assembly comes down to patience and attention to
            small details — from getting the levelling right, to the final check of a door.
          </p>
          <p>
            I like to work tidily and to communicate clearly with every customer, from the
            first questions about the furniture through to the final check of the job. I can
            travel to your address, within the agreed area, and we arrange the schedule
            together, based on both our availability.
          </p>
          <p>
            This page contains introductory information about my work. The details below may
            be filled in or adjusted by me as new information becomes available.
          </p>
          <ul className={styles.factList}>
            <li className={styles.factItem}>Over {business.yearsExperience} years of experience</li>
            <li className={styles.factItem}>Languages spoken: {business.languagesSpoken}</li>
            <li className={styles.factItem}>Available for on-site visits</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
