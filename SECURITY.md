# 🔐 SECURITY.md — Politica di Sicurezza di Nonnetta

## Panoramica

Nonnetta è un'applicazione web statica che utilizza Firebase Authentication e Firestore per autenticazione e persistenza dati. Questo documento descrive le politiche di sicurezza, le responsabilità e le procedure da seguire.

---

## 1. Nessuna Password nel Repository

**Regola assoluta**: Non committare mai credenziali, password o segreti nel repository.

### Cosa è consentito nel repository
- `firebase-config.js` con `firebaseConfig` (contiene API Key pubblica — non è un segreto, [vedere nota Firebase](#nota-sulla-firebase-config))
- `firestore.rules` con le regole di sicurezza Firestore

### Cosa NON deve mai essere nel repository
- Service Account Keys (`.json` con `private_key`)
- Firebase Admin SDK credentials
- Variabili d'ambiente con segreti (`.env` con valori reali)
- Password hard-coded di qualsiasi tipo
- Token OAuth o JWT segreti

### Nota sulla Firebase Config
La `firebaseConfig` (apiKey, authDomain, ecc.) è **pubblica per design**. Google la rende visibile a tutti i client per consentire l'inizializzazione dell'SDK. La sicurezza non deriva dalla segretezza di questa chiave, ma dalle **Firestore Security Rules** configurate lato server.

---

## 2. Autenticazione e Autorizzazione

- **Autenticazione**: gestita da Firebase Authentication (email/password, Google)
- **Autorizzazione**: gestita da Firestore Security Rules (vedi `firestore.rules`)
- **Ruolo admin**: assegnato manualmente tramite Firebase Console o Admin SDK nel documento Firestore `users/{uid}` con campo `role: "admin"`
- **Nessuna password admin nel codice**: il vecchio sistema con credenziali hard-coded è stato rimosso

### Assegnazione ruolo admin (procedura sicura)
1. Vai su Firebase Console > Firestore Database
2. Trova il documento `users/{uid}` dell'utente da promuovere
3. Aggiungi il campo: `role` = `"admin"` (tipo: stringa)
4. Salva — il pannello admin diventa accessibile immediatamente

---

## 3. Firestore Security Rules

Le regole di sicurezza in `firestore.rules` garantiscono che:
- Ogni utente può leggere/scrivere **solo i propri dati** (`users/{uid}` e `users/{uid}/diary/`)
- Solo gli utenti con `role == "admin"` possono leggere i dati di tutti gli utenti
- Tutto il resto è bloccato per default

**Aggiornare sempre le regole su Firebase Console dopo ogni modifica a `firestore.rules`.**

---

## 4. Conformità GDPR

- I dati personali (email, nome, diario attività) sono archiviati su Firestore di Google Cloud
- L'utente può richiedere la cancellazione dei propri dati (diritto all'oblio) — eliminare il documento `users/{uid}` e tutta la sotto-collection `diary`
- Non vengono trasmessi dati a terze parti al di fuori di Google Firebase
- La privacy policy è disponibile su `privacy.html`

### Rotazione delle credenziali
- Se si sospetta la compromissione di una Service Account Key: revocarla **immediatamente** da Firebase Console > Impostazioni progetto > Account di servizio
- Se si sospetta la compromissione di un account utente: disabilitarlo da Firebase Console > Authentication > Utenti
- Revisionare le Security Rules almeno ogni 6 mesi

---

## 5. Segnalazione Vulnerabilità

Per segnalare una vulnerabilità di sicurezza:
1. **Non aprire una Issue pubblica**
2. Inviare una email a: `privacy@nonnetta.eu`
3. Descrivere il problema, il potenziale impatto e (se possibile) una prova di concetto
4. La risposta avverrà entro 72 ore

---

## 6. Incident Response — Rimozione Credenziali Accidentali

Se credenziali o segreti vengono accidentalmente committati nel repository:

### Passaggi immediati (entro 1 ora)
1. **Revocare immediatamente** le credenziali compromesse:
   - Firebase API Key: rigenerare da Firebase Console > Impostazioni progetto > Configurazione web app
   - Service Account Key: revocare da Firebase Console > Account di servizio
2. **Rimuovere il file/contenuto** dal repository con `git rm` e fare push
3. **Notificare** tutti i collaboratori
4. **Monitorare** i log di Firebase per accessi non autorizzati

### Pulizia della cronologia Git
Se necessario rimuovere segreti dalla cronologia Git, usare strumenti come `git filter-repo`. Contattare GitHub Support se il repository è già stato forkato o clonato.

---

## 7. Dipendenze Esterne

Nonnetta utilizza esclusivamente Firebase via CDN (`gstatic.com`). Non sono presenti altre dipendenze esterne.

- **Firebase SDK**: `https://www.gstatic.com/firebasejs/10.12.0/` — verificare periodicamente aggiornamenti di sicurezza
- Aggiornare la versione dell'SDK in `firebase-config.js`, `app.js` e `admin.js` quando necessario

---

## 8. Checklist di Sicurezza Pre-Deploy

- [ ] `firebase-config.js` compilato con valori reali del progetto Firebase
- [ ] Nessuna password o segreto nel repository (`git grep -r "password\|secret\|private_key"`)
- [ ] Firestore Security Rules caricate su Firebase Console
- [ ] Domini autorizzati configurati su Firebase Console > Authentication > Impostazioni
- [ ] HTTPS abilitato sull'hosting (GitHub Pages lo fa automaticamente)
- [ ] Ruolo admin assegnato tramite Firestore (non via codice)

---

*Ultimo aggiornamento: marzo 2026*
