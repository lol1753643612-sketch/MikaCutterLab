const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3005;
const DATA_FILE = path.join(__dirname, 'contact-requests.json');

// CORS - alle Origins erlauben
app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Kontaktformular Endpoint - speichert in JSON Datei
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

    // Neue Anfrage erstellen
    const newRequest = {
      id: Date.now(),
      name,
      email,
      phone: phone || '',
      service: service || '',
      message,
      timestamp: new Date().toISOString(),
      read: false
    };

    // Bestehende Anfragen laden
    let requests = [];
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      requests = JSON.parse(data);
    } catch (e) {
      // Datei existiert noch nicht
    }

    // Neue Anfrage hinzufügen
    requests.push(newRequest);

    // Speichern
    await fs.writeFile(DATA_FILE, JSON.stringify(requests, null, 2));

    console.log('Neue Kontaktanfrage gespeichert:', newRequest.id);
    console.log('Von:', name, '| E-Mail:', email);

    res.status(200).json({
      success: true,
      message: 'Anfrage erfolgreich gespeichert',
      id: newRequest.id
    });

  } catch (error) {
    console.error('Fehler:', error);
    res.status(500).json({
      success: false,
      error: 'Fehler beim Speichern: ' + error.message
    });
  }
});

// Alle Anfragen abrufen (Admin Endpoint)
app.get('/contact-requests', async (req, res) => {
  try {
    let requests = [];
    try {
      const data = await fs.readFile(DATA_FILE, 'utf8');
      requests = JSON.parse(data);
    } catch (e) {
      // Datei existiert noch nicht
    }

    res.json({
      success: true,
      count: requests.length,
      requests: requests.reverse() // Neueste zuerst
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
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
  console.log(`Anfragen werden gespeichert in: ${DATA_FILE}`);
});
