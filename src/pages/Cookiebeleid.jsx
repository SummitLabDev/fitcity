import Section from '../components/Section';

const Cookiebeleid = () => {
  return (
    <>
      <Section
        tone="contrast"
        header={{
          eyebrow: 'Cookiebeleid',
          title: 'Cookiebeleid Fitcity Culemborg',
          subtitle: 'Hier lees je welke cookies we gebruiken en waarom.',
          align: 'left',
        }}
        contentClassName="space-y-8"
        disableReveal
      >
        <div className="rounded-4xl border border-white/10 bg-white/[0.02] p-8 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Laatst bijgewerkt: 21 december 2025</p>
        </div>

        <div className="space-y-8 rounded-4xl border border-white/10 bg-white/[0.03] p-8 text-sm text-white/70">
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">1. Wat zijn cookies?</h3>
            <p>Cookies zijn kleine tekstbestanden die een website op je apparaat plaatst om de site goed te laten werken en je voorkeuren te onthouden.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">2. Welke cookies gebruiken we?</h3>
            <ul className="space-y-2">
              <li>Functionele cookies die nodig zijn om de website te laten werken, zoals navigatie en formulieren.</li>
              <li>Voorkeurscookies om instellingen te onthouden, wanneer je die instelt.</li>
              <li>Cookies van externe diensten wanneer je ingesloten content bekijkt, zoals Google Maps in onze contactsectie.</li>
            </ul>
            <p>We plaatsen zelf geen advertentie- of trackingcookies.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">3. Cookies van derden</h3>
            <p>Wanneer je een kaart of andere externe content bekijkt, kan de aanbieder cookies plaatsen. Op de verwerking daarvan zijn de privacy- en cookieverklaringen van die partijen van toepassing, zoals die van Google.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">4. Cookies beheren of verwijderen</h3>
            <p>Je kunt cookies via je browserinstellingen verwijderen of blokkeren. Houd er rekening mee dat de website dan mogelijk niet optimaal werkt.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">5. Wijzigingen</h3>
            <p>We kunnen dit cookiebeleid aanpassen wanneer onze website of wetgeving verandert. Controleer deze pagina regelmatig voor updates.</p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Cookiebeleid;
