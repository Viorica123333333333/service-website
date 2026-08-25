/** wardrobeStory.ts — content for the sticky scroll "specialist wardrobe" sequence. */
export interface WardrobeStorySlide {
  id: string;
  title: string;
  text: string;
  image: string;
  alt: string;
}

/**
 * NOTE: these are real reference photography (not photos of this business's
 * own completed jobs) — replace with genuine project photos as they become
 * available. See README.
 */
export const wardrobeStorySlides: WardrobeStorySlide[] = [
  {
    id: 'nivelare',
    title: 'Nivelare atentă',
    text: 'Fiecare dulap începe cu o verificare a nivelului podelei și a pereților, pentru o bază stabilă și dreaptă.',
    image: '/images/real/story-nivelare.jpg',
    alt: 'Nivelă laser folosită pentru verificarea alinierii bazei unui corp de mobilier — imagine de referință',
  },
  {
    id: 'aliniere-usi',
    title: 'Alinierea ușilor',
    text: 'Balamalele și șinele glisante sunt reglate fin, astfel încât ușile să se închidă uniform, fără frecări.',
    image: '/images/real/story-aliniere.jpg',
    alt: 'Reglarea unei balamale de ușă de dulap cu șurubelnița — imagine de referință',
  },
  {
    id: 'interior',
    title: 'Organizare interioară',
    text: 'Rafturile, barele și sertarele interioare sunt montate ferm, pentru un spațiu de depozitare practic.',
    image: '/images/real/story-interior.jpg',
    alt: 'Montarea unui raft și a barei pentru haine în interiorul unui dulap — imagine de referință',
  },
  {
    id: 'verificare-finala',
    title: 'Verificare finală',
    text: 'La final, verificăm stabilitatea întregii structuri și funcționarea corectă a fiecărei componente.',
    image: '/images/real/story-verificare.jpg',
    alt: 'Verificarea finală a unui dulap montat, cu sertarele funcționale — imagine de referință',
  },
];

export const wardrobeStoryIntro = `Dulapurile ridică provocări specifice pe care alte piese de mobilier nu le au: podele
și pereți care nu sunt perfect drepți, uși grele care trebuie aliniate cu precizie și
sisteme interioare care trebuie să reziste în timp. De aceea, montajul unui dulap
necesită nivelare atentă, ajustarea ușilor și verificări finale de stabilitate.`;
