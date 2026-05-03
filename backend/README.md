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
EMAIL_USER=mika@mika-stratmann.de
EMAIL_PASS=dein_gmail_app_passwort
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

Der Server läuft auf Port 3001: http://localhost:3001

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

Das Frontend ist bereits konfiguriert und sendet Anfragen an `http://localhost:3001/contact`.

Stelle sicher, dass:
1. Das Backend läuft (`npm run dev` im backend Ordner)
2. Das Frontend läuft (`npm run dev` im Hauptordner)
3. Beide auf den richtigen Ports laufen

## Fehlerbehebung

### "Es gab ein Problem beim Senden"
- Prüfe ob das Backend läuft: `http://localhost:3001/health`
- Prüfe die Konsole des Backends auf Fehler
- Stelle sicher, dass das EMAIL_PASS korrekt ist

### Gmail Blockiert
- Aktiviere "Weniger sichere Apps" in Gmail NICHT mehr nötig mit App-Passwort
- Verwende unbedingt ein App-Passwort, nicht dein normales Passwort
- Prüfe Spam-Ordner

### CORS Fehler
- Das Backend erlaubt bereits Anfragen von `localhost:5173`
- Falls du einen anderen Port verwendest, passe `server.js` an
