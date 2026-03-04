# Nonnetta

Applicazione web accessibile per la stimolazione neurocognitiva degli anziani, conforme GDPR e alle normative italiane ed europee.

**🌐 Sito web**: [www.nonnetta.eu](https://www.nonnetta.eu)

---

## 🆘 CI SONO ATTIVITÀ MANUALI DA FARE?

### ✅ **SÌ! LEGGI QUI:** [ATTIVITA-MANUALI.md](ATTIVITA-MANUALI.md) 👈

Il codice è pronto, ma serve il TUO intervento per pubblicarlo:
1. **Merge PR** (1 min)
2. **Attiva GitHub Pages** (2 min)  
3. **Configura DNS** (5 min se necessario)

**Tempo totale: ~30 minuti** (inclusa attesa automatica)

---

## 🚨 VEDI ANCORA LA VECCHIA VERSIONE?

### 🆘 SOLUZIONI RAPIDE:

1. **⚡ [FAI-SUBITO.md](FAI-SUBITO.md)** ← INIZIA QUI! (5 minuti)
2. **🛠️ [MANUALE.md](MANUALE.md)** ← Guida passo-passo completa
3. **🌐 [troubleshooting.html](troubleshooting.html)** ← Flowchart interattivo
4. **📚 [PUBBLICAZIONE.md](PUBBLICAZIONE.md)** ← Guida dettagliata con DNS

### 💡 IN BREVE:
1. Merge PR: https://github.com/minimus-cyber/Nonnetta/pulls
2. Attiva GitHub Pages: https://github.com/minimus-cyber/Nonnetta/settings/pages
3. Svuota cache: `Ctrl+Shift+R`
4. Aspetta 10-15 minuti ☕

---

## Accessible Neurocognitive Stimulation Web App

This repository contains an accessible web application for elderly users, hosted on GitHub Pages.

## 🎯 Features

### Accessibility (WCAG 2.1 AA Compliant)
- **High Contrast Theme**: Black background with yellow/orange accents (7:1+ contrast ratio)
- **Large Text**: Extra-large fonts (1.8rem minimum) for easy reading
- **Custom Large Cursor**: Highly visible mouse pointer for elderly users
- **Keyboard Navigation**: Full keyboard support (arrows, space, enter, ESC)
- **Screen Reader Compatible**: Semantic HTML5 and ARIA attributes

### Funzionalità Utente
- **Registrazione e Login**: Autenticazione tramite Firebase (email/password e Google)
- **Recupero password**: Reset via email
- **Tracciamento attività**: Registro giornaliero delle attività neurocognitive su Firestore
- **Gestione storico**: Visualizza, stampa e scarica lo storico attività in formato TXT
- **Privacy dati**: I dati sono archiviati su Firestore con Security Rules che garantiscono la privacy

### Pannello Admin
- **Accesso sicuro tramite Firebase**: Solo gli utenti con ruolo `admin` (assegnato in Firestore) possono accedere
- **Nessuna password hard-coded**: l'accesso admin è gestito da Firebase Authentication e verificato da Firestore Security Rules
- **Gestione utenti**: Visualizza gli utenti registrati e le loro statistiche di attività
- **Dashboard statistiche**: Monitora l'utilizzo e le attività

### GDPR Compliance
- **Cookie Consent Banner**: Compliant with EU regulations
- **Privacy Policy**: Complete GDPR-compliant privacy documentation
- **User Rights**: Full data portability, deletion, and access rights
- **Local Data Storage**: No external data transmission
- **Italian & EU Regulations**: Complies with Legge Stanca and EU Directive 2016/2102

## 🚀 Quick Start

### For Users - Visit the Website
1. Go to [www.nonnetta.eu](https://www.nonnetta.eu)
2. Accept the cookie consent banner
3. Register with your email and password
4. Start tracking your daily activities

### For Developers - Local Testing
1. Clone the repository
2. Open `index.html` in a modern web browser
3. No build step required - it's a static website!

### For Deployment - Publishing to nonnetta.eu
**📖 See deployment guides**:
- **Italian**: [LEGGIMI-PRIMA.md](LEGGIMI-PRIMA.md) - Guida rapida (2 min)
- **Italian**: [PUBBLICAZIONE.md](PUBBLICAZIONE.md) - Guida completa
- **English**: [DEPLOYMENT.md](DEPLOYMENT.md) - Technical guide

## 🎹 Keyboard Navigation

- **Tab**: Navigate between interactive elements
- **Arrow Keys** (⬆️⬇️⬅️➡️): Navigate between activities
- **Space**: Select/deselect activities
- **Enter**: Confirm action or complete selected activity
- **ESC**: Go back or exit current section

## 🔐 Sicurezza

- **Autenticazione Firebase**: Email/password e Google login tramite Firebase Authentication
- **Nessuna password nel codice**: credenziali gestite da Firebase, mai hard-coded nel frontend
- **Firestore Security Rules**: ogni utente può accedere solo ai propri dati
- **Ruolo admin verificato lato server**: nessun bypass possibile dal frontend

Consulta [SECURITY.md](SECURITY.md) e [DEPLOYMENT.md](DEPLOYMENT.md) per la configurazione completa.

## 📁 Project Structure

```
├── index.html          # Pagina principale
├── admin.html          # Pannello admin (solo ruolo admin)
├── privacy.html        # Privacy policy GDPR
├── accessibility.html  # Dichiarazione di accessibilità
├── styles.css          # Stili accessibili ad alto contrasto
├── app.js             # Logica principale (Firebase Auth + Firestore)
├── admin.js           # Pannello admin (Firebase Auth + ruolo Firestore)
├── firebase-config.js # Configurazione Firebase (da personalizzare)
├── firestore.rules    # Security Rules Firestore
├── SECURITY.md        # Politica di sicurezza
└── README.md          # Questo file
```

## 🌐 Deployment

This site is designed to be hosted on GitHub Pages:

1. Push the repository to GitHub
2. Enable GitHub Pages in repository settings
3. Select the main branch as source
4. Access at: `https://[username].github.io/Nonnetta/`

## 🛠️ Tecnologie Utilizzate

- **HTML5**: Markup semantico
- **CSS3**: Proprietà personalizzate e layout moderni
- **JavaScript ES Modules**: Nessuna dipendenza da build tools
- **Firebase Authentication**: Autenticazione sicura (email/password, Google)
- **Firestore**: Database cloud con Security Rules
- **localStorage**: Solo cache locale non critica e migrazione dati

## ♿ Accessibility Features

- WCAG 2.1 Level AA compliance
- High contrast mode (default)
- Keyboard-only navigation
- Screen reader support
- Large touch targets (44x44px minimum)
- Responsive design for all screen sizes
- Print-friendly layouts

## 📱 Browser Compatibility

Tested and working on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📋 Activity Types

1. **🧠 Esercizi di Memoria**: Memory stimulation exercises
2. **🔢 Calcolo Mentale**: Mental math exercises
3. **📝 Giochi di Parole**: Word games and puzzles
4. **🎯 Puzzle Logici**: Logic and reasoning exercises

## 🔄 Data Management

- **Export**: Download activity history as TXT file
- **Print**: Print activity records for physical copies
- **Delete**: Clear all activity history
- **Local Only**: All data remains on your device

## 📞 Support

For accessibility issues or questions:
- Email: accessibilita@nonnetta.eu

For privacy concerns:
- Email: privacy@nonnetta.eu

## 📜 Legal Compliance

- **GDPR**: Full EU General Data Protection Regulation compliance
- **Legge Stanca**: Italian accessibility law compliance
- **EU Directive 2016/2102**: Web accessibility directive compliance
- **WCAG 2.1**: Web Content Accessibility Guidelines Level AA

## 🤝 Contributing

This is a specialized accessibility project. When contributing:
- Maintain high contrast ratios (7:1+)
- Ensure keyboard navigation works
- Test with screen readers
- Follow WCAG 2.1 AA guidelines
- Keep font sizes large (1.8rem+)

## 📄 License

© 2026 Nonnetta. All rights reserved.

---

**Note**: This application stores all data locally in your browser. Clearing your browser data will delete all stored information. Regular backups via the download feature are recommended.
