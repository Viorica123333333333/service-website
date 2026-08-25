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
    errors.name = 'Please enter your name.';
  } else if (values.name.length > FIELD_LIMITS.name) {
    errors.name = `The name can be at most ${FIELD_LIMITS.name} characters long.`;
  }

  if (isBlank(values.email)) {
    errors.email = 'Please enter an email address.';
  } else if (values.email.length > FIELD_LIMITS.email || !EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (isBlank(values.phone)) {
    errors.phone = 'Please enter a phone number.';
  } else if (values.phone.length > FIELD_LIMITS.phone || !PHONE_PATTERN.test(values.phone)) {
    errors.phone = 'Please enter a valid phone number (e.g. +373 6X XXX XXX).';
  }

  if (isBlank(values.location)) {
    errors.location = 'Please enter your location or postcode.';
  } else if (values.location.length > FIELD_LIMITS.location) {
    errors.location = `This field can be at most ${FIELD_LIMITS.location} characters long.`;
  }

  if (isBlank(values.furnitureType)) {
    errors.furnitureType = 'Please indicate the type of furniture.';
  } else if (values.furnitureType.length > FIELD_LIMITS.furnitureType) {
    errors.furnitureType = `This field can be at most ${FIELD_LIMITS.furnitureType} characters long.`;
  }

  if (values.brandModel.length > FIELD_LIMITS.brandModel) {
    errors.brandModel = `This field can be at most ${FIELD_LIMITS.brandModel} characters long.`;
  }

  if (values.itemCount) {
    const numeric = Number(values.itemCount);
    if (!Number.isInteger(numeric) || numeric <= 0 || numeric > 999) {
      errors.itemCount = 'Please enter a valid number of items.';
    }
  }

  if (isBlank(values.message)) {
    errors.message = 'Please add some details about the job.';
  } else if (values.message.length > FIELD_LIMITS.message) {
    errors.message = `The message can be at most ${FIELD_LIMITS.message} characters long.`;
  }

  if (!values.privacyConsent) {
    errors.privacyConsent = 'Your consent is required in order to submit the form.';
  }

  // Honeypot: if filled, a bot likely submitted the form. We still return a
  // generic error rather than revealing the anti-spam mechanism.
  if (!isBlank(values.companyWebsite)) {
    errors.companyWebsite = 'Something went wrong while submitting the form.';
  }

  return errors;
}

export function hasErrors(errors: QuoteFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
