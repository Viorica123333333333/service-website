import LegalLayout from '../components/common/LegalLayout';
import PageMeta from '../components/common/PageMeta';
import { business } from '../config/business';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageMeta
        title={`Privacy Policy | ${business.name}`}
        description="Privacy Policy — informative template for an independent furniture assembly service based in Moldova."
        path="/politica-de-confidentialitate"
      />
      <LegalLayout title="Privacy Policy">
        <h2>1. What data we collect</h2>
        <p>
          Through the quote-request form, we may collect the following personal data: name,
          email address, phone number, location or postcode, type of furniture,
          manufacturer/model (if provided), number of items, preferred date for booking, and
          the content of the message sent. We do not request or collect any additional data
          that is not necessary for preparing a quote or scheduling the visit.
        </p>

        <h2>2. Why we collect this data</h2>
        <p>
          The data is used solely to respond to your quote request, to agree the details of
          the job, and to schedule a possible visit. We do not use this data for marketing
          purposes unless you give separate, explicit consent for that.
        </p>

        <h2>3. Legal basis (to be verified)</h2>
        <p>
          [LEGAL BASIS TO BE CONFIRMED — e.g. taking steps at the data subject's request prior
          to entering into a contract, or the data subject's consent]. This basis must be
          confirmed against the applicable Moldovan legislation on the protection of personal
          data before the site is published.
        </p>

        <h2>4. Who processes the data</h2>
        <p>
          Data submitted through the form is processed by {business.fullName}, as the person
          responsible for the {business.name} business. The form is hosted and submitted via
          the Netlify hosting platform; data may pass through this provider's infrastructure
          while the request is being sent.
        </p>

        <h2>5. Providers and international transfers</h2>
        <p>
          [TO BE CONFIRMED] Depending on the hosting providers and any email services used for
          notifications, data may be processed on servers located outside Moldova. This
          section must be completed with accurate information about the providers used and,
          where applicable, the safeguards in place for international data transfers.
        </p>

        <h2>6. Retention period</h2>
        <p>
          [RETENTION PERIOD TO BE CONFIRMED — e.g. data is retained for as long as necessary to
          handle the request and, afterwards, for a reasonable period set by the business
          owner].
        </p>

        <h2>7. Your rights</h2>
        <p>
          Within the limits provided by the applicable Moldovan legislation, you have the
          right to request access to your data, its rectification or erasure, and to withdraw
          your consent where processing is based on it. To exercise these rights, you can
          contact us using the details below.
        </p>

        <h2>8. Contact for privacy-related requests</h2>
        <p>
          Email: {business.email} · Phone: {business.phone}
        </p>

        <h2>9. What we don't do</h2>
        <ul>
          <li>We do not store form data in the browser's local storage (localStorage).</li>
          <li>We do not sell or rent your data to third parties.</li>
          <li>We do not use form data for targeted advertising.</li>
        </ul>
      </LegalLayout>
    </>
  );
}
