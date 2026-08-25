import { testimonials, isPlaceholderData } from '../../config/testimonials';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section className="section" aria-labelledby="testimoniale-heading">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Testimonials</p>
          <h2 id="testimoniale-heading" className="section-title">
            What customers say
          </h2>
        </div>

        {/*
          DEV NOTE: `isPlaceholderData` is true in src/config/testimonials.ts.
          The notice below is intentionally visible so nobody mistakes the
          example quotes for genuine reviews. Once real, authorized
          testimonials replace the placeholders, set isPlaceholderData to
          false in that file and this notice will stop rendering.
        */}
        {isPlaceholderData && (
          <p className={styles.devNotice} role="note">
            Development note: the testimonials below are illustrative examples, not genuine
            reviews. Replace them only with authentic reviews for which you have the
            customer's explicit consent, before the site is published.
          </p>
        )}

        <ul className={styles.grid}>
          {testimonials.map((testimonial) => (
            <li key={testimonial.id}>
              <blockquote className={styles.card}>
                <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>
                <footer>
                  <p className={styles.author}>{testimonial.author}</p>
                  <p className={styles.context}>{testimonial.context}</p>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
