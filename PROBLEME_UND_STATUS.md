# RateMyRecipe - Aktuelle Probleme und Status

## 🚨 KRITISCHE PROBLEME

### 1. Falsches Backend-Projekt (Hauptproblem)
**Problem:** Das `pom.xml` im Backend-Ordner gehört zu einem anderen Projekt namens "football" und nicht zu RateMyRecipe.

**Symptome:**
- Maven meldet "No plugin found for prefix 'spring-boot'"
- Backend kann nicht korrekt gebaut oder gestartet werden
- Projekt-ID ist `ch.zkk0:football` statt `com.example:RateMyRecipe`

**Lösung:** Das richtige RateMyRecipe Backend-Projekt mit korrektem `pom.xml` muss in den Backend-Ordner gelegt werden.

### 2. Port 8080 belegt
**Problem:** Port 8080 ist ständig von alten Prozessen belegt.

**Symptome:**
- "Web server failed to start. Port 8080 was already in use."
- Backend startet nicht, auch nach pkill-Befehlen

**Lösung:** 
```bash
pkill -f "RateMyRecipeApplication"
pkill -f "spring-boot"
lsof -ti:8080 | xargs kill -9
```

### 3. Datenbankverbindung fehlschlägt
**Problem:** MySQL-Datenbankverbindung schlägt fehl.

**Symptome:**
- "Access denied for user 'ratemyrecipe_user'@'localhost'"
- Backend kann keine Verbindung zur Datenbank aufbauen

**Ursache:** 
- Datenbank läuft in Docker, aber Zugangsdaten stimmen nicht überein
- Benutzer 'ratemyrecipe_user' existiert nicht oder hat falsche Rechte

**Lösung:** Datenbankbenutzer erstellen oder Zugangsdaten in `application.properties` anpassen.

### 4. JWT-Konfiguration fehlerhaft
**Problem:** JWT-Properties werden nicht korrekt geladen.

**Symptome:**
- "Could not resolve placeholder 'myapp.jwtSecret'"
- JwtUtils Bean kann nicht erstellt werden

**Ursache:** Property-Namen in `application.properties` stimmen nicht mit Code überein.

**Lösung:** Property-Namen in `application.properties` von `app.jwtSecret` zu `myapp.jwtSecret` ändern.

### 5. Frontend Tailwind CSS Fehler
**Problem:** Tailwind CSS erkennt Gradient-Klassen nicht.

**Symptome:**
- "Cannot apply unknown utility class `from-blue-500`"
- Frontend startet nicht korrekt

**Ursache:** Tailwind-Konfiguration für Gradients ist unvollständig.

**Lösung:** Tailwind-Konfiguration erweitern oder Gradient-Klassen anders verwenden.

## 📊 AKTUELLER STATUS

### Backend
- ❌ **Nicht lauffähig** - Falsches pom.xml
- ❌ **Datenbankverbindung** - Fehlschlägt
- ❌ **JWT-Konfiguration** - Fehlerhaft
- ❌ **Port 8080** - Belegt

### Frontend
- ⚠️ **Teilweise lauffähig** - Tailwind CSS Fehler
- ✅ **Vite Server** - Läuft auf Port 5177
- ❌ **API-Verbindung** - Backend nicht erreichbar

### Datenbank
- ❌ **MySQL-Verbindung** - Fehlschlägt
- ❌ **Benutzer-Rechte** - Nicht korrekt konfiguriert

## 🔧 ERFORDERLICHE SCHRITTE

### 1. Backend-Projekt korrigieren
```bash
# Richtiges RateMyRecipe Backend-Projekt in backend/ Ordner legen
# pom.xml muss com.example:RateMyRecipe als Projekt-ID haben
```

### 2. Datenbank konfigurieren
```sql
-- MySQL-Benutzer erstellen
CREATE USER 'ratemyrecipe_user'@'localhost' IDENTIFIED BY 'ratemyrecipe123';
GRANT ALL PRIVILEGES ON ratemyrecipe.* TO 'ratemyrecipe_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. JWT-Properties korrigieren
```properties
# In application.properties ändern:
myapp.jwtSecret=your_very_long_and_secure_jwt_secret_key_here
myapp.jwtExpirationMs=86400000
```

### 4. Port-Probleme lösen
```bash
# Alle alten Prozesse beenden
pkill -f "RateMyRecipeApplication"
pkill -f "spring-boot"
sudo lsof -ti:8080 | xargs kill -9
```

### 5. Tailwind CSS reparieren
```javascript
// In tailwind.config.js Gradients korrekt konfigurieren
// oder Gradient-Klassen in CSS-Dateien verwenden
```

## 📁 PROJEKTSTRUKTUR

```
RateMyRecipe/
├── backend/                    # ❌ Falsches Projekt (football)
│   ├── pom.xml                # ❌ Gehört zu football-Projekt
│   └── src/
├── frontend/                   # ⚠️ Teilweise funktional
│   ├── src/
│   ├── tailwind.config.js     # ⚠️ Gradient-Probleme
│   └── package.json
├── docs/                       # ✅ Dokumentation vorhanden
└── README.md                   # ✅ Projektbeschreibung
```

## 🎯 NÄCHSTE SCHRITTE

1. **Hauptproblem lösen:** Richtiges Backend-Projekt einsetzen
2. **Datenbank einrichten:** MySQL-Benutzer und -Rechte konfigurieren
3. **JWT-Konfiguration reparieren:** Property-Namen korrigieren
4. **Port-Probleme beheben:** Alte Prozesse beenden
5. **Frontend reparieren:** Tailwind CSS Gradients korrigieren
6. **Tests durchführen:** Backend und Frontend testen
7. **Deployment vorbereiten:** Produktionskonfiguration

## 📝 COMMIT-NACHRICHT

```
feat: Add comprehensive project documentation and status report

- Document critical issues preventing project from running
- Identify main problem: wrong backend project (football instead of RateMyRecipe)
- List database connection issues and JWT configuration problems
- Document frontend Tailwind CSS gradient errors
- Provide step-by-step solutions for each problem
- Add current project status overview
- Include troubleshooting commands and configuration fixes

Current issues:
- Backend: Wrong pom.xml (football project), port 8080 occupied, DB connection fails
- Frontend: Tailwind gradient classes not recognized
- Database: User access denied, incorrect credentials
- JWT: Property resolution errors

Next steps: Replace backend project, fix database config, resolve port conflicts
```

## 🔗 LINKS

- **GitHub Repository:** https://github.com/brunoo90/RatemyRecipe
- **Backend Issues:** Port 8080, Database, JWT
- **Frontend Issues:** Tailwind CSS Gradients
- **Documentation:** docs/ folder contains project documentation 