const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3013;

// CORS - alle Origins erlauben
app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Gmail SMTP Transporter
const emailUser = process.env.GMAIL_USER || 'mikastratmann22@gmail.com';
const emailPass = process.env.GMAIL_APP_PASS;
const toEmail = process.env.TO_EMAIL || 'mika@mika-stratmann.de';

console.log('Gmail User:', emailUser);
console.log('Gmail Pass vorhanden:', !!emailPass);
console.log('Empfänger:', toEmail);

if (!emailPass) {
  console.error('FEHLER: GMAIL_APP_PASS ist nicht gesetzt!');
  console.error('Bitte App-Passwort in .env eintragen.');
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: emailUser,
    pass: emailPass
  }
});

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
            ${phone ? `<div class="field"><div class="label">Telefon:</div><div class="value">${phone}</div></div>` : ''}
            ${service ? `<div class="field"><div class="label">Service:</div><div class="value">${service}</div></div>` : ''}
            <div class="field">
              <div class="label">Nachricht:</div>
              <div class="message-box">${message}</div>
            </div>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              Gesendet am: ${new Date().toLocaleString('de-DE')}
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // E-Mail senden an dich
    const mailOptions = {
      from: emailUser,
      to: toEmail,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html: htmlContent,
      text: `Neue Kontaktanfrage von ${name}\n\nE-Mail: ${email}\nTelefon: ${phone || 'Nicht angegeben'}\nService: ${service || 'Nicht angegeben'}\n\nNachricht:\n${message}\n\nGesendet am: ${new Date().toLocaleString('de-DE')}`
    };

    await transporter.sendMail(mailOptions);
    console.log('E-Mail erfolgreich gesendet an:', toEmail);

    // Bestätigungs-E-Mail an Absender
    const autoReplyOptions = {
      from: emailUser,
      to: email,
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

    await transporter.sendMail(autoReplyOptions);
    console.log('Bestätigungs-E-Mail gesendet an:', email);

    res.status(200).json({
      success: true,
      message: 'E-Mail erfolgreich gesendet'
    });

  } catch (error) {
    console.error('Fehler beim Senden:', error);
    res.status(500).json({
      success: false,
      error: 'Fehler beim Senden: ' + error.message
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
