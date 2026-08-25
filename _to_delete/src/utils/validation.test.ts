import { describe, expect, it } from 'vitest';
import { FIELD_LIMITS, hasErrors, validateQuoteForm, type QuoteFormValues } from './validation';

/** A minimal, fully valid form submission — used as a base for negative tests. */
const validValues: QuoteFormValues = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+373 61 234 567',
  preferredContact: 'email',
  location: 'Chișinău',
  furnitureType: 'Wardrobe',
  brandModel: '',
  itemCount: '',
  preferredDate: '',
  message: 'Please assemble my new wardrobe next week.',
  privacyConsent: true,
  companyWebsite: '',
};

const emptyValues: QuoteFormValues = {
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

describe('validateQuoteForm', () => {
  it('returns no errors for a fully valid submission', () => {
    expect(validateQuoteForm(validValues)).toEqual({});
    expect(hasErrors(validateQuoteForm(validValues))).toBe(false);
  });

  it('flags every required field when the form is empty', () => {
    const errors = validateQuoteForm(emptyValues);
    expect(Object.keys(errors).sort()).toEqual(
      ['name', 'email', 'phone', 'location', 'furnitureType', 'message', 'privacyConsent'].sort(),
    );
    expect(hasErrors(errors)).toBe(true);
  });

  it('rejects a malformed email address', () => {
    const errors = validateQuoteForm({ ...validValues, email: 'not-an-email' });
    expect(errors.email).toBe('Please enter a valid email address.');
  });

  it('rejects a phone number containing invalid characters', () => {
    const errors = validateQuoteForm({ ...validValues, phone: 'call-me-maybe' });
    expect(errors.phone).toBe('Please enter a valid phone number (e.g. +373 6X XXX XXX).');
  });

  it('accepts a blank optional itemCount', () => {
    const errors = validateQuoteForm({ ...validValues, itemCount: '' });
    expect(errors.itemCount).toBeUndefined();
  });

  it.each([
    ['0', 'zero'],
    ['-1', 'negative numbers'],
    ['1000', 'values above 999'],
    ['3.5', 'non-integer values'],
  ])('rejects itemCount of %s (%s)', (value) => {
    const errors = validateQuoteForm({ ...validValues, itemCount: value });
    expect(errors.itemCount).toBe('Please enter a valid number of items.');
  });

  it('accepts a valid itemCount', () => {
    const errors = validateQuoteForm({ ...validValues, itemCount: '5' });
    expect(errors.itemCount).toBeUndefined();
  });

  it('requires explicit privacy consent', () => {
    const errors = validateQuoteForm({ ...validValues, privacyConsent: false });
    expect(errors.privacyConsent).toBe('Your consent is required in order to submit the form.');
  });

  it('rejects a name over the character limit', () => {
    const errors = validateQuoteForm({ ...validValues, name: 'a'.repeat(FIELD_LIMITS.name + 1) });
    expect(errors.name).toBe(`The name can be at most ${FIELD_LIMITS.name} characters long.`);
  });

  it('treats a filled honeypot field as a generic submission error', () => {
    const errors = validateQuoteForm({ ...validValues, companyWebsite: 'https://spammer.example' });
    expect(errors.companyWebsite).toBe('Something went wrong while submitting the form.');
  });
});

describe('hasErrors', () => {
  it('returns false for an empty error object', () => {
    expect(hasErrors({})).toBe(false);
  });

  it('returns true when at least one error is present', () => {
    expect(hasErrors({ name: 'Please enter your name.' })).toBe(true);
  });
});
