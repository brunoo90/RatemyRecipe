# Rate My Recipe - Vollständige Webanwendung

Eine moderne Webanwendung zum Erstellen, Bewerten und Verwalten von Rezepten mit React (Frontend) und Spring Boot (Backend).

---

## 💡 Projektidee

Die Webanwendung RateMyRecipe ermöglicht es mehreren Benutzern, eigene Rezepte zu erstellen, zu verwalten und die Rezepte anderer zu bewerten. Zusätzlich können Nutzer fremde Rezepte als Favoriten speichern, um später leichter darauf zugreifen zu können. Die App unterscheidet zwischen normalen Benutzern (User) und Administratoren (Admin), wobei Admins erweiterte Rechte zur Moderation besitzen.

> **Hinweis:**
> - Die Admin-Funktion (Admin-Login mit Key, Admin-Löschrechte, User-Sperre) ist aktuell **nicht funktionsfähig**.
> - **Bewerten von Rezepten** ist aktuell **nicht funktionsfähig**.
> - **Registrierung neuer User** ist aktuell **nicht funktionsfähig**.
> Alle anderen User-Funktionen (Rezepte, Favoriten) sind wie beschrieben implementiert und getestet.

---

## 📋 User Stories mit Akzeptanzkriterien

### Rezepte erstellen
- **Als User** möchte ich eigene Rezepte hinzufügen, damit ich meine Lieblingsgerichte mit anderen teilen kann.
- **Akzeptanzkriterien:**
  - Nur eingeloggte User können Rezepte erstellen. ✅
  - Pflichtfelder: Titel, Zutaten, Zubereitung. ✅
  - Rezept wird in der öffentlichen Rezeptliste angezeigt. ✅
  - Das Rezept ist dauerhaft dem User zugeordnet. ✅

### Eigene Rezepte bearbeiten oder löschen
- **Als User** möchte ich meine eigenen Rezepte bearbeiten oder löschen können, damit ich sie bei Bedarf aktualisieren oder entfernen kann.
- **Akzeptanzkriterien:**
  - Nur der Ersteller sieht „Bearbeiten“ und „Löschen“ bei seinem eigenen Rezept. ✅
  - Änderungen werden sofort gespeichert und angezeigt. ✅
  - Nach dem Löschen verschwindet das Rezept sofort aus der Liste. ✅

### Rezepte bewerten
- **Als User** möchte ich fremde Rezepte bewerten, damit ich Feedback geben kann und andere gute Rezepte leichter finden.
- **Akzeptanzkriterien:**
  - Bewertung nur bei fremden Rezepten möglich. ❌
  - Ein Rezept kann nur einmal pro User bewertet werden. ❌
  - Bewertung besteht aus 1–5 Sternen, optional mit Kommentar. ❌
  - Durchschnittsbewertung wird beim Rezept angezeigt. ❌
  - Eigene Rezepte können nicht bewertet werden. ❌

### Rezepte favorisieren
- **Als User** möchte ich fremde Rezepte favorisieren, um sie schnell wiederzufinden.
- **Akzeptanzkriterien:**
  - Favorit-Button ist nur bei fremden Rezepten sichtbar. ✅
  - Favorisierte Rezepte sind über „Meine Favoriten“ abrufbar. ✅
  - Favoritenliste ist nur für den jeweiligen User sichtbar. ✅
  - User können Rezepte aus der Favoritenliste entfernen. ✅

### User-Registrierung
- **Als Besucher** möchte ich mich als neuer User registrieren können, um eigene Rezepte zu erstellen und zu bewerten.
- **Akzeptanzkriterien:**
  - Registrierung mit Username, E-Mail und Passwort möglich. ❌
  - Nach erfolgreicher Registrierung kann ich mich einloggen. ❌

### Rezepte anderer Nutzer löschen (Admin)
- **Als Admin** möchte ich Rezepte anderer Nutzer löschen können, wenn sie gegen Richtlinien verstoßen oder unpassend sind.
- **Akzeptanzkriterien:**
  - Admin sieht Löschen-Button bei allen Rezepten. ❌
  - Nach dem Löschen wird das Rezept sofort aus der Liste entfernt. ❌
  - Optional: Admin kann einen Löschgrund angeben (intern gespeichert). ❌

### User temporär sperren (Admin)
- **Als Admin** möchte ich Benutzer vorübergehend sperren können, damit sie keine Rezepte mehr hinzufügen oder bearbeiten können.
- **Akzeptanzkriterien:**
  - Admin kann eine Sperrfrist (z. B. in Tagen) setzen. ❌
  - Gesperrte User sehen bei Rezepterstellung/-bearbeitung eine Fehlermeldung. ❌
  - Nach Ablauf der Sperre werden die Rechte automatisch wieder freigegeben. ❌

### Sich mit Admin-Key anmelden
- **Als Nutzer** möchte ich mich durch Eingabe eines Admin-Keys als Admin anmelden, damit ich erweiterte Rechte erhalte.
- **Akzeptanzkriterien:**
  - Admin-Login erfolgt mit Eingabe eines gültigen Admin-Keys. ❌
  - Wenn der Key korrekt ist, wird der Nutzer dauerhaft als „admin“ gespeichert. ❌
  - Admins haben alle Rechte wie User, außer Favoritenfunktion. ❌

---

## 🚀 Features

### ✅ Implementiert
- **Benutzerauthentifizierung** mit JWT und Spring Security
- **Rezept-Management**: Erstellen, Bearbeiten, Löschen von Rezepten
- **Bewertungssystem**: 1-5 Sterne Bewertungen mit Durchschnittsberechnung
- **Favoriten-System**: Rezepte zu Favoriten hinzufügen/entfernen
- **Suchfunktionalität**: Durchsuchen von Rezepten nach Titel, Beschreibung, Kategorien
- **Kategorien-Filterung**: Rezepte nach Kategorien filtern
- **Responsive Design**: Moderne, mobile-freundliche Benutzeroberfläche
- **Bewertungsanzeige**: Sternbewertungen mit Durchschnitt und Anzahl

### 🎨 Design Features
- **Modernes UI**: Gradient-Hintergründe, Schatten, Hover-Effekte
- **Responsive Layout**: Funktioniert auf Desktop, Tablet und Mobile
- **Interaktive Elemente**: Hover-Effekte, Animationen, Übergänge
- **Icon-Integration**: React Icons für bessere Benutzererfahrung
- **Karten-basiertes Layout**: Übersichtliche Rezeptdarstellung

## 🛠️ Technologie-Stack

### Backend (Spring Boot)
- **Java 21** mit Spring Boot 3.4.5
- **Spring Security** mit JWT-Authentifizierung
- **Spring Data JPA** für Datenbankzugriff
- **MySQL** als Hauptdatenbank
- **H2** für Tests
- **Maven** für Dependency Management

### Frontend (React)
- **React 19.1.0** mit modernen Hooks
- **React Router 7.6.0** für Navigation
- **Vite** als Build Tool
- **React Icons** für Icon-Integration
- **Axios** für HTTP-Requests
- **CSS3** mit modernen Features (Grid, Flexbox, Animations)

## 📁 Projektstruktur

```
RateMyRecipe/
├── backend/
│   ├── src/
│   │   ├── main/java/com/example/RateMyRecipe/
│   │   │   ├── Controller/          # REST-Controller
│   │   │   ├── Model/               # JPA-Entities
│   │   │   ├── repositories/        # Spring Data Repositories
│   │   │   ├── Security/            # Security-Konfiguration
│   │   │   └── dto/                 # Data Transfer Objects
│   │   └── test/java/               # Backend-Tests
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/                # Authentifizierung
│   │   │   ├── layout/              # Layout-Komponenten
│   │   │   ├── pages/               # Seiten-Komponenten
│   │   │   ├── recipes/             # Rezept-Komponenten
│   │   │   └── styles/              # CSS-Dateien
│   │   ├── test/                    # Frontend-Tests
│   │   └── services/                # API-Services
│   └── package.json
└── README.md
```

## 🚀 Installation und Setup

### Backend Setup

1. **Java 21 installieren**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install openjdk-21-jdk
   
   # macOS mit Homebrew
   brew install openjdk@21
   ```

2. **MySQL installieren und konfigurieren**
   ```bash
   # Ubuntu/Debian
   sudo apt install mysql-server
   
   # macOS
   brew install mysql
   ```

3. **Datenbank erstellen**
   ```sql
   CREATE DATABASE ratemyrecipe;
   CREATE USER 'recipeuser'@'localhost' IDENTIFIED BY 'password';
   GRANT ALL PRIVILEGES ON ratemyrecipe.* TO 'recipeuser'@'localhost';
   FLUSH PRIVILEGES;
   ```

4. **Backend starten**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

### Frontend Setup

1. **Node.js installieren** (Version 18 oder höher)
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # macOS
   brew install node
   ```

2. **Frontend starten**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 🧪 Tests ausführen

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Test-Coverage anzeigen
```bash
# Backend
mvn test jacoco:report

# Frontend
npm run test:coverage
```

## 📊 Test-Übersicht

### Backend Tests (3 Tests)
1. **RecipeModelTest.java** - Unit-Tests für das Recipe-Model
   - Rezept-Erstellung und -Validierung
   - Zutaten-Management
   - Bewertungsberechnung
   - Datenaktualisierung

2. **UserModelTest.java** - Unit-Tests für das User-Model
   - Benutzer-Erstellung und -Validierung
   - Blockierungs-Logik
   - Rollen-Management
   - Konstruktor-Tests

3. **RecipeIntegrationTest.java** - Integrationstests für Rezept-Funktionalität
   - CRUD-Operationen mit Datenbank
   - Benutzer-spezifische Rezeptabfragen
   - Datenvalidierung
   - Zutaten-Management

### Frontend Tests (3 Tests)
1. **Home.test.jsx** - Komponententests für die Home-Seite
   - Ladezustände und Fehlerbehandlung
   - Suchfunktionalität
   - Rezept-Filterung
   - Favoriten-Toggle
   - Responsive Verhalten

2. **RecipeCard.test.jsx** - Komponententests für Rezept-Karten
   - Rendering aller Rezept-Details
   - Interaktive Elemente (Favoriten, Bewertungen)
   - Bild-Fehlerbehandlung
   - Navigation zu Detail-Seiten

3. **App.test.jsx** - Integrationstests für die gesamte App
   - Navigation zwischen Seiten
   - Routing-Funktionalität
   - Komponenten-Integration
   - Zustandsverwaltung

## 🔧 Konfiguration

### Backend-Konfiguration (`application.properties`)
```properties
# Datenbank
spring.datasource.url=jdbc:mysql://localhost:3306/ratemyrecipe
spring.datasource.username=recipeuser
spring.datasource.password=password

# JWT
app.jwtSecret=your-secret-key
app.jwtExpirationMs=86400000

# Server
server.port=8080
```

### Frontend-Konfiguration
Die API-Basis-URL kann in `src/services/api.js` konfiguriert werden.

## 🌐 API-Endpunkte

### Authentifizierung
- `POST /api/auth/signup` - Benutzer registrieren
- `POST /api/auth/login` - Benutzer anmelden

### Rezepte
- `GET /api/recipes` - Alle Rezepte abrufen
- `GET /api/recipes/{id}` - Rezept nach ID abrufen
- `POST /api/recipes` - Neues Rezept erstellen
- `PUT /api/recipes/{id}` - Rezept aktualisieren
- `DELETE /api/recipes/{id}` - Rezept löschen
- `GET /api/recipes/category/{category}` - Rezepte nach Kategorie
- `GET /api/recipes/search?query={query}` - Rezepte durchsuchen
- `GET /api/recipes/categories` - Alle Kategorien
- `GET /api/recipes/top-rated` - Top bewertete Rezepte

### Bewertungen
- `POST /api/ratings` - Bewertung erstellen
- `GET /api/ratings/recipe/{recipeId}` - Bewertungen für Rezept

### Favoriten
- `POST /api/favorites` - Zu Favoriten hinzufügen
- `DELETE /api/favorites/{id}` - Aus Favoriten entfernen
- `GET /api/favorites/user/{userId}` - Benutzer-Favoriten

## 🗓️ Arbeitsplan

| Stunde      | Aufgabe                                                                 |
|-------------|-------------------------------------------------------------------------|
| Stunde 1    | Projekt-Setup, GitHub-Repo, Grundstruktur Backend & Frontend            |
| Stunde 2    | Datenbankmodell & JPA-Entities, erste REST-Endpoints, User-Auth         |
| Stunde 3    | Frontend: Routing, Grundlayout, Auth-Formulare, API-Anbindung           |
| Stunde 4    | Rezept-CRUD (Backend & Frontend), Testdaten, erste UI-Komponenten       |
| Stunde 5    | Bewertungssystem & Favoriten (Backend & Frontend), UI-Feinschliff       |
| Stunde 6    | Tests (Backend & Frontend), Fehlerbehandlung, Dokumentation             |
| Stunde 7    | Review, Refactoring, Deployment-Vorbereitung, Präsentation vorbereiten  |

---

## 📋 Arbeitsjournal

### 12.06.2024 - Projektstart & Setup
- [x] GitHub Repository erstellen
- [x] Projektstruktur aufsetzen (Backend + Frontend)
- [x] Entwicklungsumgebung konfigurieren
- [x] Grundlegende Dependencies installieren
- [x] Git-Branches erstellen (main, backend, frontend)

### 19.06.2024 - Backend-Grundlagen
- [X] Spring Boot Anwendung konfigurieren
- [X] Datenbankmodell erstellen (JPA Entities)
- [X] Repository-Layer implementieren
- [X] Erste REST-Controller entwickeln
- [X] Spring Security mit JWT einrichten

### 26.06.2024 - Frontend-Grundlagen
- [X] React-Anwendung mit Vite aufsetzen
- [X] Routing mit React Router implementieren
- [X] Grundlegende UI-Komponenten erstellen
- [X] API-Service für Backend-Kommunikation
- [X] Authentifizierung im Frontend

### 03.07.2024 - Rezept-Management
- [X] CRUD-Operationen für Rezepte (Backend)
- [X] Rezept-Formulare im Frontend
- [X] Bild-Upload-Funktionalität
- [X] Kategorien-System implementieren
- [X] Suchfunktionalität entwickeln

### 07.07.2024 - Bewertungen & Favoriten
- [X] Bewertungssystem implementieren (Backend)
- [X] Sternbewertungen im Frontend
- [X] Favoriten-System entwickeln
- [X] Durchschnittsbewertungen berechnen
- [X] Benutzer-spezifische Rezeptlisten

### 08.07.2024 - Finalisierung & Deployment
- [X] Tests schreiben und ausführen
- [X] Fehlerbehandlung verbessern
- [X] UI/UX optimieren
- [X] Dokumentation vervollständigen
- [X] Deployment vorbereiten

## 🗄️ Datenmodell

```mermaid
erDiagram
    USER ||--o{ RECIPE : erstellt
    USER ||--o{ RATING : gibt
    USER ||--o{ FAVORITE : speichert
    USER }o--|| ROLE : hat
    RECIPE ||--o{ RATING : wird_bewertet
    RECIPE ||--o{ FAVORITE : ist_favorit

    USER {
        Long id
        String username
        String email
        String password
    }
    RECIPE {
        Long id
        String title
        String description
        String imageUrl
        String category
        Double averageRating
        Integer ratingCount
        String instructions
        List<String> ingredients
    }
    RATING {
        Long id
        Integer stars
        String comment
    }
    FAVORITE {
        Long id
    }
    ROLE {
        Long id
        String name
    }
```

## 🔗 Links & Ressourcen

- [Spring Boot](https://spring.io/projects/spring-boot) für das Backend-Framework
- [React](https://reactjs.org/) für das Frontend-Framework
- [React Icons](https://react-icons.github.io/react-icons/) für die Icons
- [Unsplash](https://unsplash.com/) für die Beispielbilder
