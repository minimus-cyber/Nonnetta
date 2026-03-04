# 🚀 Guida al Deploy di Nonnetta

Questa guida spiega come configurare Firebase e pubblicare Nonnetta su GitHub Pages.

---

## Prerequisiti

- Account Google (per Firebase)
- Repository GitHub con i file di Nonnetta
- Browser moderno (Chrome, Firefox, Safari, Edge)

---

## Fase 1: Configurazione Firebase

### 1.1 Crea un progetto Firebase

1. Vai su [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Clicca **"Aggiungi progetto"**
3. Inserisci un nome (es. `nonnetta-eu`)
4. Puoi disabilitare Google Analytics se non ti serve
5. Clicca **"Crea progetto"**

### 1.2 Abilita l'autenticazione

1. Nel menu laterale: **Build > Authentication**
2. Clicca **"Inizia"**
3. Vai su **"Metodo di accesso"** (Sign-in method)
4. Abilita **Email/password**
5. Abilita **Google** (inserisci un'email di supporto)
6. Vai su **"Impostazioni"** > **"Domini autorizzati"**
7. Aggiungi i tuoi domini:
   - `minimus-cyber.github.io` (GitHub Pages)
   - `nonnetta.eu` (dominio personalizzato, se presente)
   - `localhost` (per test in locale)

### 1.3 Crea il database Firestore

1. Nel menu laterale: **Build > Firestore Database**
2. Clicca **"Crea database"**
3. Seleziona **"Inizia in modalità produzione"**
4. Scegli la regione più vicina all'Europa (es. `europe-west1`)
5. Clicca **"Fatto"**

### 1.4 Carica le Firestore Security Rules

1. Nella sezione Firestore, clicca su **"Regole"**
2. Copia il contenuto del file `firestore.rules` dal repository
3. Incolla nel campo regole della console
4. Clicca **"Pubblica"**

### 1.5 Ottieni la configurazione dell'app web

1. Vai su **Impostazioni progetto** (icona ingranaggio)
2. Nella scheda **"Generale"**, scorri fino a **"Le tue app"**
3. Clicca sull'icona **</>** (Web)
4. Registra l'app con un soprannome (es. `nonnetta-web`)
5. Non spuntare Firebase Hosting (usiamo GitHub Pages)
6. Clicca **"Registra app"**
7. Copia l'oggetto `firebaseConfig` mostrato

### 1.6 Inserisci la configurazione nel codice

Apri il file `firebase-config.js` e sostituisci i valori segnaposto con quelli copiati:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",           // ← la tua API Key
  authDomain: "nonnetta-eu.firebaseapp.com",
  projectId: "nonnetta-eu",
  storageBucket: "nonnetta-eu.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

> ⚠️ **Nota**: `firebaseConfig` non è un segreto. È progettata per essere pubblica e visibile nel codice frontend. La sicurezza è garantita dalle Firestore Security Rules configurate lato server.
> Non committare mai **Service Account Keys** o chiavi private nel repository.

---

## Fase 2: Assegnazione del ruolo Admin

Il pannello admin (`admin.html`) è accessibile solo agli utenti con ruolo `admin` in Firestore.

### Come assegnare il ruolo admin

1. Vai su [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Registra l'account che vuoi rendere admin tramite l'app (o da **Authentication > Utenti > Aggiungi utente**)
3. Copia l'**UID** dell'utente da Authentication
4. Vai su **Firestore Database > Dati**
5. Crea/modifica il documento: `users` > `{UID dell'utente}`
6. Aggiungi il campo: `role` = `"admin"` (tipo: stringa)
7. Salva

L'utente potrà ora accedere al pannello admin dopo il login.

---

## Fase 3: Deploy su GitHub Pages

### 3.1 Abilita GitHub Pages

1. Vai su **Settings** del repository GitHub
2. Scorri fino a **"Pages"**
3. In **"Source"**: seleziona il branch `main` e cartella `/ (root)`
4. Clicca **"Save"**
5. Dopo qualche minuto il sito sarà disponibile su: `https://minimus-cyber.github.io/Nonnetta/`

### 3.2 Dominio personalizzato (opzionale)

Se vuoi usare `nonnetta.eu`:

1. Nella stessa sezione Pages, inserisci il dominio in **"Custom domain"**
2. Configura i record DNS:
   ```
   CNAME: www.nonnetta.eu → minimus-cyber.github.io
   A: nonnetta.eu → 185.199.108.153
   A: nonnetta.eu → 185.199.109.153
   A: nonnetta.eu → 185.199.110.153
   A: nonnetta.eu → 185.199.111.153
   ```
3. Attiva **"Enforce HTTPS"**

---

## Fase 4: Verifica Post-Deploy

### Checklist funzionale
- [ ] Il sito è raggiungibile all'URL configurato
- [ ] La registrazione email/password funziona
- [ ] Il login email/password funziona
- [ ] Il login con Google funziona
- [ ] Il recupero password via email funziona
- [ ] Il diario attività viene salvato e caricato da Firestore
- [ ] Il pannello admin (`/admin.html`) è accessibile solo agli admin
- [ ] Un utente normale viene bloccato con "Accesso Negato"

### Checklist sicurezza
- [ ] Firestore Security Rules caricate e testate
- [ ] Nessuna password hard-coded nel codice sorgente
- [ ] Domini autorizzati correttamente configurati in Firebase Authentication
- [ ] HTTPS abilitato

---

## Troubleshooting

### "Errore di accesso" al login
- Verifica che il dominio sia in **Domini autorizzati** in Firebase Authentication
- Controlla la console del browser per errori specifici

### Il diario non si salva
- Controlla le Firestore Security Rules
- Verifica che Firestore sia in modalità produzione (non bloccato)
- Controlla la console del browser per errori di permessi

### Il pannello admin mostra "Accesso Negato"
- Verifica che il documento `users/{uid}` esista in Firestore con `role: "admin"`
- Assicurati di essere loggato con l'account corretto

### "firebase-config.js non trovato"
- Verifica che il file `firebase-config.js` sia stato committato nel repository
- Controlla che i valori `firebaseConfig` siano stati inseriti

---

## Sicurezza

Consulta [SECURITY.md](SECURITY.md) per la politica di sicurezza completa, incluse:
- Gestione dei segreti
- Procedure di incident response
- Rotazione delle credenziali
- Conformità GDPR

---

*Ultimo aggiornamento: marzo 2026*
