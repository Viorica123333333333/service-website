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

// This site is a portfolio/demo build, not a live business — the form is
// intentionally non-functional so visitors never submit real personal
// data to it. Every control below reads its `disabled` state from this
// single flag; flip it to re-enable the form for a genuine deployment.
const PROTOTYPE_FORM_DISABLED: boolean = true;

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

    // PROTOTYPE GUARD: this site is a portfolio/demo build, not a live
    // business — every field and the submit button are rendered `disabled`
    // below, which already stops a browser from ever calling onSubmit
    // through normal interaction (a disabled button cannot be clicked or
    // activated by keyboard). This check is defense-in-depth for any
    // non-standard way the handler could otherwise be invoked, so no
    // network request is ever made and no visitor data ever leaves the
    // browser. The rest of this function (validation + the Netlify Forms
    // fetch flow) is left fully intact and readable as a demonstration of
    // a real, working implementation — see README.md.
    if (PROTOTYPE_FORM_DISABLED) return;

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
        throw new Error(`Netlify Forms responded with status ${response.status}`);
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
            Let's talk about your furniture
          </h2>
          <p className={styles.infoLede}>
            Have a wardrobe to assemble, or several pieces of furniture? Tell us what you
            need, and we'll let you know how we can help.
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
              Message us on WhatsApp
            </a>
            <a href={`mailto:${business.email}`} className={styles.directLink}>
              <Icon name="mail" />
              {business.email}
            </a>
          </div>

          <p className={styles.responseNote}>
            Estimated response time: [PLACEHOLDER — e.g. within the same working day]. Our
            hours: {business.workingHours}.
          </p>
        </div>

        <div className={styles.formPanel}>
          <h3 id={formHeadingId} className={styles.formHeading}>
            Request a quote
          </h3>
          <p className={`${styles.helpText} ${styles.formIntro}`}>
            Send us a few details about the furniture and the location you're in. If you
            have photos, sketches or the model name, these will help us give you a more
            accurate answer.
          </p>

          {PROTOTYPE_FORM_DISABLED && (
            <p className={styles.prototypeNotice} role="note">
              <Icon name="shield-check" aria-hidden="true" />
              <span>
                <strong>Prototype — this form is disabled.</strong> This site is a
                portfolio demo, so every field below is switched off and nothing you
                enter can be submitted or sent anywhere. Please don't enter real
                personal details. To get in touch for real, use the phone, WhatsApp or
                email links opposite.
              </span>
            </p>
          )}

          {hasErrors(errors) && status === 'error' && (
            <div
              ref={errorSummaryRef}
              className={styles.errorSummary}
              role="alert"
              tabIndex={-1}
              aria-labelledby={`${formHeadingId}-error-title`}
            >
              <p id={`${formHeadingId}-error-title`}>
                The form contains {Object.keys(errors).length}{' '}
                {Object.keys(errors).length === 1 ? 'error' : 'errors'}. Please check the fields
                below:
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
                Do not fill in this field if you are human
                <input
                  type="text"
                  name="bot-field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.companyWebsite}
                  onChange={(event) => updateField('companyWebsite', event.target.value)}
                  disabled={PROTOTYPE_FORM_DISABLED}
                />
              </label>
            </p>

            <div className={styles.formGrid}>
              <Field
                id="field-name"
                label="Name"
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
                  disabled={PROTOTYPE_FORM_DISABLED}
                />
              </Field>

              <Field id="field-email" label="Email" error={errors.email} required>
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
                  disabled={PROTOTYPE_FORM_DISABLED}
                />
              </Field>

              <Field id="field-phone" label="Phone" error={errors.phone} required>
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
                  disabled={PROTOTYPE_FORM_DISABLED}
                />
              </Field>

              <div className={styles.field}>
                <span className={styles.label} id="preferred-contact-label">
                  Preferred contact method
                </span>
                <div className={styles.radioGroup} role="radiogroup" aria-labelledby="preferred-contact-label">
                  {(
                    [
                      { value: 'telefon', label: 'Phone' },
                      { value: 'email', label: 'Email' },
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
                        disabled={PROTOTYPE_FORM_DISABLED}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <Field id="field-location" label="Location / postcode" error={errors.location} required>
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
                  disabled={PROTOTYPE_FORM_DISABLED}
                />
              </Field>

              <Field id="field-furnitureType" label="Type of furniture" error={errors.furnitureType} required>
                <input
                  id="field-furnitureType"
                  className={`${styles.input} ${errors.furnitureType ? styles.inputError : ''}`}
                  type="text"
                  name="furnitureType"
                  placeholder="e.g. sliding-door wardrobe"
                  maxLength={FIELD_LIMITS.furnitureType}
                  value={values.furnitureType}
                  onChange={(event) => updateField('furnitureType', event.target.value)}
                  aria-invalid={Boolean(errors.furnitureType)}
                  aria-describedby={errors.furnitureType ? 'error-field-furnitureType' : undefined}
                  required
                  disabled={PROTOTYPE_FORM_DISABLED}
                />
              </Field>

              <Field
                id="field-brandModel"
                label={
                  <>
                    Manufacturer / model <span className={styles.optionalTag}>(if known)</span>
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
                  disabled={PROTOTYPE_FORM_DISABLED}
                />
              </Field>

              <Field id="field-itemCount" label="Number of items" error={errors.itemCount}>
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
                  disabled={PROTOTYPE_FORM_DISABLED}
                />
              </Field>

              <Field id="field-preferredDate" label="Preferred date">
                <input
                  id="field-preferredDate"
                  className={styles.input}
                  type="date"
                  name="preferredDate"
                  value={values.preferredDate}
                  onChange={(event) => updateField('preferredDate', event.target.value)}
                  disabled={PROTOTYPE_FORM_DISABLED}
                />
              </Field>

              <div className={`${styles.field} ${styles.fieldFull}`}>
                <Field
                  id="field-message"
                  label="Job details"
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
                    disabled={PROTOTYPE_FORM_DISABLED}
                  />
                </Field>
                <p id="field-message-help" className={styles.helpText}>
                  Photo instructions: if you'd like to attach images, please send them
                  separately by email to {business.email} or via WhatsApp after submitting
                  this form — direct file uploads are not available at the moment.
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
                  disabled={PROTOTYPE_FORM_DISABLED}
                />
                <label htmlFor="field-privacyConsent" className={styles.consentText}>
                  I agree that the details entered in this form may be used to respond to my
                  quote request, in accordance with the{' '}
                  <a href="/politica-de-confidentialitate">Privacy Policy</a>.
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={PROTOTYPE_FORM_DISABLED || isSubmitting}
                aria-disabled={PROTOTYPE_FORM_DISABLED || isSubmitting}
              >
                {PROTOTYPE_FORM_DISABLED
                  ? 'Sending disabled (demo)'
                  : isSubmitting
                    ? 'Sending…'
                    : 'Send request'}
              </button>
              <span className={styles.helpText}>
                {PROTOTYPE_FORM_DISABLED
                  ? 'This form is a non-functional demo — see the notice above.'
                  : 'Marked fields are required so we can get back to you.'}
              </span>
            </div>

            {/* Polite live region: announces status changes to assistive
                technology without moving focus away from the form. */}
            <div id={statusRegionId} aria-live="polite" role="status">
              {status === 'success' && (
                <p className={`${styles.statusMessage} ${styles.statusSuccess}`}>
                  Thank you! Your message has been sent. We'll get back to you as soon as
                  possible.
                </p>
              )}
              {status === 'error' && !hasErrors(errors) && (
                <p className={`${styles.statusMessage} ${styles.statusError}`}>
                  Something went wrong while submitting the form. Please try again, or
                  contact us directly at {business.phone} or {business.email}.
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
