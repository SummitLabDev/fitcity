import Section from '../components/Section';

const Privacy = () => {
  return (
    <>
      <Section
        tone="contrast"
        header={{
          eyebrow: 'Privacy',
          title: 'Privacyverklaring Fitcity Culemborg',
          subtitle: 'Wij gaan zorgvuldig en transparant om met je persoonsgegevens volgens de AVG (Algemene Verordening Gegevensbescherming) en leggen hieronder uit hoe en waarom.',
          align: 'left',
        }}
        contentClassName="space-y-8"
        disableReveal
      >
        <div className="rounded-4xl border border-white/10 bg-white/[0.02] p-8 text-sm text-white/70">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Laatst bijgewerkt: 26 december 2025</p>
        </div>

        <div className="space-y-8 rounded-4xl border border-white/10 bg-white/[0.03] p-8 text-sm text-white/70">
          {/* 1. Verantwoordelijke */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">1. Verantwoordelijke</h3>
            <p>Fitcity Culemborg is verantwoordelijk voor de verwerking van persoonsgegevens zoals bedoeld in de AVG (Algemene Verordening Gegevensbescherming).</p>
            <p>
              <strong className="text-white">Fitcity Culemborg</strong><br />
              Houtweg 8, 4104 AB Culemborg<br />
              E-mail: info@fitcityculemborg.nl<br />
              Telefoon: +31 6 46872274
            </p>
          </div>

          {/* 2. Welke gegevens */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">2. Welke persoonsgegevens verwerken we?</h3>
            <p>Wij verwerken de volgende categorieën persoonsgegevens:</p>

            <div className="space-y-2 ml-4">
              <p><strong className="text-white">a. Contactgegevens en identiteitsgegevens:</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li>Voor- en achternaam</li>
                <li>E-mailadres</li>
                <li>Telefoonnummer</li>
                <li>Geboortedatum</li>
                <li>Adresgegevens (straat, huisnummer, postcode, plaats)</li>
              </ul>

              <p className="pt-2"><strong className="text-white">b. Financiële gegevens (bijzondere categorie):</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li><strong className="text-white">IBAN (bankrekeningnummer)</strong> - Bij online inschrijving verzamelen wij uw IBAN voor automatische incasso via SEPA. Uw IBAN wordt <strong className="text-white">versleuteld opgeslagen</strong> met AES-256-GCM encryptie om maximale beveiliging te garanderen.</li>
                <li>Betalingsstatus en transactiegegevens (via betalingsprovider Mollie)</li>
              </ul>

              <p className="pt-2"><strong className="text-white">c. Lidmaatschapsgegevens:</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li>Gekozen abonnement en tarieven</li>
                <li>Startdatum lidmaatschap</li>
                <li>Contractperiode en verlengingen</li>
                <li>Toegangspas gegevens</li>
              </ul>

              <p className="pt-2"><strong className="text-white">d. Communicatiegegevens:</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li>Berichten en vragen via contactformulier, e-mail, telefoon of WhatsApp</li>
                <li>Correspondentie over uw lidmaatschap</li>
              </ul>

              <p className="pt-2"><strong className="text-white">e. Technische gegevens:</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li>IP-adres, browsertype en bezochte pagina's (serverlogbestanden)</li>
                <li>Cookiegegevens (zie ons cookiebeleid)</li>
              </ul>

              <p className="pt-2"><strong className="text-white">f. Gezondheidsgegevens (optioneel):</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li>Informatie over blessures of medische omstandigheden die u vrijwillig met ons deelt voor veilige begeleiding</li>
              </ul>
            </div>
          </div>

          {/* 3. Doeleinden */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">3. Waarvoor gebruiken we deze gegevens?</h3>
            <p>Wij verwerken uw persoonsgegevens voor de volgende doeleinden:</p>

            <div className="space-y-2 ml-4">
              <p><strong className="text-white">a. Uitvoering van de overeenkomst:</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li>Verwerken van uw (online) inschrijving</li>
                <li>Beheren van uw lidmaatschap en toegangspas</li>
                <li><strong className="text-white">Uitvoeren van automatische incasso via SEPA</strong> - Wij gebruiken uw IBAN uitsluitend voor het maandelijks incasseren van de overeengekomen contributie</li>
                <li>Afhandelen van betalingen en facturatie</li>
                <li>Communicatie over uw lidmaatschap</li>
              </ul>

              <p className="pt-2"><strong className="text-white">b. Wettelijke verplichtingen:</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li>Nakomen van fiscale en boekhoudkundige verplichtingen</li>
                <li>Nakomen van verplichtingen onder de Wet ter voorkoming van witwassen en financieren van terrorisme</li>
              </ul>

              <p className="pt-2"><strong className="text-white">c. Gerechtvaardigd belang:</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li>Beantwoorden van vragen en bieden van klantenservice</li>
                <li>Verbeteren van onze website en dienstverlening</li>
                <li>Beveiliging van onze systemen en voorkomen van fraude</li>
                <li>Interne administratie en bedrijfsvoering</li>
              </ul>

              <p className="pt-2"><strong className="text-white">d. Toestemming:</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li>Versturen van nieuwsbrieven (indien u hiervoor toestemming heeft gegeven)</li>
                <li>Plaatsen van niet-noodzakelijke cookies (zie cookiebeleid)</li>
              </ul>
            </div>
          </div>

          {/* 4. Grondslagen */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">4. Juridische grondslagen (AVG)</h3>
            <p>Wij verwerken uw persoonsgegevens op basis van de volgende juridische grondslagen onder de AVG:</p>

            <ul className="space-y-2 ml-4">
              <li>
                <strong className="text-white">Art. 6 lid 1 sub b AVG - Uitvoering overeenkomst:</strong> De verwerking van contactgegevens, lidmaatschapsgegevens, en <strong className="text-white">IBAN voor SEPA automatische incasso</strong> is noodzakelijk voor de uitvoering van de lidmaatschapsovereenkomst die u met ons aangaat.
              </li>
              <li>
                <strong className="text-white">Art. 6 lid 1 sub c AVG - Wettelijke verplichting:</strong> Bewaren van financiële administratie voor fiscale doeleinden.
              </li>
              <li>
                <strong className="text-white">Art. 6 lid 1 sub f AVG - Gerechtvaardigd belang:</strong> Klantcontact, beveiliging, en verbetering dienstverlening.
              </li>
              <li>
                <strong className="text-white">Art. 6 lid 1 sub a AVG - Toestemming:</strong> Nieuwsbrieven en niet-noodzakelijke cookies.
              </li>
              <li>
                <strong className="text-white">Art. 9 lid 2 sub a AVG - Expliciete toestemming:</strong> Verwerking van eventuele gezondheidsgegevens die u vrijwillig met ons deelt.
              </li>
            </ul>
          </div>

          {/* 5. SEPA mandaat */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">5. SEPA-machtiging en automatische incasso</h3>
            <p>
              Bij online inschrijving geeft u door het verstrekken van uw IBAN en het verzenden van het inschrijfformulier een <strong className="text-white">SEPA-machtiging</strong> aan Fitcity Culemborg. Dit betekent dat u ons machtigt om:
            </p>
            <ul className="ml-6 space-y-1 list-disc">
              <li>Maandelijks het overeengekomen bedrag van uw bankrekening af te schrijven</li>
              <li>Eventuele andere kosten (zoals vervangingspas) te incasseren</li>
              <li>Uw IBAN te delen met onze betalingsprovider Mollie voor het uitvoeren van SEPA incasso's</li>
            </ul>
            <p className="mt-2">
              U heeft het recht om een SEPA-incasso binnen 8 weken na afschrijving te laten terugboeken via uw bank. Bij betalingsachterstanden kunnen wij uw toegang tot de sportschool blokkeren conform artikel 2 van onze algemene voorwaarden.
            </p>
          </div>

          {/* 6. Beveiliging IBAN */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">6. Beveiliging van uw IBAN</h3>
            <p>
              Wij nemen de beveiliging van uw financiële gegevens zeer serieus. Uw IBAN wordt beschermd met de volgende maatregelen:
            </p>
            <ul className="ml-6 space-y-1 list-disc">
              <li><strong className="text-white">Versleutelde opslag:</strong> Uw IBAN wordt versleuteld opgeslagen met AES-256-GCM encryptie, een militaire-grade beveiligingsstandaard</li>
              <li><strong className="text-white">Beperkte toegang:</strong> Alleen geautoriseerde medewerkers kunnen uw IBAN inzien voor legitieme administratieve doeleinden</li>
              <li><strong className="text-white">Veilige transmissie:</strong> Alle gegevens worden verzonden via HTTPS (SSL/TLS encryptie)</li>
              <li><strong className="text-white">Gescheiden opslag:</strong> Financiële gegevens worden gescheiden van andere persoonsgegevens</li>
            </ul>
          </div>

          {/* 7. Bewaartermijnen */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">7. Bewaartermijnen</h3>
            <p>Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld:</p>

            <ul className="ml-6 space-y-2 list-disc">
              <li>
                <strong className="text-white">Actieve leden:</strong> Zolang uw lidmaatschap actief is, plus 1 jaar na beëindiging voor eventuele vragen of claims
              </li>
              <li>
                <strong className="text-white">Financiële gegevens (incl. IBAN):</strong> 7 jaar na einde lidmaatschap conform de Belastingwet (fiscale bewaartermijn)
              </li>
              <li>
                <strong className="text-white">Incomplete inschrijvingen:</strong> Maximaal 6 maanden na inschrijving indien deze niet is afgerond (bijv. geen betaling inschrijfkosten)
              </li>
              <li>
                <strong className="text-white">Contactformulier/vragen:</strong> 2 jaar na laatste contact
              </li>
              <li>
                <strong className="text-white">Nieuwsbrief:</strong> Tot u zich afmeldt
              </li>
            </ul>

            <p className="mt-2 text-white/60 text-xs">
              Na afloop van deze termijnen worden uw gegevens veilig verwijderd, inclusief versleutelde IBAN-gegevens.
            </p>
          </div>

          {/* 8. Delen met derden */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">8. Delen met derden</h3>
            <p>Wij delen uw persoonsgegevens alleen met derden wanneer dit noodzakelijk is voor onze dienstverlening:</p>

            <div className="space-y-2 ml-4">
              <p><strong className="text-white">a. Mollie (betalingsprovider):</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li>Voor het uitvoeren van SEPA automatische incasso's delen wij uw naam, IBAN en incassobedragen met Mollie</li>
                <li>Mollie verwerkt deze gegevens conform hun eigen privacybeleid en de AVG</li>
                <li>Meer informatie: <a href="https://www.mollie.com/privacy" target="_blank" rel="noopener noreferrer" className="text-fitcity underline">mollie.com/privacy</a></li>
              </ul>

              <p className="pt-2"><strong className="text-white">b. Cloudflare (hosting en beveiliging):</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li>Onze website en database worden gehost bij Cloudflare</li>
                <li>Cloudflare verwerkt alleen technische gegevens die noodzakelijk zijn voor hosting</li>
              </ul>

              <p className="pt-2"><strong className="text-white">c. E-mailprovider:</strong></p>
              <ul className="ml-6 space-y-1 list-disc">
                <li>Voor het versturen van bevestigingsmails en communicatie</li>
              </ul>
            </div>

            <p className="mt-2">
              Met deze partijen hebben wij verwerkersovereenkomsten gesloten conform Art. 28 AVG. Wij delen uw gegevens <strong className="text-white">nooit</strong> voor marketing doeleinden met derden.
            </p>

            <p className="mt-2">
              Verder delen wij gegevens alleen als wij daartoe wettelijk verplicht zijn (bijv. op verzoek van politie of justitie met een gerechtelijk bevel).
            </p>
          </div>

          {/* 9. Beveiliging */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">9. Beveiligingsmaatregelen</h3>
            <p>Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beveiligen:</p>

            <ul className="ml-6 space-y-1 list-disc">
              <li>HTTPS/SSL versleuteling voor alle webverkeer</li>
              <li>AES-256-GCM versleuteling voor opslag van IBAN-gegevens</li>
              <li>Toegangsbeveiliging met wachtwoordbescherming</li>
              <li>Regelmatige beveiligingsupdates</li>
              <li>Back-ups en disaster recovery procedures</li>
              <li>Training van medewerkers in gegevensbescherming</li>
            </ul>

            <p className="mt-2 text-white/60 text-xs">
              Ondanks onze inspanningen kunnen wij geen absolute veiligheid garanderen. Bij een datalek informeren wij u en de Autoriteit Persoonsgegevens conform de AVG.
            </p>
          </div>

          {/* 10. Uw rechten */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">10. Uw rechten onder de AVG</h3>
            <p>U heeft de volgende rechten met betrekking tot uw persoonsgegevens:</p>

            <ul className="ml-6 space-y-2 list-disc">
              <li>
                <strong className="text-white">Recht op inzage (Art. 15 AVG):</strong> U kunt opvragen welke persoonsgegevens wij van u verwerken, inclusief uw opgeslagen (versleutelde) IBAN
              </li>
              <li>
                <strong className="text-white">Recht op rectificatie (Art. 16 AVG):</strong> U kunt onjuiste gegevens laten corrigeren
              </li>
              <li>
                <strong className="text-white">Recht op verwijdering (Art. 17 AVG):</strong> U kunt uw gegevens laten verwijderen, tenzij wij een wettelijke grond hebben om ze te bewaren (bijv. fiscale bewaartermijn)
              </li>
              <li>
                <strong className="text-white">Recht op beperking (Art. 18 AVG):</strong> U kunt de verwerking van uw gegevens laten beperken
              </li>
              <li>
                <strong className="text-white">Recht op bezwaar (Art. 21 AVG):</strong> U kunt bezwaar maken tegen verwerking op basis van gerechtvaardigd belang
              </li>
              <li>
                <strong className="text-white">Recht op gegevensoverdraagbaarheid (Art. 20 AVG):</strong> U kunt uw gegevens in een gestructureerd formaat opvragen
              </li>
              <li>
                <strong className="text-white">Recht om toestemming in te trekken:</strong> Als verwerking gebaseerd is op toestemming, kunt u deze te allen tijde intrekken
              </li>
            </ul>

            <p className="mt-3">
              <strong className="text-white">Uitoefenen van uw rechten:</strong><br />
              Stuur een verzoek naar info@fitcityculemborg.nl. Wij reageren binnen 1 maand. Voor identificatie kunnen wij een kopie legitimatiebewijs vragen.
            </p>

            <p className="mt-2">
              <strong className="text-white">Klacht indienen:</strong><br />
              Bent u niet tevreden over hoe wij met uw gegevens omgaan? U heeft het recht een klacht in te dienen bij de <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-fitcity underline">Autoriteit Persoonsgegevens</a>.
            </p>
          </div>

          {/* 11. Cookies */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">11. Cookies</h3>
            <p>
              Wij gebruiken cookies en vergelijkbare technieken. Meer informatie over welke cookies wij gebruiken en waarom, vindt u in ons <a href="/cookiebeleid" className="text-fitcity underline">cookiebeleid</a>.
            </p>
          </div>

          {/* 12. Wijzigingen */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">12. Wijzigingen privacyverklaring</h3>
            <p>
              Wij kunnen deze privacyverklaring van tijd tot tijd aanpassen. De meest recente versie staat altijd op onze website. Wijzigingen worden van kracht op het moment van publicatie. Bij belangrijke wijzigingen informeren wij bestaande leden per e-mail.
            </p>
          </div>

          {/* 13. Vragen */}
          <div className="space-y-3">
            <h3 className="text-xl font-display text-white">13. Vragen?</h3>
            <p>
              Heeft u vragen over deze privacyverklaring of over hoe wij met uw persoonsgegevens omgaan? Neem contact met ons op:
            </p>
            <p>
              E-mail: info@fitcityculemborg.nl<br />
              Telefoon: +31 6 46872274
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Privacy;
