/**
 * validation.ts — client-side validation for the quote request form.
 *
 * This validation exists purely for user experience (fast, friendly
 * feedback). It is NOT a security boundary: Netlify's platform-side form
 * processing is the authoritative check, and any optional server-side
 * function must re-validate everything here independently. Never trust
 * client-side validation alone.
 */

export const FIELD_LIMITS = {
  name: 80,
  email: 254,
  phone: 20,
  location: 100,
  furnitureType: 100,
  brandModel: 100,
  itemCount: 3,
  message: 1500,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts +373 numbers and generic international formats with spaces/dashes.
const PHONE_PATTERN = /^[+]?[\d\s()-]{6,20}$/;

export interface QuoteFormValues {
  name: string;
  email: string;
  phone: string;
  preferredContact: 'telefon' | 'email' | 'whatsapp';
  location: string;
  furnitureType: string;
  brandModel: string;
  itemCount: string;
  preferredDate: string;
  message: string;
  privacyConsent: boolean;
  // honeypot — must stay empty; real users never see or fill this field.
  companyWebsite: string;
}

export type QuoteFormErrors = Partial<Record<keyof QuoteFormValues, string>>;

function isBlank(value: string): boolean {
  return value.trim().length === 0;
}

export function validateQuoteForm(values: QuoteFormValues): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (isBlank(values.name)) {
    errors.name = 'Introduceți numele dumneavoastră.';
  } else if (values.name.length > FIELD_LIMITS.name) {
    errors.name = `Numele poate avea cel mult ${FIELD_LIMITS.name} de caractere.`;
  }

  if (isBlank(values.email)) {
    errors.email = 'Introduceți o adresă de e-mail.';
  } else if (values.email.length > FIELD_LIMITS.email || !EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Introduceți o adresă de e-mail validă.';
  }

  if (isBlank(values.phone)) {
    errors.phone = 'Introduceți un număr de telefon.';
  } else if (values.phone.length > FIELD_LIMITS.phone || !PHONE_PATTERN.test(values.phone)) {
    errors.phone = 'Introduceți un număr de telefon valid (de exemplu, +373 6X XXX XXX).';
  }

  if (isBlank(values.location)) {
    errors.location = 'Introduceți localitatea sau codul poștal.';
  } else if (values.location.length > FIELD_LIMITS.location) {
    errors.location = `Acest câmp poate avea cel mult ${FIELD_LIMITS.location} de caractere.`;
  }

  if (isBlank(values.furnitureType)) {
    errors.furnitureType = 'Indicați tipul de mobilier.';
  } else if (values.furnitureType.length > FIELD_LIMITS.furnitureType) {
    errors.furnitureType = `Acest câmp poate avea cel mult ${FIELD_LIMITS.furnitureType} de caractere.`;
  }

  if (values.brandModel.length > FIELD_LIMITS.brandModel) {
    errors.brandModel = `Acest câmp poate avea cel mult ${FIELD_LIMITS.brandModel} de caractere.`;
  }

  if (values.itemCount) {
    const numeric = Number(values.itemCount);
    if (!Number.isInteger(numeric) || numeric <= 0 || numeric > 999) {
      errors.itemCount = 'Introduceți un număr valid de piese.';
    }
  }

  if (isBlank(values.message)) {
    errors.message = 'Adăugați câteva detalii despre lucrare.';
  } else if (values.message.length > FIELD_LIMITS.message) {
    errors.message = `Mesajul poate avea cel mult ${FIELD_LIMITS.message} de caractere.`;
  }

  if (!values.privacyConsent) {
    errors.privacyConsent = 'Este necesar acordul dumneavoastră pentru a putea trimite formularul.';
  }

  // Honeypot: if filled, a bot likely submitted the form. We still return a
  // generic error rather than revealing the anti-spam mechanism.
  if (!isBlank(values.companyWebsite)) {
    errors.companyWebsite = 'A apărut o eroare la trimiterea formularului.';
  }

  return errors;
}

export function hasErrors(errors: QuoteFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
