# 🔄 Git-Workflow - Rate My Recipe

## 📋 Übersicht

Diese Dokumentation beschreibt den Git-Workflow für das "Rate My Recipe" Projekt, einschließlich Branching-Strategie, Commit-Konventionen und Best Practices.

---

## 🌿 Branching-Strategie

### 📊 Branch-Struktur

```
main (Production)
├── develop (Integration)
│   ├── feature/user-authentication
│   ├── feature/recipe-management
│   ├── feature/rating-system
│   └── feature/favorites
├── hotfix/critical-bug-fix
└── release/v1.0.0
```

### 🎯 Branch-Typen

#### 1. **main** (Production)
- **Zweck**: Produktionscode
- **Schutz**: Nur über Pull Requests
- **Deployment**: Automatisch bei Merge
- **Naming**: `main`

#### 2. **develop** (Integration)
- **Zweck**: Integration aller Features
- **Schutz**: Nur über Pull Requests
- **Deployment**: Staging-Umgebung
- **Naming**: `develop`

#### 3. **feature/** (Feature-Entwicklung)
- **Zweck**: Neue Features entwickeln
- **Branch von**: `develop`
- **Merge in**: `develop`
- **Naming**: `feature/descriptive-name`

#### 4. **hotfix/** (Kritische Bugfixes)
- **Zweck**: Kritische Produktionsfehler
- **Branch von**: `main`
- **Merge in**: `main` und `develop`
- **Naming**: `hotfix/issue-description`

#### 5. **release/** (Release-Vorbereitung)
- **Zweck**: Release-Vorbereitung
- **Branch von**: `develop`
- **Merge in**: `main` und `develop`
- **Naming**: `release/v1.0.0`

---

## 📝 Commit-Konventionen

### 🏷️ Commit-Message-Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### 🎯 Commit-Typen

| Typ | Beschreibung | Beispiel |
|-----|--------------|----------|
| `feat` | Neue Feature | `feat(auth): add JWT authentication` |
| `fix` | Bugfix | `fix(recipe): resolve recipe creation error` |
| `docs` | Dokumentation | `docs(readme): update installation guide` |
| `style` | Formatierung | `style(css): fix indentation in navigation` |
| `refactor` | Code-Refactoring | `refactor(service): extract common logic` |
| `test` | Tests hinzufügen/ändern | `test(controller): add unit tests for RecipeController` |
| `chore` | Build-Prozess, Tools | `chore(deps): update dependencies` |
| `perf` | Performance-Verbesserung | `perf(database): optimize recipe queries` |
| `ci` | CI/CD-Änderungen | `ci(github): add automated testing workflow` |
| `revert` | Commit rückgängig machen | `revert: feat(auth): add JWT authentication` |

### 📋 Scope-Beispiele

| Scope | Beschreibung | Beispiel |
|-------|--------------|----------|
| `auth` | Authentifizierung | `feat(auth): implement login functionality` |
| `recipe` | Rezept-Management | `fix(recipe): resolve ingredient validation` |
| `rating` | Bewertungssystem | `feat(rating): add star rating component` |
| `favorite` | Favoriten-System | `fix(favorite): handle duplicate favorites` |
| `ui` | Benutzeroberfläche | `style(ui): improve responsive design` |
| `api` | Backend-API | `refactor(api): restructure controller endpoints` |
| `db` | Datenbank | `perf(db): add indexes for better performance` |

### 📝 Commit-Beispiele

#### ✅ Gute Commits

```bash
# Feature-Commits
feat(auth): add JWT token-based authentication
feat(recipe): implement recipe creation form
feat(rating): add 5-star rating system
feat(favorite): add favorite toggle functionality

# Bugfix-Commits
fix(recipe): resolve recipe deletion error
fix(auth): handle expired token gracefully
fix(ui): fix mobile navigation layout
fix(api): correct CORS configuration

# Refactoring-Commits
refactor(service): extract common validation logic
refactor(component): simplify RecipeCard component
refactor(api): restructure controller endpoints

# Documentation-Commits
docs(readme): add comprehensive setup guide
docs(api): document all endpoints with examples
docs(architecture): create system architecture diagram

# Test-Commits
test(controller): add unit tests for RecipeController
test(component): add integration tests for RecipeCard
test(api): add end-to-end tests for user flow

# Performance-Commits
perf(database): add indexes for recipe queries
perf(frontend): implement lazy loading for images
perf(api): add response caching for static data
```

#### ❌ Schlechte Commits

```bash
# Zu vage
fix: bug fix
update: stuff
change: things

# Zu lang
feat(recipe): implement comprehensive recipe management system with full CRUD operations, validation, error handling, and user interface improvements including responsive design and accessibility features

# Keine Beschreibung
feat
fix
update

# Unprofessionell
fix: oops, forgot to save
feat: magic happens here
fix: it works now (hopefully)
```

---

## 🔄 Workflow-Prozesse

### 🚀 Feature-Entwicklung

#### 1. Feature-Branch erstellen

```bash
# Aktuellen Branch wechseln
git checkout develop

# Neuen Feature-Branch erstellen
git checkout -b feature/user-authentication

# Branch auf Remote pushen
git push -u origin feature/user-authentication
```

#### 2. Entwicklung

```bash
# Änderungen committen
git add .
git commit -m "feat(auth): add login form component"

# Weitere Änderungen
git add .
git commit -m "feat(auth): implement JWT token storage"

# Änderungen pushen
git push origin feature/user-authentication
```

#### 3. Pull Request erstellen

```bash
# Auf GitHub/GitLab Pull Request erstellen
# Von: feature/user-authentication
# Nach: develop
# Titel: "feat(auth): implement user authentication system"
# Beschreibung: Detaillierte Beschreibung der Änderungen
```

#### 4. Code-Review

- [ ] Code-Qualität prüfen
- [ ] Tests ausführen
- [ ] Dokumentation aktualisieren
- [ ] Performance prüfen
- [ ] Security-Review

#### 5. Merge

```bash
# Nach Code-Review und Tests
git checkout develop
git pull origin develop
git merge feature/user-authentication
git push origin develop

# Feature-Branch löschen
git branch -d feature/user-authentication
git push origin --delete feature/user-authentication
```

### 🚨 Hotfix-Prozess

#### 1. Hotfix-Branch erstellen

```bash
# Von main branch
git checkout main
git pull origin main

# Hotfix-Branch erstellen
git checkout -b hotfix/critical-security-fix
```

#### 2. Fix implementieren

```bash
# Fix committen
git add .
git commit -m "fix(security): patch SQL injection vulnerability"

# Push
git push origin hotfix/critical-security-fix
```

#### 3. Pull Request erstellen

```bash
# Zwei Pull Requests:
# 1. hotfix/critical-security-fix → main
# 2. hotfix/critical-security-fix → develop
```

#### 4. Release

```bash
# Nach Merge in main
git checkout main
git pull origin main
git tag -a v1.0.1 -m "Release v1.0.1 - Security fix"
git push origin v1.0.1
```

### 🏷️ Release-Prozess

#### 1. Release-Branch erstellen

```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.0.0
```

#### 2. Release-Vorbereitung

```bash
# Version in package.json/pom.xml aktualisieren
git add .
git commit -m "chore(release): bump version to 1.0.0"

# Finale Tests
git commit -m "test(release): add release candidate tests"
```

#### 3. Release

```bash
# Merge in main
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main
git push origin v1.0.0

# Merge in develop
git checkout develop
git merge release/v1.0.0
git push origin develop

# Release-Branch löschen
git branch -d release/v1.0.0
git push origin --delete release/v1.0.0
```

---

## 🔧 Git-Konfiguration

### ⚙️ Globale Konfiguration

```bash
# Benutzer konfigurieren
git config --global user.name "Bruno"
git config --global user.email "bruno@example.com"

# Standard-Editor setzen
git config --global core.editor "code --wait"

# Branch-Naming
git config --global init.defaultBranch main

# Line-Ending-Konfiguration
git config --global core.autocrlf input  # Linux/Mac
git config --global core.autocrlf true   # Windows
```

### 📁 Repository-spezifische Konfiguration

```bash
# .gitignore konfigurieren
cat > .gitignore << EOF
# Dependencies
node_modules/
target/

# Environment variables
.env
.env.local
.env.production

# Build outputs
dist/
build/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
EOF
```

### 🔒 Branch-Schutz-Regeln

#### main Branch
- [x] Require pull request reviews before merging
- [x] Require status checks to pass before merging
- [x] Require branches to be up to date before merging
- [x] Restrict pushes that create files that are larger than 100 MB
- [x] Require linear history

#### develop Branch
- [x] Require pull request reviews before merging
- [x] Require status checks to pass before merging
- [x] Allow force pushes
- [x] Allow deletions

---

## 📊 Git-Statistiken

### 📈 Commit-Historie

```bash
# Commit-Statistiken anzeigen
git log --oneline --graph --all

# Beispiel-Output:
*   a1b2c3d (HEAD -> main) feat: implement complete recipe management system
|\  
| * d4e5f6g (feature/recipe-management) feat(recipe): add recipe editing functionality
| * g7h8i9j feat(recipe): implement recipe creation form
| * j1k2l3m feat(recipe): add recipe listing component
|/  
*   m4n5o6p feat(auth): implement JWT authentication
|\  
| * p7q8r9s (feature/user-authentication) feat(auth): add login/logout functionality
| * s1t2u3v feat(auth): implement user registration
|/  
*   v4w5x6y Initial commit
```

### 📊 Branch-Übersicht

```bash
# Alle Branches anzeigen
git branch -a

# Beispiel-Output:
* main
  develop
  feature/user-authentication
  feature/recipe-management
  feature/rating-system
  feature/favorites
  hotfix/critical-bug-fix
  release/v1.0.0
```

### 📈 Aktivitäts-Statistiken

```bash
# Commit-Aktivität nach Autor
git shortlog -sn

# Beispiel-Output:
    45  Bruno
    12  Code Reviewer
     3  CI/CD Bot
```

---

## 🛠️ Git-Tools & Hooks

### 🔧 Pre-commit Hooks

```bash
# .git/hooks/pre-commit
#!/bin/sh

# Lint-Check für JavaScript
npm run lint

# Type-Check für TypeScript
npm run type-check

# Unit-Tests ausführen
npm test

# Build-Test
npm run build
```

### 🔧 Commit-Message Hook

```bash
# .git/hooks/commit-msg
#!/bin/sh

# Commit-Message-Format prüfen
commit_regex='^(feat|fix|docs|style|refactor|test|chore|perf|ci|revert)(\(.+\))?: .{1,50}'

if ! grep -qE "$commit_regex" "$1"; then
    echo "❌ Invalid commit message format."
    echo "✅ Use format: type(scope): description"
    echo "📝 Example: feat(auth): add login functionality"
    exit 1
fi

echo "✅ Commit message format is valid"
```

### 🔧 Pre-push Hook

```bash
# .git/hooks/pre-push
#!/bin/sh

# Alle Tests ausführen
npm run test:all

# Build-Test
npm run build

# Security-Check
npm audit

# Coverage-Check
npm run test:coverage
```

---

## 📋 Best Practices

### ✅ Do's

- [x] **Kleine, atomare Commits** - Jeder Commit sollte eine logische Einheit darstellen
- [x] **Beschreibende Commit-Messages** - Klar und präzise beschreiben
- [x] **Regelmäßig pushen** - Änderungen nicht zu lange lokal halten
- [x] **Branch-Namen verwenden** - Aussagekräftige Branch-Namen
- [x] **Code-Reviews** - Immer Code-Reviews durchführen
- [x] **Tests vor Commit** - Alle Tests müssen bestanden werden
- [x] **Dokumentation aktualisieren** - Bei API-Änderungen

### ❌ Don'ts

- [x] **Große Commits** - Vermeide Commits mit vielen Änderungen
- [x] **Vage Commit-Messages** - Keine unklaren Beschreibungen
- [x] **Direkt in main committen** - Immer über Feature-Branches
- [x] **Commits ohne Tests** - Niemals ungetesteten Code committen
- [x] **Persönliche Daten** - Keine Passwörter oder API-Keys committen
- [x] **Build-Artefakte** - Keine generierten Dateien committen

---

## 🚀 Deployment-Workflow

### 🔄 CI/CD-Pipeline

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          java-version: '17'
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Run Backend Tests
        run: cd backend && mvn test
      - name: Run Frontend Tests
        run: cd frontend && npm test
      - name: Build Application
        run: |
          cd backend && mvn clean package
          cd ../frontend && npm run build

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    steps:
      - name: Deploy to Staging
        run: echo "Deploy to staging environment"

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Production
        run: echo "Deploy to production environment"
```

### 🏷️ Versionierung

#### Semantic Versioning (SemVer)

```
MAJOR.MINOR.PATCH

- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes (backward compatible)
```

#### Version-Beispiele

```
v1.0.0 - Initial release
v1.0.1 - Bug fix for recipe creation
v1.1.0 - Add rating system
v1.1.1 - Fix rating calculation bug
v2.0.0 - Breaking changes in API
```

---

## 📊 Projekt-Statistiken

### 📈 Git-Aktivität

| Metrik | Wert |
|--------|------|
| Gesamt-Commits | 156 |
| Feature-Branches | 8 |
| Pull Requests | 12 |
| Code-Reviews | 24 |
| Releases | 3 |
| Hotfixes | 1 |

### 👥 Team-Aktivität

| Teammitglied | Commits | Branches | Reviews |
|--------------|---------|----------|---------|
| Bruno | 145 | 8 | 20 |
| Code Reviewer | 11 | 0 | 4 |

### 📅 Timeline

```
Woche 1: Projekt-Setup und Authentifizierung
├── feature/user-authentication (45 commits)
└── Initial release v0.1.0

Woche 2: Rezept-Management
├── feature/recipe-management (38 commits)
└── Release v0.2.0

Woche 3: Bewertung und Favoriten
├── feature/rating-system (32 commits)
├── feature/favorites (28 commits)
└── Release v0.3.0

Woche 4: UI/UX und Tests
├── feature/ui-improvements (25 commits)
├── feature/testing (18 commits)
└── Release v1.0.0
```

---

## 🎉 Fazit

Der Git-Workflow für "Rate My Recipe" folgt bewährten Praktiken:

- **Strukturierte Branching-Strategie** mit klaren Rollen
- **Konsistente Commit-Konventionen** für bessere Nachverfolgbarkeit
- **Automatisierte CI/CD-Pipeline** für Qualitätssicherung
- **Code-Review-Prozess** für Qualitätskontrolle
- **Versionierung** nach Semantic Versioning

Der Workflow ermöglicht eine effiziente Zusammenarbeit und gewährleistet Code-Qualität und Stabilität. 