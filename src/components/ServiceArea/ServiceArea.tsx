import { business } from '../../config/business';
import Icon from '../common/Icon';
import styles from './ServiceArea.module.css';

export default function ServiceArea() {
  return (
    <section className="section" aria-labelledby="zona-heading">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Service area</p>
          <h2 id="zona-heading" className="section-title">
            We travel to {business.baseLocation} and other localities, by arrangement
          </h2>
        </div>

        <div className={styles.panel}>
          <div className={styles.item}>
            <span className={styles.iconWrap}>
              <Icon name="map-pin" />
            </span>
            <div>
              <p className={styles.itemLabel}>Base location</p>
              <p className={styles.itemValue}>{business.baseLocation}</p>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.iconWrap}>
              <Icon name="ruler" />
            </span>
            <div>
              <p className={styles.itemLabel}>Travel radius</p>
              <p className={styles.itemValue}>{business.serviceRadius}</p>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.iconWrap}>
              <Icon name="clock" />
            </span>
            <div>
              <p className={styles.itemLabel}>Working hours</p>
              <p className={styles.itemValue}>{business.workingHours}</p>
            </div>
          </div>

          <p className={styles.note}>
            We are available to travel to {business.baseLocation} and other localities across
            Moldova ({business.servedAreas}). Availability and any travel cost
            ({business.travelCostPolicy}) are confirmed before booking — we do not claim that
            travel is free unless this has been explicitly confirmed.
          </p>
        </div>
      </div>
    </section>
  );
}
