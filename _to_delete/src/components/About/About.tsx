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
            alt={`Portret profesional al lui ${business.fullName} [IMAGINE PLASATOARE — înlocuiți cu fotografie reală]`}
            width={720}
            height={960}
            loading="lazy"
          />
        </div>

        <div className={styles.copy}>
          <p className="eyebrow">Despre mine</p>
          <h2 id="despre-heading" className="section-title">
            {business.fullName}
          </h2>
          <p>
            Bună ziua! Mă numesc {business.fullName} și mă ocup de montajul mobilierului, cu
            accent pe dulapuri, de peste {business.yearsExperience} ani. Am învățat, lucrare
            după lucrare, că un montaj reușit ține de răbdare și de atenție la detalii mici —
            de la nivelarea corectă, până la ultima verificare a unei uși.
          </p>
          <p>
            Îmi place să lucrez ordonat și să comunic clar cu fiecare client, de la primele
            întrebări despre mobilă, până la verificarea finală a lucrării. Mă pot deplasa la
            adresa dumneavoastră, în limita zonei convenite, iar programul îl stabilim
            împreună, în funcție de disponibilitatea amândurora.
          </p>
          <p>
            Această pagină conține informații introductive despre activitatea mea. Detaliile de
            mai jos pot fi completate sau ajustate de mine, pe măsură ce apar informații noi.
          </p>
          <ul className={styles.factList}>
            <li className={styles.factItem}>Peste {business.yearsExperience} ani de experiență</li>
            <li className={styles.factItem}>Limbi vorbite: {business.languagesSpoken}</li>
            <li className={styles.factItem}>Disponibil pentru deplasări</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
