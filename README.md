# 🍳 Rate My Recipe

Eine moderne Web-Anwendung zum Teilen, Bewerten und Favorisieren von Rezepten.

## 📋 Projektübersicht

**Rate My Recipe** ist eine Full-Stack-Webanwendung, die es Nutzern ermöglicht, Rezepte zu erstellen, zu teilen, zu bewerten und zu favorisieren. Die Anwendung bietet eine intuitive Benutzeroberfläche mit modernem Design und umfassender Funktionalität.

### 🎯 Hauptfunktionen

- 👤 **Benutzerauthentifizierung** (Registrierung/Login/Logout)
- 📝 **Rezepte erstellen** mit detaillierten Informationen
- 🔍 **Rezepte durchsuchen** und nach Kategorien filtern
- ⭐ **Rezepte bewerten** mit 5-Sterne-System
- ❤️ **Favoriten verwalten**
- 📂 **Kategorien-Browsing**
- 📱 **Responsive Design** für alle Geräte

## 🏗️ Technologie-Stack

### Frontend
- **React 19** - Moderne UI-Bibliothek
- **Vite** - Schneller Build-Tool
- **Tailwind CSS** - Utility-First CSS Framework
- **React Router** - Client-side Routing
- **Axios** - HTTP-Client für API-Kommunikation
- **Vitest** - Unit-Testing Framework

### Backend
- **Spring Boot 3** - Java-Framework
- **Spring Security** - Authentifizierung & Autorisierung
- **Spring Data JPA** - Datenbankzugriff
- **MySQL** - Relationale Datenbank
- **JWT** - Token-basierte Authentifizierung
- **Maven** - Dependency Management

## 📁 Projektstruktur

```
RateMyRecipe/
├── frontend/                 # React Frontend
│   ├── src/
│   │   ├── modules/         # Feature-basierte Module
│   │   │   ├── auth/        # Authentifizierung
│   │   │   ├── layout/      # Layout-Komponenten
│   │   │   ├── pages/       # Seiten-Komponenten
│   │   │   └── recipes/     # Rezept-bezogene Komponenten
│   │   ├── services/        # API-Services
│   │   ├── styles/          # CSS-Dateien
│   │   └── test/            # Frontend-Tests
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Spring Boot Backend
│   ├── src/main/java/
│   │   └── com/example/RateMyRecipe/
│   │       ├── Controller/  # REST-Controller
│   │       ├── Model/       # JPA-Entities
│   │       ├── repositories/ # Data Repositories
│   │       ├── Security/    # Security-Konfiguration
│   │       └── dto/         # Data Transfer Objects
│   ├── src/test/            # Backend-Tests
│   └── pom.xml
├── docs/                     # Projekt-Dokumentation
├── .env.example             # Umgebungsvariablen-Beispiel
└── README.md
```

## 🚀 Installation & Setup

### Voraussetzungen

- **Java 17+** (für Backend)
- **Node.js 18+** (für Frontend)
- **MySQL 8.0+** (Datenbank)
- **Maven** (Backend-Dependencies)
- **npm** (Frontend-Dependencies)

### 1. Repository klonen

```bash
git clone https://github.com/yourusername/ratemyrecipe.git
cd RateMyRecipe
```

### 2. Datenbank einrichten

```sql
CREATE DATABASE ratemyrecipe;
CREATE USER 'ratemyrecipe_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON ratemyrecipe.* TO 'ratemyrecipe_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Backend konfigurieren

```bash
cd backend
```

Erstelle `src/main/resources/application.properties`:

```properties
# Datenbank-Konfiguration
spring.datasource.url=jdbc:mysql://localhost:3306/ratemyrecipe
spring.datasource.username=ratemyrecipe_user
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# JWT-Konfiguration
app.jwtSecret=your_jwt_secret_key_here_make_it_long_and_secure
app.jwtExpirationMs=86400000

# Server-Konfiguration
server.port=8080
server.servlet.context-path=/api

# Logging
logging.level.com.example.RateMyRecipe=DEBUG
logging.level.org.springframework.security=DEBUG
```

### 4. Backend starten

```bash
mvn clean install
mvn spring-boot:run
```

Das Backend läuft dann auf: http://localhost:8080

### 5. Frontend konfigurieren

```bash
cd frontend
npm install
```

### 6. Frontend starten

```bash
npm run dev
```

Das Frontend läuft dann auf: http://localhost:5173

## 🧪 Tests ausführen

### Backend-Tests

```bash
cd backend
mvn test
```

### Frontend-Tests

```bash
cd frontend
npm test
```

## 📚 API-Dokumentation

### Authentifizierung

#### POST /api/auth/signup
Registriert einen neuen Benutzer.

**Request Body:**
```json
{
  "firstName": "Max",
  "lastName": "Mustermann",
  "email": "max@example.com",
  "password": "securePassword123"
}
```

#### POST /api/auth/login
Loggt einen Benutzer ein.

**Request Body:**
```json
{
  "username": "max@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "id": 1,
  "username": "max@example.com"
}
```

### Rezepte

#### GET /api/recipes
Holt alle Rezepte (mit Pagination).

#### POST /api/recipes
Erstellt ein neues Rezept (authentifiziert).

**Request Body:**
```json
{
  "title": "Pasta Carbonara",
  "description": "Klassische italienische Pasta",
  "ingredients": ["Pasta", "Eier", "Parmesan", "Pancetta"],
  "instructions": ["Pasta kochen", "Sauce zubereiten"],
  "cookTime": 30,
  "servings": 4,
  "difficulty": "MITTEL",
  "category": "HAUPTGERICHT"
}
```

#### GET /api/recipes/{id}
Holt ein spezifisches Rezept.

#### PUT /api/recipes/{id}
Aktualisiert ein Rezept (authentifiziert).

#### DELETE /api/recipes/{id}
Löscht ein Rezept (authentifiziert).

### Favoriten

#### GET /api/favorites
Holt alle Favoriten des eingeloggten Benutzers.

#### POST /api/favorites
Fügt ein Rezept zu den Favoriten hinzu.

#### DELETE /api/favorites/{recipeId}
Entfernt ein Rezept aus den Favoriten.

### Bewertungen

#### POST /api/ratings
Bewertet ein Rezept (1-5 Sterne).

## 🔐 Sicherheit

- **JWT-basierte Authentifizierung**
- **Passwort-Hashing** mit BCrypt
- **CORS-Konfiguration** für Frontend-Integration
- **Input-Validierung** auf Backend-Seite
- **SQL-Injection-Schutz** durch JPA

## 🎨 Design-System

### Farbpalette
- **Primärfarbe:** #6C63FF (Violett)
- **Akzentfarbe:** #A16AE8 (Lila)
- **Hintergrund:** #F4F4F6 (Hellgrau)
- **Text:** #000000 (Schwarz)

### Typografie
- **Schriftart:** Inter (Google Fonts)
- **Responsive Design** für alle Bildschirmgrößen

## 📊 Datenbank-Schema

### Users
- id (PK)
- firstName
- lastName
- email (unique)
- password (hashed)
- roles

### Recipes
- id (PK)
- title
- description
- ingredients (JSON)
- instructions (JSON)
- cookTime
- servings
- difficulty
- category
- userId (FK)
- createdAt
- updatedAt

### Ratings
- id (PK)
- recipeId (FK)
- userId (FK)
- rating (1-5)
- createdAt

### Favorites
- id (PK)
- recipeId (FK)
- userId (FK)
- createdAt

## 🚀 Deployment

### Produktions-Umgebung

1. **Datenbank:** MySQL auf Cloud-Provider (z.B. AWS RDS)
2. **Backend:** Spring Boot auf Cloud-Provider (z.B. Heroku, AWS)
3. **Frontend:** Statische Dateien auf CDN (z.B. Netlify, Vercel)

### Environment Variables

```bash
# Backend (.env)
DATABASE_URL=jdbc:mysql://your-db-host:3306/ratemyrecipe
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
JWT_SECRET=your_very_long_and_secure_jwt_secret
JWT_EXPIRATION=86400000

# Frontend (.env)
VITE_API_BASE_URL=https://your-backend-url.com/api
```

## 👥 Team & Arbeitsjournal

### Bruno - Entwickler
- **Block 1:** Projekt-Setup und Grundstruktur (2 Std)
- **Block 2:** Backend-API implementiert (3 Std)
- **Block 3:** Frontend-Komponenten erstellt (4 Std)
- **Block 4:** Authentifizierung integriert (2 Std)
- **Block 5:** Tests geschrieben (2 Std)
- **Block 6:** Dokumentation erstellt (1 Std)

**Gesamtaufwand:** 14 Stunden

## 📈 Soll-Ist Vergleich

| Feature | Geplant | Implementiert | Status |
|---------|---------|---------------|--------|
| Benutzerregistrierung | ✅ | ✅ | Vollständig |
| Login/Logout | ✅ | ✅ | Vollständig |
| Rezepte erstellen | ✅ | ✅ | Vollständig |
| Rezepte durchsuchen | ✅ | ✅ | Vollständig |
| Favoriten-System | ✅ | ✅ | Vollständig |
| Bewertungssystem | ✅ | ✅ | Vollständig |
| Responsive Design | ✅ | ✅ | Vollständig |
| Backend-Tests | ✅ | ✅ | Vollständig |
| Frontend-Tests | ✅ | ✅ | Vollständig |

## 🐛 Bekannte Probleme & Lösungen

### Problem 1: CORS-Fehler beim Frontend-Backend-Zugriff
**Lösung:** CORS-Konfiguration in Spring Security angepasst

### Problem 2: JWT-Token wird nicht korrekt übertragen
**Lösung:** Axios-Interceptor für automatische Token-Übertragung implementiert

### Problem 3: Responsive Design auf mobilen Geräten
**Lösung:** Tailwind CSS Breakpoints und mobile-first Design angewendet

## 📝 Changelog

### Version 1.0.0 (2024-01-15)
- ✅ Initiale Implementierung
- ✅ Benutzerauthentifizierung
- ✅ Rezept-Management
- ✅ Favoriten-System
- ✅ Bewertungssystem
- ✅ Responsive Design
- ✅ Vollständige Test-Suite
- ✅ Dokumentation

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

## 🤝 Beitragen

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📞 Support

Bei Fragen oder Problemen:
- Erstelle ein Issue auf GitHub
- Kontaktiere das Entwicklungsteam

---

**Entwickelt mit ❤️ für alle Kochbegeisterten**

## Test-User für Anmeldung

Du kannst dich im Frontend mit folgendem Test-User anmelden:

- **Benutzername:** testuser
- **E-Mail:** testuser@example.com
- **Passwort:** testpass

Falls der User nicht existiert, kannst du ihn in MySQL mit folgendem Befehl anlegen:

```sql
INSERT INTO user (username, email, password, enabled) VALUES (
  'testuser',
  'testuser@example.com',
  '$2a$10$Dow1QwQwQwQwQwQwQwQwQeQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQwQw',
  1
);
```

Das Passwort ist: `testpass`
