import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { business } from '../../config/business';
import Icon from '../common/Icon';
import {
  FIELD_LIMITS,
  hasErrors,
  validateQuoteForm,
  type QuoteFormErrors,
  type QuoteFormValues,
} from '../../utils/validation';
import { cleanText } from '../../utils/sanitize';
import styles from './Contact.module.css';

const FORM_NAME = 'solicitare-oferta';

const initialValues: QuoteFormValues = {
  name: '',
  email: '',
  phone: '',
  preferredContact: 'telefon',
  location: '',
  furnitureType: '',
  brandModel: '',
  itemCount: '',
  preferredDate: '',
  message: '',
  privacyConsent: false,
  companyWebsite: '',
};

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

/** application/x-www-form-urlencoded encoder required by Netlify Forms' AJAX flow. */
function encodeFormData(data: Record<string, string>): string {
  return Object.entries(data)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

export default function Contact() {
  const [values, setValues] = useState<QuoteFormValues>(initialValues);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const formHeadingId = useId();
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const statusRegionId = useId();

  const isSubmitting = status === 'submitting';

  function updateField<K extends keyof QuoteFormValues>(field: K, value: QuoteFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Duplicate-submission guard: ignore additional submits while one is
    // already in flight (also covered by disabling the submit button).
    if (isSubmitting) return;

    const sanitizedValues: QuoteFormValues = {
      ...values,
      name: cleanText(values.name, FIELD_LIMITS.name),
      email: cleanText(values.email, FIELD_LIMITS.email),
      phone: cleanText(values.phone, FIELD_LIMITS.phone),
      location: cleanText(values.location, FIELD_LIMITS.location),
      furnitureType: cleanText(values.furnitureType, FIELD_LIMITS.furnitureType),
      brandModel: cleanText(values.brandModel, FIELD_LIMITS.brandModel),
      message: cleanText(values.message, FIELD_LIMITS.message),
    };

    const validationErrors = validateQuoteForm(sanitizedValues);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      setStatus('error');
      // Move focus to the error summary so screen-reader and keyboard
      // users land directly on the list of problems instead of having to
      // hunt for them.
      requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({
          'form-name': FORM_NAME,
          name: sanitizedValues.name,
          email: sanitizedValues.email,
          phone: sanitizedValues.phone,
          preferredContact: sanitizedValues.preferredContact,
          location: sanitizedValues.location,
          furnitureType: sanitizedValues.furnitureType,
          brandModel: sanitizedValues.brandModel,
          itemCount: sanitizedValues.itemCount,
          preferredDate: sanitizedValues.preferredDate,
          message: sanitizedValues.message,
          privacyConsent: sanitizedValues.privacyConsent ? 'da' : 'nu',
          'bot-field': sanitizedValues.companyWebsite,
        }),
      });

      // Netlify's form endpoint returns a 200 on success. We only ever
      // claim success when the platform actually confirms it — never
      // optimistically, and never claiming an email was sent (Netlify
      // Forms notifications are configured separately in the dashboard;
      // see README.md).
      if (!response.ok) {
        throw new Error(`Netlify Forms a răspuns cu statusul ${response.status}`);
      }

      setStatus('success');
      setValues(initialValues);
      setErrors({});
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-heading">
      <div className={`container ${styles.grid}`}>
        <div className={styles.infoPanel}>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-heading" className="section-title">
            Hai să discutăm despre mobila dumneavoastră
          </h2>
          <p className={styles.infoLede}>
            Aveți un dulap de montat sau mai multe piese de mobilier? Povestiți-ne ce aveți
            nevoie, iar noi vă spunem cum vă putem ajuta.
          </p>

          <div className={styles.directLinks}>
            <a href={business.phoneHref} className={styles.directLink}>
              <Icon name="phone" />
              {business.phone}
            </a>
            <a
              href={business.whatsappHref}
              className={styles.directLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" />
              Scrieți pe WhatsApp
            </a>
            <a href={`mailto:${business.email}`} className={styles.directLink}>
              <Icon name="mail" />
              {business.email}
            </a>
          </div>

          <p className={styles.responseNote}>
            Timp estimat de răspuns: [PLASATOR — de exemplu, în aceeași zi lucrătoare]. Programul
            nostru: {business.workingHours}.
          </p>
        </div>

        <div className={styles.formPanel}>
          <h3 id={formHeadingId} style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--fs-400)' }}>
            Solicitați o ofertă
          </h3>
          <p className={styles.helpText} style={{ marginBottom: 'var(--space-5)' }}>
            Trimiteți-ne câteva detalii despre mobilă și localitatea în care vă aflați. Dacă
            aveți fotografii, schițe sau denumirea modelului, acestea ne vor ajuta să vă oferim
            un răspuns mai exact.
          </p>

          {hasErrors(errors) && status === 'error' && (
            <div
              ref={errorSummaryRef}
              className={styles.errorSummary}
              role="alert"
              tabIndex={-1}
              aria-labelledby={`${formHeadingId}-error-title`}
            >
              <p id={`${formHeadingId}-error-title`}>
                Formularul conține {Object.keys(errors).length}{' '}
                {Object.keys(errors).length === 1 ? 'eroare' : 'erori'}. Verificați câmpurile de
                mai jos:
              </p>
              <ul>
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field}>
                    <a href={`#field-${field}`}>{message}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form
            name={FORM_NAME}
            method="POST"
            aria-labelledby={formHeadingId}
            onSubmit={handleSubmit}
            noValidate
            // `data-netlify` and `netlify-honeypot` are Netlify-specific
            // build-time markers, not part of React's typed DOM attribute
            // set, so they're passed through this typed spread rather
            // than inline (keeps the rest of the JSX fully type-checked).
            {...({ 'data-netlify': 'true', 'netlify-honeypot': 'bot-field' } as Record<string, string>)}
          >
            <input type="hidden" name="form-name" value={FORM_NAME} />

            {/* Honeypot field: invisible and unreachable for real visitors
                (off-screen, aria-hidden, not tab-focusable). Netlify treats
                a filled value here as a strong spam signal. */}
            <p className={styles.honeypotField} aria-hidden="true">
              <label>
                Nu completați acest câmp dacă sunteți om
                <input
                  type="text"
                  name="bot-field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.companyWebsite}
                  onChange={(event) => updateField('companyWebsite', event.target.value)}
                />
              </label>
            </p>

            <div className={styles.formGrid}>
              <Field
                id="field-name"
                label="Nume"
                error={errors.name}
                required
              >
                <input
                  id="field-name"
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  type="text"
                  name="name"
                  autoComplete="name"
                  maxLength={FIELD_LIMITS.name}
                  value={values.name}
                  onChange={(event) => updateField('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'error-field-name' : undefined}
                  required
                />
              </Field>

              <Field id="field-email" label="E-mail" error={errors.email} required>
                <input
                  id="field-email"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  maxLength={FIELD_LIMITS.email}
                  value={values.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'error-field-email' : undefined}
                  required
                />
              </Field>

              <Field id="field-phone" label="Telefon" error={errors.phone} required>
                <input
                  id="field-phone"
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  placeholder={business.phonePrefix + ' 6X XXX XXX'}
                  maxLength={FIELD_LIMITS.phone}
                  value={values.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'error-field-phone' : undefined}
                  required
                />
              </Field>

              <div className={styles.field}>
                <span className={styles.label} id="preferred-contact-label">
                  Metodă de contact preferată
                </span>
                <div className={styles.radioGroup} role="radiogroup" aria-labelledby="preferred-contact-label">
                  {(
                    [
                      { value: 'telefon', label: 'Telefon' },
                      { value: 'email', label: 'E-mail' },
                      { value: 'whatsapp', label: 'WhatsApp' },
                    ] as const
                  ).map((option) => (
                    <label key={option.value} className={styles.radioLabel}>
                      <input
                        type="radio"
                        name="preferredContact"
                        value={option.value}
                        checked={values.preferredContact === option.value}
                        onChange={() => updateField('preferredContact', option.value)}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <Field id="field-location" label="Localitate / cod poștal" error={errors.location} required>
                <input
                  id="field-location"
                  className={`${styles.input} ${errors.location ? styles.inputError : ''}`}
                  type="text"
                  name="location"
                  autoComplete="address-level2"
                  maxLength={FIELD_LIMITS.location}
                  value={values.location}
                  onChange={(event) => updateField('location', event.target.value)}
                  aria-invalid={Boolean(errors.location)}
                  aria-describedby={errors.location ? 'error-field-location' : undefined}
                  required
                />
              </Field>

              <Field id="field-furnitureType" label="Tip de mobilier" error={errors.furnitureType} required>
                <input
                  id="field-furnitureType"
                  className={`${styles.input} ${errors.furnitureType ? styles.inputError : ''}`}
                  type="text"
                  name="furnitureType"
                  placeholder="de exemplu, dulap cu uși glisante"
                  maxLength={FIELD_LIMITS.furnitureType}
                  value={values.furnitureType}
                  onChange={(event) => updateField('furnitureType', event.target.value)}
                  aria-invalid={Boolean(errors.furnitureType)}
                  aria-describedby={errors.furnitureType ? 'error-field-furnitureType' : undefined}
                  required
                />
              </Field>

              <Field
                id="field-brandModel"
                label={
                  <>
                    Producător / model <span className={styles.optionalTag}>(dacă îl cunoașteți)</span>
                  </>
                }
              >
                <input
                  id="field-brandModel"
                  className={styles.input}
                  type="text"
                  name="brandModel"
                  maxLength={FIELD_LIMITS.brandModel}
                  value={values.brandModel}
                  onChange={(event) => updateField('brandModel', event.target.value)}
                />
              </Field>

              <Field id="field-itemCount" label="Număr de piese" error={errors.itemCount}>
                <input
                  id="field-itemCount"
                  className={`${styles.input} ${errors.itemCount ? styles.inputError : ''}`}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={999}
                  name="itemCount"
                  value={values.itemCount}
                  onChange={(event) => updateField('itemCount', event.target.value)}
                  aria-invalid={Boolean(errors.itemCount)}
                  aria-describedby={errors.itemCount ? 'error-field-itemCount' : undefined}
                />
              </Field>

              <Field id="field-preferredDate" label="Data preferată">
                <input
                  id="field-preferredDate"
                  className={styles.input}
                  type="date"
                  name="preferredDate"
                  value={values.preferredDate}
                  onChange={(event) => updateField('preferredDate', event.target.value)}
                />
              </Field>

              <div className={`${styles.field} ${styles.fieldFull}`}>
                <Field
                  id="field-message"
                  label="Detalii despre lucrare"
                  error={errors.message}
                  required
                >
                  <textarea
                    id="field-message"
                    className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    name="message"
                    maxLength={FIELD_LIMITS.message}
                    value={values.message}
                    onChange={(event) => updateField('message', event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'error-field-message' : 'field-message-help'}
                    required
                  />
                </Field>
                <p id="field-message-help" className={styles.helpText}>
                  Instrucțiuni pentru fotografii: dacă doriți să atașați imagini, vă rugăm să
                  ni le trimiteți separat, prin e-mail la {business.email} sau prin WhatsApp,
                  după trimiterea acestui formular — încărcarea directă de fișiere nu este
                  disponibilă momentan.
                </p>
              </div>

              <div className={`${styles.fieldFull} ${styles.consentRow}`}>
                <input
                  id="field-privacyConsent"
                  type="checkbox"
                  name="privacyConsent"
                  checked={values.privacyConsent}
                  onChange={(event) => updateField('privacyConsent', event.target.checked)}
                  aria-invalid={Boolean(errors.privacyConsent)}
                  aria-describedby={errors.privacyConsent ? 'error-field-privacyConsent' : undefined}
                  required
                />
                <label htmlFor="field-privacyConsent" className={styles.consentText}>
                  Sunt de acord ca datele completate în acest formular să fie folosite pentru a
                  răspunde solicitării mele de ofertă, conform{' '}
                  <a href="/politica-de-confidentialitate">Politicii de confidențialitate</a>.
                  {errors.privacyConsent && (
                    <span id="error-field-privacyConsent" className={styles.errorText}>
                      {' '}
                      {errors.privacyConsent}
                    </span>
                  )}
                </label>
              </div>
            </div>

            <div className={styles.submitRow}>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Se trimite…' : 'Trimiteți solicitarea'}
              </button>
              <span className={styles.helpText}>
                Câmpurile marcate sunt necesare pentru a vă putea contacta.
              </span>
            </div>

            {/* Polite live region: announces status changes to assistive
                technology without moving focus away from the form. */}
            <div id={statusRegionId} aria-live="polite" role="status">
              {status === 'success' && (
                <p className={`${styles.statusMessage} ${styles.statusSuccess}`}>
                  Vă mulțumim! Mesajul a fost trimis. Revenim cu un răspuns în cel mai scurt
                  timp posibil.
                </p>
              )}
              {status === 'error' && !hasErrors(errors) && (
                <p className={`${styles.statusMessage} ${styles.statusError}`}>
                  A apărut o problemă la trimiterea formularului. Vă rugăm să încercați din nou
                  sau să ne contactați direct la {business.phone} ori {business.email}.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: ReactNode;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

function Field({ id, label, error, required, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <span id={`error-${id}`} className={styles.errorText}>
          {error}
        </span>
      )}
    </div>
  );
}
