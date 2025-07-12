# 📋 User Stories - Rate My Recipe

## 🎯 Übersicht

Dieses Dokument enthält alle User Stories für die "Rate My Recipe" Anwendung. Jede Story ist mit Akzeptanzkriterien, Priorität und Zeitaufwand versehen.

---

## 👤 Authentifizierung

### US-001: Benutzerregistrierung
**Als:** Nicht registrierter Nutzer  
**Möchte ich:** Mich registrieren können  
**Damit:** Ich Rezepte erstellen und bewerten kann

**Akzeptanzkriterien:**
- [x] Registrierungsformular mit Vorname, Nachname, E-Mail und Passwort
- [x] E-Mail-Validierung (Format und Eindeutigkeit)
- [x] Passwort-Mindestlänge von 8 Zeichen
- [x] Erfolgs-Feedback nach Registrierung
- [x] Automatische Weiterleitung zur Startseite nach Registrierung

**Priorität:** Hoch  
**Zeitaufwand:** 2 Stunden

---

### US-002: Benutzeranmeldung
**Als:** Registrierter Nutzer  
**Möchte ich:** Mich anmelden können  
**Damit:** Ich auf meine persönlichen Funktionen zugreifen kann

**Akzeptanzkriterien:**
- [x] Login-Formular mit E-Mail/Username und Passwort
- [x] JWT-Token-basierte Authentifizierung
- [x] Fehlerbehandlung bei falschen Anmeldedaten
- [x] "Angemeldet bleiben" Funktionalität
- [x] Automatische Weiterleitung zur vorherigen Seite

**Priorität:** Hoch  
**Zeitaufwand:** 1.5 Stunden

---

### US-003: Benutzerabmeldung
**Als:** Angemeldeter Nutzer  
**Möchte ich:** Mich abmelden können  
**Damit:** Meine Sitzung sicher beende

**Akzeptanzkriterien:**
- [x] Abmelde-Button in der Navigation
- [x] Löschung des JWT-Tokens
- [x] Weiterleitung zur Startseite
- [x] Bestätigungsdialog (optional)

**Priorität:** Mittel  
**Zeitaufwand:** 0.5 Stunden

---

## 📝 Rezept-Management

### US-004: Rezept erstellen
**Als:** Angemeldeter Nutzer  
**Möchte ich:** Ein neues Rezept erstellen können  
**Damit:** Andere es sehen, bewerten und favorisieren können

**Akzeptanzkriterien:**
- [x] Formular mit Titel, Beschreibung, Zutaten, Schritten
- [x] Kategorie-Auswahl (Frühstück, Hauptgericht, Dessert, etc.)
- [x] Schwierigkeitsgrad (Einfach, Mittel, Schwer)
- [x] Kochzeit und Portionen
- [x] Nur eingeloggte Nutzer können Rezepte erstellen
- [x] Erfolgs-Feedback nach Erstellen
- [x] Neues Rezept erscheint direkt auf Startseite

**Priorität:** Hoch  
**Zeitaufwand:** 3 Stunden

---

### US-005: Rezept bearbeiten
**Als:** Rezept-Ersteller  
**Möchte ich:** Mein Rezept bearbeiten können  
**Damit:** Fehler korrigieren oder Verbesserungen vornehmen kann

**Akzeptanzkriterien:**
- [x] Bearbeiten-Button nur für Rezept-Ersteller sichtbar
- [x] Vorausgefülltes Formular mit aktuellen Daten
- [x] Alle Felder editierbar
- [x] Speichern-Button mit Erfolgs-Feedback
- [x] Abbrechen-Button zur Rückkehr zur Detailansicht

**Priorität:** Mittel  
**Zeitaufwand:** 2 Stunden

---

### US-006: Rezept löschen
**Als:** Rezept-Ersteller  
**Möchte ich:** Mein Rezept löschen können  
**Damit:** Falsche oder unerwünschte Rezepte entfernen kann

**Akzeptanzkriterien:**
- [x] Löschen-Button nur für Rezept-Ersteller sichtbar
- [x] Bestätigungsdialog vor Löschung
- [x] Sofortige Entfernung aus allen Listen
- [x] Erfolgs-Feedback nach Löschung

**Priorität:** Niedrig  
**Zeitaufwand:** 1 Stunde

---

## 🔍 Rezept-Durchsuchung

### US-007: Rezepte durchsuchen
**Als:** Nutzer  
**Möchte ich:** Nach Rezepten suchen können  
**Damit:** Spezifische Rezepte schnell finden kann

**Akzeptanzkriterien:**
- [x] Suchleiste auf der Startseite
- [x] Suche in Titel und Beschreibung
- [x] Echtzeit-Suchergebnisse
- [x] "Keine Ergebnisse" Anzeige
- [x] Suchbegriff-Hervorhebung in Ergebnissen

**Priorität:** Hoch  
**Zeitaufwand:** 2 Stunden

---

### US-008: Nach Kategorien filtern
**Als:** Nutzer  
**Möchte ich:** Rezepte nach Kategorien filtern können  
**Damit:** Rezepte nach meinen Vorlieben finden kann

**Akzeptanzkriterien:**
- [x] Kategorie-Filter auf der Startseite
- [x] Alle Kategorien anzeigen (Frühstück, Hauptgericht, etc.)
- [x] Mehrfachauswahl möglich
- [x] Anzahl der Rezepte pro Kategorie anzeigen
- [x] Filter zurücksetzen-Funktion

**Priorität:** Hoch  
**Zeitaufwand:** 2 Stunden

---

### US-009: Favoriten-Filter
**Als:** Angemeldeter Nutzer  
**Möchte ich:** Nur meine Favoriten anzeigen können  
**Damit:** Schnell zu meinen Lieblingsrezepten gelangen kann

**Akzeptanzkriterien:**
- [x] Checkbox "Nur Favoriten anzeigen"
- [x] Kombination mit anderen Filtern möglich
- [x] Nur für angemeldete Nutzer sichtbar
- [x] Anzahl der Favoriten anzeigen

**Priorität:** Mittel  
**Zeitaufwand:** 1 Stunde

---

## ⭐ Bewertungssystem

### US-010: Rezept bewerten
**Als:** Angemeldeter Nutzer  
**Möchte ich:** Rezepte mit 1-5 Sternen bewerten können  
**Damit:** Anderen Nutzern meine Meinung mitteilen kann

**Akzeptanzkriterien:**
- [x] 5-Sterne-Bewertungssystem
- [x] Visuelle Sterne-Anzeige
- [x] Durchschnittsbewertung anzeigen
- [x] Anzahl der Bewertungen anzeigen
- [x] Nur eine Bewertung pro Nutzer pro Rezept
- [x] Bewertung kann geändert werden

**Priorität:** Hoch  
**Zeitaufwand:** 2.5 Stunden

---

### US-011: Bewertungen anzeigen
**Als:** Nutzer  
**Möchte ich:** Bewertungen von Rezepten sehen können  
**Damit:** Die Qualität eines Rezepts einschätzen kann

**Akzeptanzkriterien:**
- [x] Sterne-Anzeige auf Rezeptkarten
- [x] Durchschnittsbewertung prominent anzeigen
- [x] Anzahl der Bewertungen anzeigen
- [x] Bewertungsverteilung (optional)

**Priorität:** Mittel  
**Zeitaufwand:** 1 Stunde

---

## ❤️ Favoriten-System

### US-012: Rezept favorisieren
**Als:** Angemeldeter Nutzer  
**Möchte ich:** Rezepte zu meinen Favoriten hinzufügen können  
**Damit:** Sie später schnell wiederfinden kann

**Akzeptanzkriterien:**
- [x] Herz-Icon auf Rezeptkarten
- [x] Visueller Zustand (gefüllt/leer)
- [x] Sofortige Aktualisierung nach Klick
- [x] Erfolgs-Feedback
- [x] Favoriten-Liste in der Navigation

**Priorität:** Hoch  
**Zeitaufwand:** 2 Stunden

---

### US-013: Favoriten verwalten
**Als:** Angemeldeter Nutzer  
**Möchte ich:** Meine Favoriten verwalten können  
**Damit:** Die Übersicht über meine Lieblingsrezepte behalten kann

**Akzeptanzkriterien:**
- [x] Separate Favoriten-Seite
- [x] Alle favorisierten Rezepte anzeigen
- [x] Favoriten entfernen-Funktion
- [x] Sortierung nach Datum/Bewertung
- [x] Anzahl der Favoriten anzeigen

**Priorität:** Mittel  
**Zeitaufwand:** 1.5 Stunden

---

## 📱 Benutzeroberfläche

### US-014: Responsive Design
**Als:** Nutzer  
**Möchte ich:** Die App auf allen Geräten nutzen können  
**Damit:** Von überall auf Rezepte zugreifen kann

**Akzeptanzkriterien:**
- [x] Mobile-optimiertes Design
- [x] Tablet-optimiertes Design
- [x] Desktop-optimiertes Design
- [x] Touch-freundliche Bedienelemente
- [x] Responsive Navigation

**Priorität:** Hoch  
**Zeitaufwand:** 3 Stunden

---

### US-015: Moderne Benutzeroberfläche
**Als:** Nutzer  
**Möchte ich:** Eine moderne und intuitive Benutzeroberfläche  
**Damit:** Die App gerne und effizient nutzen kann

**Akzeptanzkriterien:**
- [x] Modernes Design mit Tailwind CSS
- [x] Konsistente Farbpalette
- [x] Smooth Animations und Übergänge
- [x] Intuitive Navigation
- [x] Klare visuelle Hierarchie

**Priorität:** Mittel  
**Zeitaufwand:** 2 Stunden

---

## 📊 Statistiken & Feedback

### US-016: Rezept-Statistiken
**Als:** Nutzer  
**Möchte ich:** Statistiken zu Rezepten sehen können  
**Damit:** Die Popularität und Qualität einschätzen kann

**Akzeptanzkriterien:**
- [x] Anzahl der Bewertungen
- [x] Durchschnittsbewertung
- [x] Anzahl der Favoriten
- [x] Erstellungsdatum
- [x] Autor-Information

**Priorität:** Niedrig  
**Zeitaufwand:** 1 Stunde

---

## 🔧 Technische Anforderungen

### US-017: Performance
**Als:** Nutzer  
**Möchte ich:** Eine schnelle und responsive Anwendung  
**Damit:** Reibungslos arbeiten kann

**Akzeptanzkriterien:**
- [x] Ladezeiten unter 2 Sekunden
- [x] Smooth Scrolling
- [x] Optimierte Bilder
- [x] Caching-Strategien
- [x] Lazy Loading für Rezeptkarten

**Priorität:** Mittel  
**Zeitaufwand:** 2 Stunden

---

### US-018: Sicherheit
**Als:** Nutzer  
**Möchte ich:** Meine Daten sicher wissen  
**Damit:** Vertrauensvoll die App nutzen kann

**Akzeptanzkriterien:**
- [x] HTTPS-Verschlüsselung
- [x] Sichere Passwort-Speicherung
- [x] JWT-Token-Sicherheit
- [x] Input-Validierung
- [x] SQL-Injection-Schutz

**Priorität:** Hoch  
**Zeitaufwand:** 2 Stunden

---

## 📈 Gesamtübersicht

| Kategorie | Anzahl Stories | Gesamtaufwand |
|-----------|----------------|---------------|
| Authentifizierung | 3 | 4 Stunden |
| Rezept-Management | 3 | 6 Stunden |
| Durchsuchung | 3 | 5 Stunden |
| Bewertungssystem | 2 | 3.5 Stunden |
| Favoriten-System | 2 | 3.5 Stunden |
| Benutzeroberfläche | 2 | 5 Stunden |
| Statistiken | 1 | 1 Stunde |
| Technische Anforderungen | 2 | 4 Stunden |
| **Gesamt** | **18** | **32 Stunden** |

---

## 🎯 Prioritäten

### Hoch (Muss haben)
- US-001: Benutzerregistrierung
- US-002: Benutzeranmeldung
- US-004: Rezept erstellen
- US-007: Rezepte durchsuchen
- US-008: Nach Kategorien filtern
- US-010: Rezept bewerten
- US-012: Rezept favorisieren
- US-014: Responsive Design
- US-018: Sicherheit

### Mittel (Soll haben)
- US-003: Benutzerabmeldung
- US-005: Rezept bearbeiten
- US-009: Favoriten-Filter
- US-011: Bewertungen anzeigen
- US-013: Favoriten verwalten
- US-015: Moderne Benutzeroberfläche
- US-017: Performance

### Niedrig (Kann haben)
- US-006: Rezept löschen
- US-016: Rezept-Statistiken 