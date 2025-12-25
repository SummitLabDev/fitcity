import Section from '../components/Section';

const Voorwaarden = () => {
  return (
    <>
      <Section
        tone="contrast"
        header={{
          eyebrow: 'Voorwaarden',
          title: 'Voorwaarden Fitcity Culemborg',
          subtitle: 'Deze basisvoorwaarden gelden voor het gebruik van onze diensten en website.',
          align: 'left',
        }}
        contentClassName="space-y-8"
        disableReveal
      >
        <div className="rounded-4xl border border-white/10 bg-white/[0.02] p-8 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Laatst bijgewerkt: 25 december 2025</p>
        </div>

        <div className="space-y-8 rounded-4xl border border-white/10 bg-white/[0.03] p-8 text-sm text-white/70">
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">1. Toepasselijkheid</h3>
            <p>Deze voorwaarden zijn van toepassing op het gebruik van de faciliteiten en diensten van Fitcity Culemborg en op het gebruik van onze website.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">2. Diensten en aanbod</h3>
            <p>Wij bieden fitness, groepslessen en begeleiding. Het actuele aanbod en de tarieven staan op de website of zijn verkrijgbaar bij de balie. Wij kunnen het aanbod en de openingstijden wijzigen wanneer nodig.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">3. Lidmaatschap en overeenkomst</h3>
            <p>Wanneer je een lidmaatschap afsluit (in de club of via de pagina Inschrijven), gelden de afspraken uit jouw overeenkomst. Deze voorwaarden vullen die overeenkomst aan waar nodig.</p>
            <p>Bij online inschrijven kies je zelf de startdatum. De eerste incasso wordt op of rond die gekozen startdatum uitgevoerd.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">4. Betaling</h3>
            <p>Betaling verloopt via de afgesproken betaalmethode. Online betalingen worden afgehandeld door Mollie; wij ontvangen geen volledige kaartgegevens en verwerken bankgegevens niet zelf. Via Mollie zien we betaalstatus en beperkte betaalgegevens (zoals naam rekeninghouder, IBAN en tijdstip) voor administratie.</p>
            <p>De hoogte en de looptijd van de kosten zijn vastgelegd in de overeenkomst. Bij achterstallige betaling kunnen we toegang tot de faciliteiten tijdelijk beperken.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">5. Opzeggen en wijzigen</h3>
            <p>Opzegging of wijziging van een lidmaatschap gebeurt volgens de afspraken in je overeenkomst. Je kunt ons hiervoor bereiken via info@fitcityculemborg.nl.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">6. Huisregels en veiligheid</h3>
            <p>We verwachten dat leden en bezoekers zorgvuldig omgaan met apparatuur, instructies van medewerkers opvolgen en respectvol omgaan met anderen. Bij herhaaldelijk ongepast gedrag kunnen we de toegang weigeren.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">7. Gezondheid en eigen verantwoordelijkheid</h3>
            <p>Sporten is op eigen verantwoordelijkheid. Raadpleeg bij twijfel over je gezondheid eerst een arts. Geef blessures of bijzonderheden aan bij onze medewerkers zodat we je goed kunnen begeleiden.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">8. Aansprakelijkheid</h3>
            <p>Fitcity Culemborg is niet aansprakelijk voor indirecte schade. Voor directe schade is onze aansprakelijkheid beperkt tot het wettelijk toelaatbare en alleen bij opzet of grove nalatigheid.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">9. Intellectueel eigendom</h3>
            <p>Alle teksten, beelden en materialen op deze website zijn eigendom van Fitcity Culemborg of onze partners en mogen niet zonder toestemming worden gebruikt.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">10. Klachten</h3>
            <p>Heb je een klacht of vraag? Neem contact met ons op via info@fitcityculemborg.nl. We zoeken samen naar een oplossing.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">11. Wijzigingen en recht</h3>
            <p>Wij kunnen deze voorwaarden aanpassen wanneer dat nodig is. Nederlands recht is van toepassing.</p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Voorwaarden;
