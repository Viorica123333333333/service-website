import LegalLayout from '../components/common/LegalLayout';
import PageMeta from '../components/common/PageMeta';
import { business } from '../config/business';

export default function CookiePolicyPage() {
  return (
    <>
      <PageMeta
        title={`Cookie Policy | ${business.name}`}
        description="Cookie Policy — informative template for an independent furniture assembly service based in Moldova."
        path="/politica-cookie"
      />
      <LegalLayout title="Cookie Policy">
        <h2>1. This site's current setup</h2>
        <p>
          In its default configuration, this site <strong>does not use non-essential
          cookies</strong>, analytics tools, advertising, embedded maps or other tracking
          technologies. The site runs solely on resources that are strictly necessary for
          displaying the page and for submitting the contact form via Netlify Forms.
        </p>

        <h2>2. Web fonts</h2>
        <p>
          The site loads fonts from Google Fonts to display the typography correctly. This may
          involve a technical connection to the font provider's servers. It is not used to
          track your behaviour.
        </p>

        <h2>3. If additional tools are enabled</h2>
        <p>
          If the site owner later enables analytics tools, interactive maps or other
          technologies that involve non-essential cookies, this page must be updated, and the
          site must display a cookie-consent banner before those technologies are activated,
          in line with the applicable legal requirements.
        </p>

        <h2>4. Control via your browser</h2>
        <p>
          You can control or delete cookies through your browser settings. As the site
          currently uses only strictly necessary resources, disabling non-essential cookies in
          your browser does not affect the page's basic functioning.
        </p>

        <h2>5. Contact</h2>
        <p>
          For questions about this policy, you can contact us at {business.email}.
        </p>
      </LegalLayout>
    </>
  );
}
