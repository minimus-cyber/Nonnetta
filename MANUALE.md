# 🛠️ GUIDA MANUALE - COSA FARE ADESSO

## ⚠️ Stai ancora vedendo il vecchio sito?

Ecco **esattamente** cosa devi fare manualmente, passo per passo.

---

## 📌 PREREQUISITO: HAI FATTO IL MERGE?

**PRIMA DI TUTTO**, verifica se hai già fatto il merge del Pull Request:

1. Apri: https://github.com/minimus-cyber/Nonnetta/branches
2. Guarda se c'è un branch chiamato `copilot/update-accessibility-features`

### ✅ Se NON vedi il branch `copilot/update-accessibility-features`:
**BENE!** Il merge è già stato fatto. Vai direttamente al **PASSO 1**.

### ❌ Se VEDI ancora il branch `copilot/update-accessibility-features`:
**Devi fare il merge prima**. Segui questi passaggi:

#### Come fare il merge manualmente:

**Opzione A - Via GitHub (Raccomandato):**
1. Vai su: https://github.com/minimus-cyber/Nonnetta/pulls
2. Trova il Pull Request aperto
3. Clicca il pulsante verde "**Merge pull request**"
4. Clicca "**Confirm merge**"
5. **ASPETTA 2 MINUTI** e poi procedi al **PASSO 1**

**Opzione B - Via Git Locale (Solo se sei un esperto):**
```bash
git checkout main
git pull origin main
git merge copilot/update-accessibility-features
git push origin main
```

---

## ✅ PASSO 1: CONFIGURARE GITHUB PAGES

**Tempo: 2 minuti**

### 1.1 - Vai alle Impostazioni
Apri questo link esatto:
```
https://github.com/minimus-cyber/Nonnetta/settings/pages
```

### 1.2 - Configura la Sorgente (Source)

Troverai una sezione chiamata "**Build and deployment**" → "**Source**"

**Fai questo:**
- Clicca sul menu a tendina "**Branch**"
- Seleziona "**main**" (o "master" se non c'è "main")
- Accanto apparirà un altro menu → Seleziona "**/ (root)**"
- Clicca il pulsante "**Save**" (Salva)

**Vedrai un messaggio blu** che dice qualcosa come:
> "Your site is ready to be published at..."

### 1.3 - Configura il Dominio Personalizzato

Nella stessa pagina, trova la sezione "**Custom domain**"

**Fai questo:**
1. Nel campo di testo, scrivi esattamente: `nonnetta.eu`
2. Clicca "**Save**" (Salva)
3. **ASPETTA 30-60 secondi**
4. Ricarica la pagina (F5)
5. Dovresti vedere apparire una checkbox "**Enforce HTTPS**"
6. **ATTIVALA** (metti il segno di spunta)

### 1.4 - Verifica che sia Attivo

Nella stessa pagina, dovresti vedere:
```
✅ Your site is live at https://nonnetta.eu
```

O qualcosa di simile.

**Se vedi un messaggio di errore**, aspetta 2-3 minuti e ricarica la pagina.

---

## ✅ PASSO 2: VERIFICARE IL DNS (Se necessario)

**Tempo: 5 minuti (+ tempo di propagazione)**

Il tuo dominio `nonnetta.eu` deve puntare ai server di GitHub.

### 2.1 - Verifica la Configurazione DNS Attuale

Vai su: https://dnschecker.org/

1. Nel campo, scrivi: `nonnetta.eu`
2. Seleziona tipo "A"
3. Clicca "Search"

**Dovresti vedere questi 4 indirizzi IP:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### 2.2 - Se il DNS NON è Configurato Correttamente

**Devi andare al tuo provider DNS** (dove hai comprato il dominio: GoDaddy, Aruba, Register.it, ecc.)

**Configurazione Necessaria:**

#### Record A (per il dominio principale):
```
Tipo: A
Nome: @ (o lascia vuoto, o "nonnetta.eu")
Valore: 185.199.108.153
TTL: 3600

Tipo: A
Nome: @ (o lascia vuoto, o "nonnetta.eu")
Valore: 185.199.109.153
TTL: 3600

Tipo: A
Nome: @ (o lascia vuoto, o "nonnetta.eu")
Valore: 185.199.110.153
TTL: 3600

Tipo: A
Nome: @ (o lascia vuoto, o "nonnetta.eu")
Valore: 185.199.111.153
TTL: 3600
```

#### Record CNAME (per www):
```
Tipo: CNAME
Nome: www
Valore: minimus-cyber.github.io
TTL: 3600
```

**IMPORTANTE:** Dopo aver cambiato il DNS, **aspetta 15 minuti - 2 ore** per la propagazione.

---

## ✅ PASSO 3: SVUOTARE LA CACHE DEL BROWSER

**Tempo: 1 minuto**

Anche se il sito è pubblicato, il tuo browser potrebbe mostrare la vecchia versione dalla cache.

### Metodo 1: Hard Refresh (Veloce)

**Premi questa combinazione di tasti:**
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### Metodo 2: Svuota Cache Completamente

#### Chrome/Edge:
1. Premi `Ctrl + Shift + Delete` (Windows) o `Cmd + Shift + Delete` (Mac)
2. Seleziona "Immagini e file nella cache"
3. Seleziona "Dall'inizio"
4. Clicca "Cancella dati"

#### Firefox:
1. Premi `Ctrl + Shift + Delete`
2. Seleziona "Cache"
3. Intervallo: "Tutto"
4. Clicca "Cancella adesso"

### Metodo 3: Modalità Incognito (Per Test)

Apri il sito in una finestra privata/incognito:
- **Chrome/Edge**: `Ctrl + Shift + N`
- **Firefox**: `Ctrl + Shift + P`
- **Safari**: `Cmd + Shift + N`

Vai su `https://www.nonnetta.eu` o `https://nonnetta.eu`

---

## ✅ PASSO 4: VERIFICARE CHE FUNZIONI

**Apri il sito**: https://nonnetta.eu

### La NUOVA versione ha questi elementi:

| Elemento | Come Riconoscerlo |
|----------|-------------------|
| **Sfondo** | NERO (non bianco!) |
| **Testo** | GIALLO/ARANCIONE molto grande |
| **Banner Cookie** | "Questo sito utilizza cookie..." |
| **Login** | Form con campi Email e Password |
| **Cursore** | Grande e giallo quando passi sopra i pulsanti |

### La VECCHIA versione ha:
- Sfondo bianco o colorato
- Testo normale/piccolo
- Nessun banner cookie
- Nessun form di login

**Se vedi la nuova versione → PERFETTO! ✅**

**Se vedi ancora la vecchia versione → Vai a TROUBLESHOOTING**

---

## 🔧 TROUBLESHOOTING

### ❌ "404 - There isn't a GitHub Pages site here"

**Causa**: GitHub Pages non è configurato o il branch è sbagliato.

**Soluzione**:
1. Torna al **PASSO 1** e ricontrolla tutto
2. Assicurati di aver selezionato il branch "**main**" (non "copilot/...")
3. Aspetta 3-5 minuti e riprova
4. Controlla i log: https://github.com/minimus-cyber/Nonnetta/actions

---

### ❌ "DNS_PROBE_FINISHED_NXDOMAIN"

**Causa**: Il DNS non è configurato o non è ancora propagato.

**Soluzione**:
1. Verifica il DNS con: https://dnschecker.org/
2. Se non è configurato, vai al **PASSO 2**
3. Se è configurato, aspetta 1-2 ore per la propagazione
4. Nel frattempo, prova ad accedere via GitHub Pages:
   ```
   https://minimus-cyber.github.io/Nonnetta/
   ```

---

### ❌ Vedo ancora la vecchia versione (dopo aver fatto tutto)

**Causa**: Cache molto persistente o CDN di GitHub.

**Soluzione**:

1. **Forza refresh multiplo**:
   - Premi `Ctrl+Shift+R` 3 volte di seguito
   - Aspetta 5 secondi tra una pressione e l'altra

2. **Cancella TUTTA la cache del browser**:
   - Chrome: `chrome://settings/clearBrowserData`
   - Firefox: `about:preferences#privacy`
   - Seleziona "Tutto il periodo"
   - Cancella cache

3. **Prova da un altro browser**:
   - Se hai Chrome, prova Firefox
   - Se hai Firefox, prova Chrome

4. **Prova da un altro dispositivo**:
   - Smartphone
   - Tablet
   - Computer di un amico

5. **Aspetta 10-15 minuti**:
   - A volte il CDN di GitHub impiega tempo ad aggiornarsi

6. **Apri la console del browser**:
   - Premi `F12`
   - Vai su tab "Network"
   - Attiva "Disable cache"
   - Ricarica la pagina

---

### ❌ "Connessione non sicura" o "SSL Error"

**Causa**: Il certificato HTTPS non è ancora generato.

**Soluzione**:
1. Aspetta 5-10 minuti dopo aver attivato "Enforce HTTPS"
2. Prova ad accedere con `http://` invece di `https://` (temporaneamente)
3. Ricarica la pagina delle impostazioni GitHub Pages
4. Disattiva e riattiva "Enforce HTTPS"

---

## ⏱️ TEMPI DI ATTESA NORMALI

| Cosa | Tempo |
|------|-------|
| GitHub Pages si attiva | 1-3 minuti |
| Certificato SSL generato | 5-10 minuti |
| CDN GitHub aggiornato | 5-15 minuti |
| Propagazione DNS | 15 minuti - 2 ore |
| **TOTALE (caso tipico)** | **20-30 minuti** |

**NON PREOCCUPARTI** se non vedi cambiamenti immediati. È normale!

---

## 📞 HO ANCORA PROBLEMI

### Passaggio 1: Controlla lo Stato di GitHub
Vai su: https://www.githubstatus.com/

Se GitHub ha problemi, aspetta che siano risolti.

### Passaggio 2: Controlla i Log del Deployment
Vai su: https://github.com/minimus-cyber/Nonnetta/actions

Verifica che l'ultima azione sia verde (✅) e non rossa (❌).

### Passaggio 3: Verifica di Aver Fatto Tutto
Rileggi questa guida dall'inizio e assicurati di aver fatto TUTTI i passaggi.

### Passaggio 4: Prova l'URL Diretto GitHub Pages
Prova ad accedere a:
```
https://minimus-cyber.github.io/Nonnetta/
```

Se funziona lì ma non su `nonnetta.eu`, è un problema DNS.

---

## ✅ CHECKLIST FINALE

Usa questa checklist per verificare di aver fatto tutto:

- [ ] Ho fatto il merge del Pull Request (o verificato che sia già fatto)
- [ ] Ho configurato GitHub Pages con branch "main" e folder "/ (root)"
- [ ] Ho impostato il dominio personalizzato "nonnetta.eu"
- [ ] Ho attivato "Enforce HTTPS"
- [ ] Ho verificato che il DNS punti ai server GitHub (4 record A)
- [ ] Ho svuotato la cache del browser (Ctrl+Shift+R)
- [ ] Ho provato in modalità incognito
- [ ] Ho aspettato almeno 10-15 minuti dopo la configurazione
- [ ] Vedo il nuovo sito (sfondo nero, testo giallo)

---

## 🎯 RIASSUNTO: COSA FARE ADESSO

Se hai letto tutta questa guida e sei confuso, ecco il MINIMO INDISPENSABILE:

### OGGI (Subito):
1. **Merge PR**: https://github.com/minimus-cyber/Nonnetta/pulls → Clicca "Merge pull request"
2. **Attiva GitHub Pages**: https://github.com/minimus-cyber/Nonnetta/settings/pages
   - Branch: main
   - Folder: / (root)
   - Save
3. **Aspetta 5 minuti**
4. **Svuota cache**: Ctrl+Shift+R

### SE NON FUNZIONA:
5. **Verifica DNS**: https://dnschecker.org/ → Cerca "nonnetta.eu"
6. **Configura DNS** se necessario (vedi PASSO 2)
7. **Aspetta 30 minuti - 2 ore** per propagazione DNS

### VERIFICA:
8. Apri https://nonnetta.eu
9. Dovresti vedere: SFONDO NERO + TESTO GIALLO + FORM LOGIN

---

**Creato**: 2 Febbraio 2026  
**Per**: www.nonnetta.eu  
**Versione**: Guida Manuale Completa
