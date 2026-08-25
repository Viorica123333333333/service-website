import LegalLayout from '../components/common/LegalLayout';
import PageMeta from '../components/common/PageMeta';
import { business } from '../config/business';

export default function TermsPage() {
  return (
    <>
      <PageMeta
        title={`Terms and service information | ${business.name}`}
        description="Terms and service information — informative template for an independent furniture assembly service based in Moldova."
        path="/termeni-si-conditii"
      />
      <LegalLayout title="Terms and service information">
        <h2>1. About this service</h2>
        <p>
          {business.name} is an independent furniture assembly business, operated by{' '}
          {business.fullName}, specialising in wardrobe assembly, in{' '}
          {business.baseLocation} and other localities across Moldova, by prior arrangement.
        </p>

        <h2>2. Requesting and confirming a quote</h2>
        <p>
          Quotes are free and come with no obligation. An indicative quote is put together
          based on the information provided by the customer (type of furniture,
          manufacturer/model, number of items, photos if available). The final price may be
          adjusted if, on site, details are found that could not be seen from the initial
          information.
        </p>

        <h2>3. Scheduling the visit</h2>
        <p>
          The date and arrival time window are agreed together. [RESCHEDULING/CANCELLATION
          POLICY TO BE CONFIRMED — e.g. please give at least 24 hours' notice of any change to
          the booking].
        </p>

        <h2>4. Scope of the work</h2>
        <p>
          The exact scope of the job (type of furniture, number of items, any additional
          services) is confirmed before assembly begins. Wall fixing, drilling, electrical
          work, plumbing, structural changes, furniture modification and waste-removal
          services are only available where explicitly offered, where the necessary
          competence and authorisation exist, and where they have been agreed in advance.
        </p>

        <h2>5. Missing or damaged parts</h2>
        <p>
          If missing or damaged parts from the manufacturer are found during assembly, you
          will be informed straight away. [POLICY TO BE CONFIRMED regarding the next steps in
          this situation].
        </p>

        <h2>6. Limitation of liability</h2>
        <p>
          Assembly is carried out following the furniture manufacturer's instructions. No
          guarantee is given for outcomes that depend on the quality of materials or
          components supplied by the manufacturer/retailer, on the pre-existing condition of
          walls/floors, or on other conditions outside the direct control of the person
          carrying out the assembly.
        </p>

        <h2>7. Prices</h2>
        <p>
          Prices are communicated individually, based on a free, no-obligation quote, unless
          fixed prices are published on the site.
        </p>

        <h2>8. Manufacturer names</h2>
        <p>
          Furniture manufacturer names may be mentioned solely to describe compatibility with
          their products. This service is independent and is not affiliated with, sponsored
          by, or endorsed by any furniture manufacturer.
        </p>

        <h2>9. Contact</h2>
        <p>
          {business.fullName} · {business.email} · {business.phone}
        </p>
      </LegalLayout>
    </>
  );
}
