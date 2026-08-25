import LegalLayout from '../components/common/LegalLayout';
import PageMeta from '../components/common/PageMeta';
import { business } from '../config/business';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageMeta
        title={`Politica de confidențialitate | ${business.name}`}
        description="Politica de confidențialitate — model informativ pentru un serviciu independent de montaj mobilă din Republica Moldova."
        path="/politica-de-confidentialitate"
      />
      <LegalLayout title="Politica de confidențialitate">
        <h2>1. Ce date colectăm</h2>
        <p>
          Prin intermediul formularului de solicitare a ofertei, putem colecta următoarele date
          cu caracter personal: nume, adresă de e-mail, număr de telefon, localitate sau cod
          poștal, tipul de mobilier, producătorul/modelul (dacă este indicat), numărul de
          piese, data preferată pentru programare și conținutul mesajului transmis. Nu
          solicităm și nu colectăm date suplimentare, care nu sunt necesare pentru pregătirea
          unei oferte sau pentru programarea vizitei.
        </p>

        <h2>2. De ce colectăm aceste date</h2>
        <p>
          Datele sunt folosite exclusiv pentru a răspunde solicitării dumneavoastră de ofertă,
          pentru a stabili detaliile lucrării și pentru a programa o eventuală vizită. Nu
          folosim aceste date în scopuri de marketing decât dacă exprimați un acord separat și
          explicit în acest sens.
        </p>

        <h2>3. Temeiul juridic (de verificat)</h2>
        <p>
          [TEMEI JURIDIC DE CONFIRMAT — de exemplu, executarea unor măsuri precontractuale la
          cererea persoanei vizate sau consimțământul persoanei vizate]. Acest temei trebuie
          confirmat în raport cu legislația aplicabilă din Republica Moldova privind protecția
          datelor cu caracter personal, înainte de publicarea site-ului.
        </p>

        <h2>4. Cine prelucrează datele</h2>
        <p>
          Datele transmise prin formular sunt prelucrate de {business.fullName}, în calitate de
          persoană responsabilă de activitatea {business.name}. Formularul este găzduit și
          transmis prin intermediul platformei de hosting Netlify; datele pot tranzita prin
          infrastructura acestui furnizor în procesul de transmitere a solicitării.
        </p>

        <h2>5. Furnizori și transferuri internaționale</h2>
        <p>
          [DE CONFIRMAT] În funcție de furnizorii de hosting și de eventualele servicii de
          e-mail folosite pentru notificări, datele pot fi procesate pe servere situate în
          afara Republicii Moldova. Această secțiune trebuie completată cu informații exacte
          despre furnizorii folosiți și, dacă este cazul, cu garanțiile aplicabile pentru
          transferul internațional de date.
        </p>

        <h2>6. Perioada de păstrare</h2>
        <p>
          [PERIOADĂ DE PĂSTRARE DE CONFIRMAT — de exemplu, datele sunt păstrate pe durata
          necesară gestionării solicitării și, ulterior, pentru o perioadă rezonabilă stabilită
          de proprietarul afacerii].
        </p>

        <h2>7. Drepturile dumneavoastră</h2>
        <p>
          În limitele prevăzute de legislația aplicabilă din Republica Moldova, aveți dreptul de
          a solicita accesul la datele dumneavoastră, rectificarea sau ștergerea acestora,
          precum și de a vă retrage consimțământul, atunci când prelucrarea se bazează pe
          acesta. Pentru exercitarea acestor drepturi, ne puteți contacta folosind datele de mai
          jos.
        </p>

        <h2>8. Contact pentru solicitări privind confidențialitatea</h2>
        <p>
          E-mail: {business.email} · Telefon: {business.phone}
        </p>

        <h2>9. Ce nu facem</h2>
        <ul>
          <li>Nu păstrăm datele din formular în stocarea locală a browserului (localStorage).</li>
          <li>Nu vindem și nu închiriem datele dumneavoastră către terți.</li>
          <li>Nu folosim datele din formular în scopuri de publicitate direcționată.</li>
        </ul>
      </LegalLayout>
    </>
  );
}
