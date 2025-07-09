# Rate My Recipe - Vollständige Webanwendung

Eine moderne Webanwendung zum Erstellen, Bewerten und Verwalten von Rezepten mit React (Frontend) und Spring Boot (Backend).

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


## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 🙏 Danksagungen

- [Spring Boot](https://spring.io/projects/spring-boot) für das Backend-Framework
- [React](https://reactjs.org/) für das Frontend-Framework
- [React Icons](https://react-icons.github.io/react-icons/) für die Icons
- [Unsplash](https://unsplash.com/) für die Beispielbilder 
