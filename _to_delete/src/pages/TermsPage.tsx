import LegalLayout from '../components/common/LegalLayout';
import PageMeta from '../components/common/PageMeta';
import { business } from '../config/business';

export default function TermsPage() {
  return (
    <>
      <PageMeta
        title={`Termeni și informații despre servicii | ${business.name}`}
        description="Termeni și informații despre servicii — model informativ pentru un serviciu independent de montaj mobilă din Republica Moldova."
        path="/termeni-si-conditii"
      />
      <LegalLayout title="Termeni și informații despre servicii">
        <h2>1. Despre acest serviciu</h2>
        <p>
          {business.name} este o activitate independentă de montaj mobilă, operată de{' '}
          {business.fullName}, cu specializare în montajul dulapurilor, în{' '}
          {business.baseLocation} și în alte localități din Republica Moldova, conform
          înțelegerii prealabile.
        </p>

        <h2>2. Solicitarea și confirmarea ofertei</h2>
        <p>
          Ofertele sunt gratuite și fără obligații. O ofertă orientativă se stabilește pe baza
          informațiilor furnizate de client (tip de mobilier, producător/model, număr de piese,
          fotografii, dacă sunt disponibile). Prețul final poate fi ajustat dacă, la fața
          locului, se constată detalii care nu au putut fi observate din informațiile inițiale.
        </p>

        <h2>3. Programarea vizitei</h2>
        <p>
          Data și intervalul orar de sosire se stabilesc de comun acord. [POLITICĂ DE
          REPROGRAMARE/ANULARE DE CONFIRMAT — de exemplu, vă rugăm să anunțați cu cel puțin 24
          de ore înainte orice modificare a programării].
        </p>

        <h2>4. Scopul lucrării</h2>
        <p>
          Scopul exact al lucrării (tipul de mobilier, numărul de piese, eventualele servicii
          suplimentare) se confirmă înainte de începerea montajului. Fixarea în perete,
          găurirea, lucrările electrice, instalațiile sanitare, modificările structurale,
          modificarea mobilierului și serviciile de eliminare a deșeurilor sunt disponibile
          doar dacă au fost oferite explicit, dacă există competența și autorizarea necesară și
          dacă au fost convenite în prealabil.
        </p>

        <h2>5. Piese lipsă sau deteriorate</h2>
        <p>
          Dacă, în timpul montajului, se constată piese lipsă sau deteriorate provenite de la
          producător, veți fi informat imediat. [POLITICĂ DE CONFIRMAT privind pașii următori în
          această situație].
        </p>

        <h2>6. Limitarea răspunderii</h2>
        <p>
          Montajul se realizează conform instrucțiunilor producătorului mobilierului. Nu se
          garantează rezultate care depind de calitatea materialelor sau a componentelor livrate
          de producător/vânzător, de starea preexistentă a pereților/podelelor sau de alte
          condiții din afara controlului direct al persoanei care execută montajul.
        </p>

        <h2>7. Prețuri</h2>
        <p>
          Prețurile se comunică individual, pe baza unei oferte gratuite și fără obligații, cu
          excepția cazului în care sunt publicate prețuri fixe pe site.
        </p>

        <h2>8. Denumiri de producători</h2>
        <p>
          Denumirile unor producători de mobilier pot fi menționate exclusiv pentru a descrie
          compatibilitatea cu produsele respective. Acest serviciu este independent și nu este
          afiliat, sponsorizat sau aprobat de niciun producător de mobilier.
        </p>

        <h2>9. Contact</h2>
        <p>
          {business.fullName} · {business.email} · {business.phone}
        </p>
      </LegalLayout>
    </>
  );
}
