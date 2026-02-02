# 🚀 GUIDA ALLA PUBBLICAZIONE - Come Vedere la Nuova Versione su www.nonnetta.eu

## ⚠️ PROBLEMA: Vedo ancora la vecchia versione del sito

Se vedi ancora la vecchia versione su www.nonnetta.eu, segui questi passaggi:

---

## 📋 SOLUZIONE PASSO-PASSO

### PASSO 1: Unire (Merge) il Pull Request

1. **Vai su GitHub**: https://github.com/minimus-cyber/Nonnetta/pulls
2. **Trova il Pull Request** chiamato "Implement accessible neurocognitive stimulation web app"
3. **Clicca su "Merge pull request"** (pulsante verde)
4. **Conferma il merge** cliccando "Confirm merge"

✅ **Importante**: Questo copia tutti i nuovi file nel branch principale (main)

---

### PASSO 2: Attivare GitHub Pages

1. **Vai nelle Impostazioni**:
   - Apri: https://github.com/minimus-cyber/Nonnetta/settings/pages

2. **Configura la Sorgente (Source)**:
   - **Branch**: Seleziona `main` (o `master`)
   - **Cartella**: Seleziona `/ (root)`
   - **Salva**: Clicca "Save"

3. **Aspetta la Pubblicazione**:
   - GitHub mostrerà un messaggio: "Your site is ready to be published"
   - Dopo 1-2 minuti diventerà: "Your site is live at..."

---

### PASSO 3: Configurare il Dominio Personalizzato

**Nella stessa pagina GitHub Pages**:

1. **Custom domain**: Inserisci `nonnetta.eu` (senza www)
2. **Salva**: Clicca "Save"
3. **Aspetta**: GitHub verificherà il dominio (può richiedere alcuni minuti)
4. **✅ Enforce HTTPS**: Attiva questa opzione quando disponibile

---

### PASSO 4: Configurare il DNS (se non già fatto)

**Vai al tuo provider DNS** (dove hai registrato nonnetta.eu):

#### Opzione A - Dominio senza WWW (consigliato):

```
Tipo: A
Nome: @
Valore: 185.199.108.153

Tipo: A
Nome: @
Valore: 185.199.109.153

Tipo: A
Nome: @
Valore: 185.199.110.153

Tipo: A
Nome: @
Valore: 185.199.111.153

Tipo: CNAME
Nome: www
Valore: minimus-cyber.github.io
```

#### Opzione B - Solo WWW:

```
Tipo: CNAME
Nome: www
Valore: minimus-cyber.github.io

Tipo: CNAME
Nome: @
Valore: www.nonnetta.eu
```

⏱️ **Tempo di Propagazione**: 15 minuti - 48 ore (di solito 1-2 ore)

---

### PASSO 5: Svuotare la Cache del Browser

**Dopo che il sito è pubblicato, svuota la cache**:

#### Chrome / Edge:
1. Premi `Ctrl + Shift + Delete` (Windows) o `Cmd + Shift + Delete` (Mac)
2. Seleziona "Immagini e file nella cache"
3. Clicca "Cancella dati"

**OPPURE** usa la scorciatoia veloce:
- Premi `Ctrl + Shift + R` (Windows) o `Cmd + Shift + R` (Mac)

#### Firefox:
1. Premi `Ctrl + Shift + Delete`
2. Seleziona "Cache"
3. Clicca "Cancella adesso"

#### Safari:
1. Menu Safari → Preferenze → Avanzate
2. Attiva "Mostra menu Sviluppo"
3. Menu Sviluppo → Svuota la cache

---

## ✅ VERIFICA CHE FUNZIONI

Apri il sito e verifica che vedi:

- ✅ **Sfondo nero** con testo giallo/arancione
- ✅ **Banner cookie** "Questo sito utilizza cookie..."
- ✅ **Form di login** con email e password
- ✅ **Testo molto grande** e facile da leggere
- ✅ **Cursore del mouse grande e visibile**

Se vedi queste caratteristiche, **la nuova versione è attiva!** 🎉

---

## 🔧 RISOLUZIONE PROBLEMI

### ❌ "404 - There isn't a GitHub Pages site here"

**Causa**: GitHub Pages non è configurato o il branch è sbagliato

**Soluzione**:
1. Controlla che il Pull Request sia stato unito (merged)
2. Vai in Settings → Pages
3. Verifica che sia selezionato il branch `main` e cartella `/ (root)`
4. Aspetta 2-3 minuti e riprova

---

### ❌ "DNS_PROBE_FINISHED_NXDOMAIN" o "Sito non raggiungibile"

**Causa**: Configurazione DNS non corretta o non ancora propagata

**Soluzione**:
1. Verifica i record DNS presso il tuo provider
2. Usa uno strumento di verifica DNS: https://dnschecker.org/
3. Aspetta 1-2 ore per la propagazione
4. Prova con la modalità in incognito del browser

---

### ❌ Vedo ancora la vecchia versione

**Causa**: Cache del browser o CDN di GitHub

**Soluzione**:
1. **Svuota la cache** del browser (vedi PASSO 5)
2. **Prova in modalità incognito**: Ctrl+Shift+N (Chrome) o Ctrl+Shift+P (Firefox)
3. **Prova da un altro dispositivo** (smartphone, tablet)
4. **Aspetta 10-15 minuti**: GitHub potrebbe stare aggiornando il CDN

**Forzare l'aggiornamento**:
```
Apri la Console del browser (F12)
Vai nella tab "Network"
Attiva "Disable cache"
Ricarica la pagina (F5)
```

---

### ❌ "SSL Certificate Error" o "Connessione non sicura"

**Causa**: HTTPS non ancora attivo

**Soluzione**:
1. Vai in Settings → Pages
2. Attiva "Enforce HTTPS" (se disponibile)
3. Aspetta qualche minuto che il certificato venga generato
4. Se l'opzione non è disponibile, aspetta che GitHub verifichi il dominio

---

## 📞 SUPPORTO

Se dopo aver seguito tutti i passaggi vedi ancora problemi:

1. **Controlla lo stato di GitHub**: https://www.githubstatus.com/
2. **Verifica i log di GitHub Actions**: https://github.com/minimus-cyber/Nonnetta/actions
3. **Contatta il supporto GitHub**: https://support.github.com/

---

## 🎯 CHECKLIST COMPLETA

Usa questa checklist per verificare che tutto sia configurato:

- [ ] Pull Request unito al branch main
- [ ] GitHub Pages attivato (Settings → Pages)
- [ ] Branch impostato su `main`
- [ ] Dominio personalizzato configurato (`nonnetta.eu`)
- [ ] Record DNS configurati correttamente (A + CNAME)
- [ ] HTTPS attivato
- [ ] Cache del browser svuotata
- [ ] Sito verificato in modalità incognito
- [ ] Nuova versione visibile (sfondo nero, testo giallo)

---

## 📚 LINK UTILI

- **Repository GitHub**: https://github.com/minimus-cyber/Nonnetta
- **Documentazione GitHub Pages**: https://docs.github.com/it/pages
- **Configurazione dominio personalizzato**: https://docs.github.com/it/pages/configuring-a-custom-domain-for-your-github-pages-site
- **Verifica DNS**: https://dnschecker.org/

---

## ⏱️ TEMPI PREVISTI

| Operazione | Tempo Tipico |
|------------|--------------|
| Merge Pull Request | Immediato |
| Attivazione GitHub Pages | 1-3 minuti |
| Generazione certificato SSL | 5-10 minuti |
| Propagazione DNS | 15 minuti - 2 ore |
| Aggiornamento CDN GitHub | 5-10 minuti |
| **TOTALE (caso tipico)** | **30 minuti - 3 ore** |

---

## 🎉 FATTO!

Una volta completati tutti i passaggi, dovresti vedere la nuova versione accessibile del sito su **www.nonnetta.eu** con:

- 🎨 Design ad alto contrasto
- 📝 Testo molto grande
- 🖱️ Cursore grande e visibile
- ⌨️ Navigazione da tastiera
- 🔐 Sistema di login e registrazione
- 📊 Tracciamento attività
- 👨‍💼 Pannello amministratore

**Ultima modifica**: 2 Febbraio 2026
