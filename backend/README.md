# MikaCutterLab Backend

## Einrichtung

### 1. Abhängigkeiten installieren

```bash
cd backend
npm install
```

### 2. Umgebungsvariablen konfigurieren

```bash
cp .env.example .env
```

Bearbeite die `.env` Datei und füge dein Gmail App-Passwort ein:

```env
GMAIL_USER=mikastratmann22@gmail.com
GMAIL_APP_PASS=dein_google_app_passwort
TO_EMAIL=mika@mika-stratmann.de
```

**Wichtig: Gmail App-Passwort erstellen**
1. Gehe zu https://myaccount.google.com/
2. Aktiviere 2-Faktor-Authentifizierung (falls noch nicht aktiv)
3. Gehe zu https://myaccount.google.com/apppasswords
4. Erstelle ein neues App-Passwort für "Mail"
5. Kopiere das 16-stellige Passwort (ohne Leerzeichen) in die .env Datei

### 3. Server starten

**Entwicklung (mit Auto-Reload):**
```bash
npm run dev
```

**Produktion:**
```bash
npm start
```

Der Server läuft auf Port 3001 (lokal) oder automatisch auf Render

## API Endpoints

### POST /contact
Sendet eine E-Mail über das Kontaktformular.

**Request Body:**
```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "phone": "+49 123 456789",
  "service": "video_editing",
  "message": "Hallo, ich brauche ein Video..."
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "E-Mail erfolgreich gesendet"
}
```

**Response Error (400/500):**
```json
{
  "success": false,
  "error": "Fehlermeldung..."
}
```

### GET /health
Health Check Endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-..."
}
```

## Frontend Integration

Das Frontend erkennt automatisch die richtige API URL:
- Lokal: `http://localhost:3013`
- Render: `https://mikacutterlab-api.onrender.com`

**Lokale Entwicklung:**
1. Backend: `npm run dev` im backend Ordner (Port 3013)
2. Frontend: `npm run dev` im Hauptordner (Port 5173)

**Render Deploy:**
- Frontend: `https://mikacutterlab.onrender.com`
- Backend: `https://mikacutterlab-api.onrender.com`

## Fehlerbehebung

### "Es gab ein Problem beim Senden"
- Prüfe Backend Health: `https://mikacutterlab-api.onrender.com/health`
- Prüfe Environment Variables auf Render (GMAIL_APP_PASS muss gesetzt sein)
- Prüfe die Konsole des Backends auf Fehler

### Gmail Blockiert
- Aktiviere "Weniger sichere Apps" in Gmail NICHT mehr nötig mit App-Passwort
- Verwende unbedingt ein App-Passwort, nicht dein normales Passwort
- Prüfe Spam-Ordner

### CORS Fehler
- Das Backend erlaubt alle Origins via CORS
- Bei Render: Stelle sicher, dass beide Services deployed sind
