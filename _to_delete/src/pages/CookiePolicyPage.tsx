import LegalLayout from '../components/common/LegalLayout';
import PageMeta from '../components/common/PageMeta';
import { business } from '../config/business';

export default function CookiePolicyPage() {
  return (
    <>
      <PageMeta
        title={`Politica privind modulele cookie | ${business.name}`}
        description="Politica privind modulele cookie — model informativ pentru un serviciu independent de montaj mobilă din Republica Moldova."
        path="/politica-cookie"
      />
      <LegalLayout title="Politica privind modulele cookie">
        <h2>1. Situația actuală a acestui site</h2>
        <p>
          În configurația sa implicită, acest site <strong>nu folosește module cookie
          neesențiale</strong>, instrumente de analiză (analytics), publicitate, hărți încorporate
          sau alte tehnologii de urmărire. Site-ul funcționează exclusiv cu resurse strict
          necesare pentru afișarea paginii și pentru trimiterea formularului de contact prin
          Netlify Forms.
        </p>

        <h2>2. Fonturi web</h2>
        <p>
          Site-ul încarcă fonturi de la Google Fonts pentru afișarea corectă a tipografiei.
          Această încărcare poate implica o conexiune tehnică la serverele furnizorului de
          fonturi. Nu este folosită pentru urmărirea comportamentului dumneavoastră.
        </p>

        <h2>3. Dacă activați instrumente suplimentare</h2>
        <p>
          Dacă, ulterior, proprietarul site-ului activează instrumente de analiză, hărți
          interactive sau alte tehnologii care presupun cookie-uri neesențiale, această pagină
          trebuie actualizată, iar site-ul trebuie să afișeze un banner de consimțământ pentru
          cookie-uri înainte de activarea respectivelor tehnologii, conform cerințelor legale
          aplicabile.
        </p>

        <h2>4. Control din partea browserului</h2>
        <p>
          Puteți controla sau șterge modulele cookie din setările browserului dumneavoastră. Ca
          site-ul folosește în prezent doar resurse strict necesare, dezactivarea cookie-urilor
          neesențiale din browser nu afectează funcționarea de bază a paginii.
        </p>

        <h2>5. Contact</h2>
        <p>
          Pentru întrebări legate de această politică, ne puteți contacta la {business.email}.
        </p>
      </LegalLayout>
    </>
  );
}
