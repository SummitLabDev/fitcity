import Section from '../components/Section';

const Privacy = () => {
  return (
    <>
      <Section
        tone="contrast"
        header={{
          eyebrow: 'Privacy',
          title: 'Privacyverklaring Fitcity Culemborg',
          subtitle: 'Wij gaan zorgvuldig om met je persoonsgegevens en leggen hieronder uit hoe en waarom.',
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
            <h3 className="text-xl font-display text-white">1. Verantwoordelijke</h3>
            <p>Fitcity Culemborg is verantwoordelijk voor de verwerking van persoonsgegevens.</p>
            <p>
              Adres: Houtweg 8, 4104 AB Culemborg<br />
              E-mail: info@fitcityculemborg.nl<br />
              Telefoon: +31 6 46872274
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">2. Welke gegevens verwerken we?</h3>
            <ul className="space-y-2">
              <li>Contactgegevens zoals naam, e-mail, telefoon en eventueel adres.</li>
              <li>Berichten en vragen die je met ons deelt via het contactformulier, e-mail, telefoon of WhatsApp.</li>
              <li>Gegevens die nodig zijn voor lidmaatschap en administratie als je een overeenkomst sluit.</li>
              <li>Bezoekgegevens van de website zoals IP-adres, browser en bezochte pagina's (serverlogbestanden).</li>
              <li>Eventuele gezondheidsinformatie die je vrijwillig met ons deelt voor begeleiding.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">3. Waarvoor gebruiken we deze gegevens?</h3>
            <ul className="space-y-2">
              <li>Om vragen te beantwoorden, afspraken te maken of een proefles in te plannen.</li>
              <li>Om een overeenkomst uit te voeren en de administratie te verzorgen.</li>
              <li>Om praktische informatie te sturen, zoals openingstijden of wijzigingen.</li>
              <li>Voor de beveiliging en verbetering van onze website en dienstverlening.</li>
              <li>Om te voldoen aan wettelijke verplichtingen.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">4. Grondslagen</h3>
            <p>Wij verwerken persoonsgegevens op basis van:</p>
            <ul className="space-y-2">
              <li>De uitvoering van een overeenkomst.</li>
              <li>Toestemming (bijvoorbeeld voor het ontvangen van nieuws).</li>
              <li>Een gerechtvaardigd belang, zoals klantcontact en beveiliging.</li>
              <li>Een wettelijke verplichting.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">5. Bewaartermijnen</h3>
            <p>Wij bewaren persoonsgegevens niet langer dan noodzakelijk is voor het doel waarvoor ze zijn verzameld, tenzij een wettelijke bewaarplicht van toepassing is (bijvoorbeeld voor fiscale administratie).</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">6. Delen met derden</h3>
            <p>Wij delen gegevens alleen met derden wanneer dit nodig is voor onze dienstverlening. Denk aan hosting, e-mail, betaal- of softwarediensten. Met deze partijen maken wij afspraken om je gegevens te beschermen. Verder delen wij gegevens alleen als wij daartoe wettelijk verplicht zijn.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">7. Beveiliging</h3>
            <p>Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te beveiligen tegen verlies, misbruik en ongeoorloofde toegang.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">8. Jouw rechten</h3>
            <p>Je hebt het recht op inzage, correctie, verwijdering, beperking, bezwaar en overdraagbaarheid van je gegevens. Ook kun je toestemming intrekken als verwerking daarop is gebaseerd. Stuur hiervoor een verzoek naar info@fitcityculemborg.nl.</p>
            <p>Ben je niet tevreden? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">9. Cookies</h3>
            <p>Wij gebruiken cookies en vergelijkbare technieken. Meer informatie vind je in ons cookiebeleid.</p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Privacy;
