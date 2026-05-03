const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
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
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailUser,
    pass: emailPass
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000
});

// Kontaktformular Endpoint
app.post('/contact', async (req, res) => {
  // Variablen vor try-block definieren (für catch-block verfügbar)
  let name, email, phone, service, message;
  
  try {
    // Daten extrahieren
    ({ name, email, phone, service, message } = req.body);

    // Validierung
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Bitte fülle alle Pflichtfelder aus.'
      });
    }

    // Prüfen ob E-Mail Config vorhanden
    if (!emailPass) {
      console.error('ERROR: GMAIL_APP_PASS nicht gesetzt!');
      return res.status(500).json({
        success: false,
        error: 'E-Mail Konfiguration fehlt. Bitte Admin kontaktieren.'
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

    // PROFESSIONELLE E-MAIL AN MIKA (Dich)
    const notificationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Neue Kontaktanfrage - MikaCutterLab</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0a0a0a; color: #fff; line-height: 1.6; }
          .email-wrapper { max-width: 600px; margin: 0 auto; background: #111; border-radius: 16px; overflow: hidden; border: 1px solid #333; }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); padding: 40px 30px; text-align: center; border-bottom: 1px solid #333; }
          .logo { font-size: 28px; font-weight: 700; letter-spacing: -1px; color: #fff; }
          .tagline { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 3px; margin-top: 8px; }
          .content { padding: 40px 30px; }
          .alert-box { background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 20px; margin-bottom: 30px; text-align: center; }
          .alert-icon { font-size: 32px; margin-bottom: 10px; }
          .alert-text { font-size: 18px; font-weight: 600; color: #fff; }
          .field-group { margin-bottom: 25px; }
          .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-bottom: 8px; font-weight: 500; }
          .field-value { font-size: 16px; color: #fff; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; border-left: 3px solid #fff; }
          .message-box { background: rgba(255,255,255,0.03); border-radius: 12px; padding: 25px; margin-top: 30px; border: 1px solid rgba(255,255,255,0.1); }
          .message-label { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #888; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
          .message-text { font-size: 15px; color: #ccc; line-height: 1.8; white-space: pre-wrap; }
          .footer { background: #0a0a0a; padding: 30px; text-align: center; border-top: 1px solid #222; }
          .timestamp { font-size: 12px; color: #555; }
          .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); margin: 30px 0; }
        </style>
      </head>
      <body>
        <div style="padding: 20px;">
          <div class="email-wrapper">
            <div class="header">
              <div class="logo">MikaCutterLab</div>
              <div class="tagline">Create. Cut. Inspire.</div>
            </div>
            
            <div class="content">
              <div class="alert-box">
                <div class="alert-icon">✉️</div>
                <div class="alert-text">Neue Kontaktanfrage eingegangen</div>
              </div>
              
              <div class="field-group">
                <div class="field-label">Name</div>
                <div class="field-value">${name}</div>
              </div>
              
              <div class="field-group">
                <div class="field-label">E-Mail</div>
                <div class="field-value">${email}</div>
              </div>
              
              <div class="field-group">
                <div class="field-label">Telefon</div>
                <div class="field-value">${phone || 'Nicht angegeben'}</div>
              </div>
              
              <div class="field-group">
                <div class="field-label">Gewünschter Service</div>
                <div class="field-value">${service || 'Nicht angegeben'}</div>
              </div>
              
              <div class="divider"></div>
              
              <div class="message-box">
                <div class="message-label">
                  <span>Nachricht</span>
                </div>
                <div class="message-text">${message}</div>
              </div>
            </div>
            
            <div class="footer">
              <div class="timestamp">Eingegangen am ${new Date().toLocaleString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"MikaCutterLab Website" <${emailUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `📧 Neue Anfrage von ${name}`,
      html: notificationHtml,
      text: `Neue Kontaktanfrage von ${name}\n\nE-Mail: ${email}\nTelefon: ${phone || 'Nicht angegeben'}\nService: ${service || 'Nicht angegeben'}\n\nNachricht:\n${message}\n\nEingegangen: ${new Date().toLocaleString('de-DE')}`
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Benachrichtigung gesendet an:', toEmail);

    // PROFESSIONELLE BESTÄTIGUNGS-E-MAIL AN ABSENDER
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vielen Dank - MikaCutterLab</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #0a0a0a; color: #fff; line-height: 1.6; }
          .email-wrapper { max-width: 600px; margin: 0 auto; background: #111; border-radius: 16px; overflow: hidden; border: 1px solid #333; }
          .header { background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); padding: 50px 30px; text-align: center; border-bottom: 1px solid #333; }
          .logo { font-size: 32px; font-weight: 700; letter-spacing: -1px; color: #fff; margin-bottom: 10px; }
          .tagline { font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 4px; }
          .content { padding: 40px 30px; }
          .greeting { font-size: 24px; font-weight: 300; color: #fff; margin-bottom: 20px; }
          .greeting strong { font-weight: 600; }
          .intro-text { font-size: 16px; color: #aaa; line-height: 1.8; margin-bottom: 30px; }
          .status-box { background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; padding: 25px; margin: 30px 0; text-align: center; }
          .status-icon { width: 50px; height: 50px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; center; margin: 0 auto 15px; font-size: 24px; }
          .status-title { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 8px; }
          .status-text { font-size: 14px; color: #888; }
          .what-next { margin-top: 40px; }
          .what-next-title { font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-bottom: 20px; text-align: center; }
          .steps { display: table; width: 100%; }
          .step { display: table-row; }
          .step-number { display: table-cell; width: 40px; font-size: 24px; font-weight: 700; color: rgba(255,255,255,0.3); padding-right: 20px; }
          .step-content { display: table-cell; padding: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.1); }
          .step-title { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 5px; }
          .step-desc { font-size: 14px; color: #888; }
          .step:last-child .step-content { border-bottom: none; }
          .cta-section { margin-top: 40px; text-align: center; padding: 30px; background: rgba(255,255,255,0.03); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); }
          .cta-text { font-size: 16px; color: #aaa; margin-bottom: 20px; }
          .cta-button { display: inline-block; background: #fff; color: #000; padding: 15px 30px; border-radius: 30px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 1px; }
          .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); margin: 30px 0; }
          .footer { background: #0a0a0a; padding: 40px 30px; text-align: center; border-top: 1px solid #222; }
          .social-links { margin-bottom: 20px; }
          .social-link { display: inline-block; margin: 0 10px; color: #666; text-decoration: none; font-size: 13px; }
          .social-link:hover { color: #fff; }
          .footer-text { font-size: 12px; color: #444; margin-bottom: 10px; }
          .footer-brand { font-size: 14px; font-weight: 600; color: #666; }
        </style>
      </head>
      <body>
        <div style="padding: 20px;">
          <div class="email-wrapper">
            <div class="header">
              <div class="logo">MikaCutterLab</div>
              <div class="tagline">Create. Cut. Inspire.</div>
            </div>
            
            <div class="content">
              <div class="greeting">Hallo <strong>${name}</strong>,</div>
              
              <div class="intro-text">
                vielen Dank für deine Anfrage! Deine Nachricht ist bei mir angekommen und ich werde sie mir persönlich durchlesen.
              </div>
              
              <div class="status-box">
                <div class="status-icon">⏱</div>
                <div class="status-title">Antwortzeit</div>
                <div class="status-text">Ich melde mich in der Regel innerhalb von 24 Stunden bei dir.</div>
              </div>
              
              <div class="what-next">
                <div class="what-next-title">Was passiert als Nächstes?</div>
                
                <div class="steps">
                  <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <div class="step-title">Prüfung deiner Anfrage</div>
                      <div class="step-desc">Ich werde dein Projekt und deine Anforderungen analysieren.</div>
                    </div>
                  </div>
                  
                  <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <div class="step-title">Kontaktaufnahme</div>
                      <div class="step-desc">Ich schreibe dir eine E-Mail oder rufe dich an.</div>
                    </div>
                  </div>
                  
                  <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <div class="step-title">Besprechung</div>
                      <div class="step-desc">Wir besprechen Details, Zeitplan und Budget.</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="cta-section">
                <div class="cta-text">In der Zwischenzeit kannst du gerne mehr über meine Arbeit erfahren:</div>
                <a href="https://mikacutterlab.onrender.com/#portfolio" class="cta-button">Portfolio ansehen</a>
              </div>
              
              <div class="divider"></div>
              
              <div style="text-align: center; color: #666; font-size: 14px; line-height: 1.8;">
                Bei dringenden Angelegenheiten erreichst du mich auch direkt:<br>
                <a href="mailto:mika@mika-stratmann.de" style="color: #fff; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.3);">mika@mika-stratmann.de</a>
              </div>
            </div>
            
            <div class="footer">
              <div class="social-links">
                <a href="https://www.tiktok.com/@pizzalandrp" class="social-link">TikTok</a>
                <a href="https://www.youtube.com/@MikaWs187" class="social-link">YouTube</a>
                <a href="https://guns.lol/mikastr" class="social-link">guns.lol</a>
              </div>
              <div class="footer-text">Diese E-Mail wurde automatisch gesendet.</div>
              <div class="footer-brand">MikaCutterLab</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const autoReplyOptions = {
      from: `"Mika - MikaCutterLab" <${emailUser}>`,
      to: email,
      subject: `Vielen Dank für deine Anfrage, ${name}`,
      html: confirmationHtml,
      text: `Hallo ${name},\n\nvielen Dank für deine Anfrage bei MikaCutterLab!\n\nIch habe deine Nachricht erhalten und werde mich in Kürze bei dir melden. In der Regel antworte ich innerhalb von 24 Stunden.\n\nDein Projekt ist mir wichtig und ich freue mich darauf, gemeinsam mit dir etwas Grossartiges zu erschaffen.\n\nWas passiert als Nächstes?\n1. Ich prüfe deine Anfrage persönlich\n2. Ich melde mich per E-Mail oder Telefon bei dir\n3. Wir besprechen alle Details, Zeitplan und Budget\n\nBei dringenden Angelegenheiten erreichst du mich unter: mika@mika-stratmann.de\n\nBis bald,\nMika\nMikaCutterLab - Create. Cut. Inspire.`
    };

    await transporter.sendMail(autoReplyOptions);
    console.log('Bestätigungs-E-Mail gesendet an:', email);

    res.status(200).json({
      success: true,
      message: 'E-Mail erfolgreich gesendet'
    });

  } catch (error) {
    console.error('❌ E-Mail Fehler:', error.message);
    
    // FALLBACK: Anfrage in Datei speichern wenn E-Mail nicht geht
    try {
      const fs = require('fs');
      const path = require('path');
      
      const contactRequest = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        name,
        email,
        phone: phone || '',
        service: service || '',
        message,
        emailError: error.message,
        status: 'pending'
      };
      
      const dataDir = path.join(__dirname, 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      const filePath = path.join(dataDir, 'contact-requests.json');
      let requests = [];
      
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        requests = JSON.parse(content);
      }
      
      requests.push(contactRequest);
      fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));
      
      console.log('✅ Anfrage gespeichert (E-Mail fehlgeschlagen):', filePath);
      
      // Trotzdem Erfolg an User zurückgeben - wir haben die Daten!
      res.status(200).json({
        success: true,
        message: 'Anfrage erfolgreich gespeichert. Ich werde mich bei dir melden!',
        saved: true,
        emailError: true
      });
      
    } catch (saveError) {
      console.error('❌ Auch Speichern fehlgeschlagen:', saveError);
      res.status(500).json({
        success: false,
        error: 'Technischer Fehler. Bitte schreibe mir direkt an mika@mika-stratmann.de'
      });
    }
  }
});

// API Route: Gespeicherte Anfragen abrufen (mit einfachem Passwort-Schutz)
app.get('/admin/requests', (req, res) => {
  const adminPass = req.query.pass;
  if (adminPass !== 'mika2024') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'data', 'contact-requests.json');
    
    if (!fs.existsSync(filePath)) {
      return res.json({ requests: [], count: 0 });
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const requests = JSON.parse(content);
    
    res.json({ 
      requests: requests.reverse(), // Neueste zuerst
      count: requests.length 
    });
  } catch (error) {
    console.error('Fehler beim Lesen:', error);
    res.status(500).json({ error: 'Fehler beim Lesen der Datei' });
  }
});

// Static files: data Ordner auch verfügbar machen
app.use('/data', express.static(path.join(__dirname, 'data')));

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    env: {
      gmailUser: !!emailUser,
      gmailPass: !!emailPass,
      toEmail: !!toEmail
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
  console.log(`API verfügbar unter: http://localhost:${PORT}`);
  console.log(`Admin Panel: http://localhost:${PORT}/admin/requests?pass=mika2024`);
});
