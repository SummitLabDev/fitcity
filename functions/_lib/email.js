// Resend email helper for sending confirmation emails

const RESEND_API_BASE = 'https://api.resend.com';

export async function sendSignupConfirmation(apiKey, fromEmail, signup) {
  const html = generateConfirmationEmailHtml(signup);
  const text = generateConfirmationEmailText(signup);

  const response = await fetch(`${RESEND_API_BASE}/emails`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: signup.email,
      subject: 'Bevestiging inschrijving FitCity Culemborg',
      html,
      text,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Resend API error: ${error.message || 'Unknown error'}`);
  }

  return response.json();
}

function generateConfirmationEmailHtml(signup) {
  const formattedPrice = formatPrice(parseFloat(signup.membershipPrice));
  const formattedStartDate = formatDate(signup.startDate);

  // Colors as solid hex (no rgba - iOS Mail doesn't support it)
  const bgDark = '#0b0b0f';
  const bgCard = '#0f1117';
  const bgCardInner = '#1a1d24';
  const bgWarning = '#2a2410';
  const textPrimary = '#e5e7eb';
  const textMuted = '#9ca3af';
  const accent = '#ffe500';
  const borderColor = '#2a2d35';

  return `
<!DOCTYPE html>
<html lang="nl" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Bevestiging inschrijving</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    :root { color-scheme: dark; supported-color-schemes: dark; }
    body, html { background-color: ${bgDark} !important; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${bgDark};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:${textPrimary};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;" bgcolor="${bgDark}">
  <!--[if mso]>
  <table role="presentation" width="100%" bgcolor="${bgDark}"><tr><td>
  <![endif]-->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${bgDark}" style="background-color:${bgDark};">
    <tr>
      <td align="center" bgcolor="${bgDark}" style="padding:24px 12px;background-color:${bgDark};">

        <!-- Main card -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${bgCard}" style="width:100%;max-width:600px;border-radius:18px;background-color:${bgCard};">
          <tr>
            <td bgcolor="${bgCard}" style="padding:28px 22px;background-color:${bgCard};">

              <!-- Header -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" bgcolor="${bgCard}" style="padding-bottom:20px;background-color:${bgCard};">
                    <h1 style="color:${accent};font-size:22px;margin:0 0 6px 0;font-weight:700;">Welkom bij FitCity!</h1>
                    <p style="color:${textMuted};margin:0;font-size:14px;">Je inschrijving is bevestigd</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 14px 0;line-height:1.6;color:${textPrimary};">Beste ${signup.firstName},</p>

              <p style="margin:0 0 14px 0;line-height:1.6;color:${textPrimary};">Bedankt voor je inschrijving bij FitCity Culemborg! We hebben je betaling van <strong style="color:${accent};">&#8364;17,00</strong> inschrijfkosten ontvangen.</p>

              <!-- Membership details box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${bgCardInner}" style="background-color:${bgCardInner};border:1px solid ${borderColor};border-radius:12px;margin:0 0 14px 0;">
                <tr>
                  <td bgcolor="${bgCardInner}" style="padding:14px;background-color:${bgCardInner};">
                    <h2 style="font-size:15px;color:${accent};margin:0 0 10px 0;font-weight:600;">Jouw abonnement</h2>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;">
                      <tr>
                        <td bgcolor="${bgCardInner}" style="padding:6px 0;color:${textMuted};background-color:${bgCardInner};">Abonnement:</td>
                        <td bgcolor="${bgCardInner}" style="padding:6px 0;text-align:right;font-weight:600;color:${textPrimary};background-color:${bgCardInner};">${signup.membershipName}</td>
                      </tr>
                      <tr>
                        <td bgcolor="${bgCardInner}" style="padding:6px 0;color:${textMuted};background-color:${bgCardInner};">Prijs:</td>
                        <td bgcolor="${bgCardInner}" style="padding:6px 0;text-align:right;font-weight:600;color:${textPrimary};background-color:${bgCardInner};">${formattedPrice} / ${signup.membershipTerm}</td>
                      </tr>
                      <tr>
                        <td bgcolor="${bgCardInner}" style="padding:6px 0;color:${textMuted};background-color:${bgCardInner};">Startdatum:</td>
                        <td bgcolor="${bgCardInner}" style="padding:6px 0;text-align:right;font-weight:600;color:${textPrimary};background-color:${bgCardInner};">${formattedStartDate}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Warning box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${bgWarning}" style="background-color:${bgWarning};border:1px solid ${accent};border-radius:12px;margin:0 0 14px 0;">
                <tr>
                  <td bgcolor="${bgWarning}" style="padding:12px;background-color:${bgWarning};">
                    <p style="margin:0;font-size:14px;color:${accent};"><strong>Let op:</strong> Vanaf je startdatum worden de abonnementskosten maandelijks automatisch ge&#239;ncasseerd via SEPA automatische incasso.</p>
                  </td>
                </tr>
              </table>

              <!-- Next steps box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${bgCardInner}" style="background-color:${bgCardInner};border:1px solid ${borderColor};border-radius:12px;margin:0 0 14px 0;">
                <tr>
                  <td bgcolor="${bgCardInner}" style="padding:14px;background-color:${bgCardInner};">
                    <h2 style="font-size:15px;color:${accent};margin:0 0 8px 0;font-weight:600;">Volgende stappen</h2>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;color:${textPrimary};">
                      <tr>
                        <td bgcolor="${bgCardInner}" valign="top" style="padding:4px 8px 4px 0;width:20px;background-color:${bgCardInner};color:${accent};font-weight:600;">1.</td>
                        <td bgcolor="${bgCardInner}" style="padding:4px 0;background-color:${bgCardInner};">Kom langs met een geldig legitimatiebewijs om je ledenpas op te halen.</td>
                      </tr>
                      <tr>
                        <td bgcolor="${bgCardInner}" valign="top" style="padding:4px 8px 4px 0;width:20px;background-color:${bgCardInner};color:${accent};font-weight:600;">2.</td>
                        <td bgcolor="${bgCardInner}" style="padding:4px 0;background-color:${bgCardInner};">Op je startdatum is je lidmaatschap actief; incasso van het maandbedrag volgt automatisch.</td>
                      </tr>
                      <tr>
                        <td bgcolor="${bgCardInner}" valign="top" style="padding:4px 8px 4px 0;width:20px;background-color:${bgCardInner};color:${accent};font-weight:600;">3.</td>
                        <td bgcolor="${bgCardInner}" style="padding:4px 0;background-color:${bgCardInner};">Vragen? Neem contact op via <a href="https://fitcityculemborg.nl/contact" style="color:${accent};font-weight:600;">fitcityculemborg.nl/contact</a> of bel +31 6 46872274.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 14px 0;line-height:1.6;color:${textPrimary};">We kijken ernaar uit je te verwelkomen in onze sportschool!</p>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 16px 0;">
                <tr>
                  <td align="center" bgcolor="${bgCard}" style="background-color:${bgCard};">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" bgcolor="${accent}" style="border-radius:999px;background-color:${accent};">
                          <a href="https://fitcityculemborg.nl/contact" style="display:inline-block;padding:12px 28px;color:#0b0b0f;font-weight:700;text-decoration:none;font-size:14px;">Contact opnemen</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0;line-height:1.6;color:${textPrimary};">
                Sportieve groet,<br>
                <strong>Team FitCity Culemborg</strong>
              </p>

            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin-top:10px;">
          <tr>
            <td align="center" bgcolor="${bgDark}" style="padding:14px 0;background-color:${bgDark};">
              <p style="margin:0 0 6px 0;font-size:12px;color:${textMuted};">FitCity Culemborg</p>
              <p style="margin:0;font-size:12px;"><a href="https://fitcityculemborg.nl" style="color:${textMuted};text-decoration:none;">fitcityculemborg.nl</a></p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
  <!--[if mso]>
  </td></tr></table>
  <![endif]-->
</body>
</html>
  `.trim();
}

function generateConfirmationEmailText(signup) {
  const formattedPrice = formatPrice(parseFloat(signup.membershipPrice));
  const formattedStartDate = formatDate(signup.startDate);

  return `
Welkom bij FitCity!

Beste ${signup.firstName},

Bedankt voor je inschrijving bij FitCity Culemborg! We hebben je betaling van €17,00 inschrijfkosten ontvangen.

JOUW ABONNEMENT
---------------
Abonnement: ${signup.membershipName}
Prijs: ${formattedPrice} / ${signup.membershipTerm}
Startdatum: ${formattedStartDate}

LET OP: Vanaf je startdatum worden de abonnementskosten maandelijks automatisch geïncasseerd via SEPA automatische incasso.

VOLGENDE STAPPEN
---------------
1) Kom langs met een geldig legitimatiebewijs om je ledenpas op te halen.
2) Op je startdatum is je lidmaatschap actief; incasso van het maandbedrag volgt automatisch.
3) Vragen? Neem contact op via https://fitcityculemborg.nl/contact of bel +31 6 46872274.

We kijken ernaar uit je te verwelkomen in onze sportschool. Heb je vragen? Neem gerust contact met ons op.

Sportieve groet,
Team FitCity Culemborg

---
FitCity Culemborg
https://fitcityculemborg.nl
  `.trim();
}

function formatPrice(value) {
  return `€${value.toFixed(2).replace('.', ',')}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl-NL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
