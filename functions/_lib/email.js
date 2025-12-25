// Resend email helper for sending confirmation emails

const RESEND_API_BASE = 'https://api.resend.com';

export async function sendSignupConfirmation(apiKey, fromEmail, signup) {
  const html = generateConfirmationEmailHtml(signup);
  const text = generateConfirmationEmailText(signup);

  const response = await fetch(`${RESEND_API_BASE}/emails`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: signup.email,
      subject: 'Bevestiging inschrijving FitCity Culemborg',
      html: html,
      text: text,
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

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bevestiging inschrijving</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f2; color: #1a1c23;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <div style="background-color: #ffffff; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">

      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #05060a; font-size: 24px; margin: 0 0 8px 0;">Welkom bij FitCity!</h1>
        <p style="color: #6b7280; margin: 0;">Je inschrijving is bevestigd</p>
      </div>

      <p style="margin: 0 0 24px 0; line-height: 1.6;">
        Beste ${signup.firstName},
      </p>

      <p style="margin: 0 0 24px 0; line-height: 1.6;">
        Bedankt voor je inschrijving bij FitCity Culemborg! We hebben je betaling van <strong>&euro;17,00</strong> inschrijfkosten ontvangen.
      </p>

      <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; margin: 0 0 24px 0;">
        <h2 style="font-size: 16px; color: #05060a; margin: 0 0 16px 0;">Jouw abonnement</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Abonnement:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${signup.membershipName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Prijs:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${formattedPrice} / ${signup.membershipTerm}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Startdatum:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${formattedStartDate}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 12px; padding: 16px; margin: 0 0 24px 0;">
        <p style="margin: 0; font-size: 14px; color: #92400e;">
          <strong>Let op:</strong> Vanaf je startdatum worden de abonnementskosten maandelijks automatisch ge&iuml;ncasseerd via SEPA automatische incasso.
        </p>
      </div>

      <p style="margin: 0 0 24px 0; line-height: 1.6;">
        We kijken ernaar uit je te verwelkomen in onze sportschool. Heb je vragen? Neem gerust contact met ons op.
      </p>

      <p style="margin: 0; line-height: 1.6;">
        Sportieve groet,<br>
        <strong>Team FitCity Culemborg</strong>
      </p>

    </div>

    <div style="text-align: center; padding: 24px 0; color: #9ca3af; font-size: 12px;">
      <p style="margin: 0 0 8px 0;">FitCity Culemborg</p>
      <p style="margin: 0;">
        <a href="https://fitcityculemborg.nl" style="color: #6b7280;">fitcityculemborg.nl</a>
      </p>
    </div>

  </div>
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
