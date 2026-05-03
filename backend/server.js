const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware - CORS erlaubt alle Origins für Entwicklung
app.use(cors({
  origin: true,
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SendGrid Setup
const sendgridApiKey = process.env.SENDGRID_API_KEY;
const toEmail = process.env.TO_EMAIL || 'mika@mika-stratmann.de';
const fromEmail = process.env.FROM_EMAIL || 'noreply@mikacutterlab.de';

console.log('SendGrid API Key vorhanden:', !!sendgridApiKey);
console.log('Empfänger:', toEmail);

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
} else {
  console.error('FEHLER: SENDGRID_API_KEY ist nicht gesetzt!');
}

// Kontaktformular Endpoint
app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Validierung
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Name, E-Mail und Nachricht sind erforderlich'
      });
    }

    // E-Mail validieren
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Ungültige E-Mail-Adresse'
      });
    }

    // HTML E-Mail Template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
          .value { background: white; padding: 10px; border-radius: 5px; border-left: 3px solid #667eea; }
          .message-box { background: white; padding: 15px; border-radius: 5px; border-left: 3px solid #667eea; white-space: pre-wrap; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Neue Kontaktanfrage</h1>
            <p>MikaCutterLab</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">E-Mail:</div>
              <div class="value">${email}</div>
            </div>
            ${phone ? `
            <div class="field">
              <div class="label">Telefon:</div>
              <div class="value">${phone}</div>
            </div>
            ` : ''}
            ${service ? `
            <div class="field">
              <div class="label">Gewünschter Service:</div>
              <div class="value">${service}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Nachricht:</div>
              <div class="message-box">${message}</div>
            </div>
            <div class="footer">
              <p>Diese Anfrage wurde am ${new Date().toLocaleString('de-DE')} über das Kontaktformular auf mikacutterlab.de gesendet.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // E-Mail an dich senden
    const msgToYou = {
      to: toEmail,
      from: fromEmail,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html: htmlContent,
      text: `Neue Kontaktanfrage von ${name}\n\nE-Mail: ${email}\nTelefon: ${phone || 'Nicht angegeben'}\nService: ${service || 'Nicht angegeben'}\n\nNachricht:\n${message}\n\nGesendet am: ${new Date().toLocaleString('de-DE')}`
    };

    await sgMail.send(msgToYou);

    // Bestätigungs-E-Mail an Absender
    const msgToSender = {
      to: email,
      from: fromEmail,
      subject: 'Vielen Dank für deine Anfrage - MikaCutterLab',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1a1a1a; color: white; padding: 30px; text-align: center; }
            .content { background: #f5f5f5; padding: 30px; }
            .highlight { color: #8b5cf6; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>MikaCutterLab</h1>
              <p>Create. Cut. Inspire.</p>
            </div>
            <div class="content">
              <h2>Hallo ${name},</h2>
              <p>vielen Dank für deine Anfrage! Ich habe deine Nachricht erhalten und werde mich so schnell wie möglich bei dir melden.</p>
              <p>Dein Projekt ist mir wichtig, und ich freue mich darauf, gemeinsam mit dir etwas <span class="highlight">Großartiges</span> zu erschaffen.</p>
              <br>
              <p>Bis bald,</p>
              <p><strong>Mika</strong><br>MikaCutterLab</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Hallo ${name},\n\nvielen Dank für deine Anfrage! Ich habe deine Nachricht erhalten und werde mich so schnell wie möglich bei dir melden.\n\nBis bald,\nMika - MikaCutterLab`
    };

    await sgMail.send(msgToSender);

    res.status(200).json({
      success: true,
      message: 'E-Mail erfolgreich gesendet'
    });

  } catch (error) {
    console.error('Detaillierter Fehler:', error);
    res.status(500).json({
      success: false,
      error: 'Fehler beim Senden: ' + (error.message || 'Unbekannter Fehler'),
      details: error.stack
    });
  }
});

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
  console.log(`API verfügbar unter: http://localhost:${PORT}`);
});
