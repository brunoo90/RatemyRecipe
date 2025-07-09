# Rate My Recipe - PowerPoint Präsentation

---

## 📋 Folie 1: Titel

# Rate My Recipe
## Eine moderne Rezept-Sharing Plattform

**Entwickelt mit React, Vite & Spring Boot**

*[Dein Name] | [Datum]*

---

## 📋 Folie 2: Projektbeschreibung

### Was ist Rate My Recipe?

Eine Plattform, auf der Nutzer:
- 🍳 **Rezepte entdecken** und durchsuchen
- ⭐ **Rezepte bewerten** und favorisieren  
- ➕ **Eigene Rezepte** erstellen und teilen
- 📚 **Persönliche Rezeptsammlungen** verwalten

**Ziel:** Eine benutzerfreundliche Community für Hobby-Köche

---

## 📋 Folie 3: Tech-Stack

### Frontend-Technologien

⚛️ **React 19.1.0** - Moderne UI-Bibliothek  
⚡ **Vite** - Schneller Build Tool  
🛣️ **React Router 7.6.0** - Navigation  
🔄 **Context API** - State Management  
🎨 **CSS3** - Responsive Design  
📱 **React Icons** - Icon-Bibliothek  

### Backend
☕ **Spring Boot** - Java Backend  
🗄️ **MySQL** - Datenbank  

---

## 📋 Folie 4: Startseite

### 📋 Startseite - Alle Rezepte

**Features:**
- 📄 Dynamische Rezeptliste
- 🔍 Suchfunktion (Titel, Beschreibung, Kategorien)
- 🏷️ Kategorie-Filterung
- 📱 Responsive Grid-Layout
- ⏳ Ladezustände & Fehlerbehandlung

**Code-Beispiel:**
```javascript
useEffect(() => {
  const fetchRecipes = async () => {
    setLoading(true);
    const recipes = await recipeService.getAllRecipes();
    setFilteredRecipes(recipes);
    setLoading(false);
  };
  fetchRecipes();
}, []);
```

---

## 📋 Folie 5: Favoriten-System

### ⭐ Favoriten-Funktionalität

**Features:**
- ❤️ Rezepte zu Favoriten hinzufügen/entfernen
- 💾 Persistente Speicherung pro Benutzer
- 📋 Favoriten-Übersicht mit Bearbeitungsmöglichkeiten
- 🔄 Context API für globalen Favoriten-State

**Code-Beispiel:**
```javascript
const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

const handleFavoriteToggle = (recipeId) => {
  if (favorites.includes(recipeId)) {
    removeFromFavorites(recipeId);
  } else {
    addToFavorites(recipeId);
  }
};
```

---

## 📋 Folie 6: Rezept erstellen

### ➕ Rezept erstellen

**Features:**
- 🔐 Nur für eingeloggte Nutzer verfügbar
- ✅ Formular-Validierung
- 🔄 Automatische Weiterleitung nach Erstellung
- 🎉 Erfolgsmeldungen
- 👁️ Sofortige Anzeige auf Startseite

**Code-Beispiel:**
```javascript
const handleSubmit = async (recipeData) => {
  if (!isAuthenticated) {
    navigate('/login');
    return;
  }
  
  const newRecipe = await recipeService.createRecipe(recipeData);
  setSuccessMessage('Rezept erfolgreich erstellt!');
  navigate('/');
};
```

---

## 📋 Folie 7: Authentifizierung

### 🔐 Login / Signup

**Features:**
- 🎫 JWT-basierte Authentifizierung
- 📝 Benutzerregistrierung
- 🔄 Automatische Weiterleitung nach Login
- 🛡️ Geschützte Routen
- ⏰ Session-Management

**Code-Beispiel:**
```javascript
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('token', response.token);
  };
};
```

---

## 📋 Folie 8: Navigation & Profil

### 👤 Benutzerprofil & Navigation

**Features:**
- 👤 User-Icon mit Dropdown-Menü
- 📚 Schnellzugriff auf "Meine Rezepte"
- 🚪 Logout-Funktionalität
- 📱 Responsive Navigation
- 🧭 Breadcrumb-Navigation

**UI-Komponenten:**
```javascript
const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-brand">Rate My Recipe</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favoriten</Link>
        <Link to="/create">Rezept erstellen</Link>
      </div>
      <UserDropdown />
    </nav>
  );
};
```

---

## 📋 Folie 9: Meine Rezepte

### 📚 Meine Rezepte

**Features:**
- 📋 Übersicht aller eigenen Rezepte
- ✏️ Bearbeiten-Funktion (Inline-Formulare)
- 🗑️ Löschen-Funktion mit Bestätigung
- 📅 Sortierung nach Erstellungsdatum
- 🔗 Direkte Navigation zu Rezept-Details

**Code-Beispiel:**
```javascript
const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  
  const handleDelete = async (recipeId) => {
    if (confirm('Rezept wirklich löschen?')) {
      await recipeService.deleteRecipe(recipeId);
      setMyRecipes(myRecipes.filter(r => r.id !== recipeId));
    }
  };
  
  return (
    <div className="my-recipes">
      {myRecipes.map(recipe => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe}
          onEdit={() => handleEdit(recipe.id)}
          onDelete={() => handleDelete(recipe.id)}
        />
      ))}
    </div>
  );
};
```

---

## 📋 Folie 10: Fehlerbehebungen

### 🔧 Implementierte Verbesserungen

**✅ Gelöste Probleme:**
- 🔄 Weiterleitungen nach Login
- 🎉 Erfolgsmeldungen nach Rezept-Erstellung  
- 👁️ Sofortige Sichtbarkeit neuer Rezepte
- 📱 Responsive Design für alle Geräte
- ⚠️ Fehlerbehandlung & Ladezustände
- ⚡ Optimierte Performance

**Code-Beispiel:**
```javascript
const CreateRecipe = () => {
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSuccess = () => {
    setSuccessMessage('Rezept erfolgreich erstellt!');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };
  
  return (
    <div>
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}
      <RecipeForm onSubmit={handleSuccess} />
    </div>
  );
};
```

---

## 📋 Folie 11: Fazit & Ausblick

### 🎯 Fazit & Ausblick

**✅ Erreicht:**
- 🍳 Vollständige CRUD-Funktionalität
- 🔐 Benutzerauthentifizierung
- 📱 Responsive Design
- ❤️ Favoriten-System
- 🔍 Suchfunktionalität

**🚀 Geplante Erweiterungen:**
- 💬 Kommentarfunktion
- ⭐ Bewertungssystem (1-5 Sterne)
- 📸 Bilder-Upload
- 📱 Mobile App (React Native)
- 🔍 Erweiterte Suchfilter
- 📊 Analytics & Statistiken

**🔗 Projekt-Link:**
https://github.com/brunoo90/RatemyRecipe

---

## 🎨 Design-Vorschläge für PowerPoint

### Farbschema:
- **Primärfarbe:** #4CAF50 (Grün für "Recipe")
- **Sekundärfarbe:** #FF9800 (Orange für "Rating")
- **Hintergrund:** #F5F5F5 (Hellgrau)
- **Text:** #333333 (Dunkelgrau)

### Layout-Tipps:
- Konsistente Schriftarten (Arial oder Calibri)
- Viel Weißraum für bessere Lesbarkeit
- Icons für bessere Visualisierung
- Code-Snippets in Monospace-Font (Consolas)

### Animationen:
- Einfache Fade-In-Effekte
- Schrittweise Aufbau von Listen
- Hervorhebung wichtiger Punkte

### Screenshots einbinden:
- Startseite
- Login-Formular
- Rezept-Erstellung
- Favoriten-Übersicht
- Navigation mit Dropdown

---

## 📝 Notizen für Präsentation

### Redezeit: ca. 10-15 Minuten

### Wichtige Punkte hervorheben:
1. **Moderne Technologien** (React 19, Vite)
2. **Benutzerfreundlichkeit** (Responsive Design)
3. **Sicherheit** (JWT, geschützte Routen)
4. **Erweiterbarkeit** (Modulare Architektur)

### Demo-Vorbereitung:
- Anwendung vorher starten
- Testdaten bereitstellen
- Login-Daten parat haben
- Screenshots als Backup

### Fragen vorbereiten:
- Warum React statt Vue/Angular?
- Wie funktioniert die Authentifizierung?
- Welche Herausforderungen gab es?
- Wie sieht die Zukunft aus? 