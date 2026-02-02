# ⚡ GUIDA RAPIDA - Cosa Fare se Vedi Ancora la Vecchia Versione

## 🎯 RISPOSTA IMMEDIATA

Se su **www.nonnetta.eu** vedi ancora la vecchia versione, devi fare 3 cose:

### 1️⃣ UNIRE IL PULL REQUEST (1 minuto)
```
👉 Vai qui: https://github.com/minimus-cyber/Nonnetta/pulls
👉 Clicca "Merge pull request" (pulsante verde)
👉 Clicca "Confirm merge"
```

### 2️⃣ ATTIVARE GITHUB PAGES (2 minuti)
```
👉 Vai qui: https://github.com/minimus-cyber/Nonnetta/settings/pages
👉 Source → Branch: "main", Folder: "/ (root)"
👉 Custom domain → Scrivi: "nonnetta.eu"
👉 Clicca "Save"
👉 Attiva "Enforce HTTPS" quando appare
```

### 3️⃣ SVUOTARE LA CACHE (30 secondi)
```
Nel tuo browser:
👉 Premi Ctrl + Shift + R (Windows)
👉 Premi Cmd + Shift + R (Mac)
```

---

## ⏱️ QUANTO TEMPO CI VUOLE?

- **Merge + Configurazione**: 3-5 minuti
- **Pubblicazione GitHub**: 2-5 minuti
- **Propagazione DNS**: 15 minuti - 2 ore (solo se non già configurato)

**Tempo tipico totale**: 10-15 minuti

---

## ✅ COME VERIFICO CHE FUNZIONA?

Apri **www.nonnetta.eu** e dovresti vedere:

- ✅ **Sfondo NERO** (non bianco!)
- ✅ **Testo GIALLO/ARANCIONE** molto grande
- ✅ Banner cookie "Questo sito utilizza cookie..."
- ✅ Form di login con email e password
- ✅ Cursore del mouse grande e ben visibile

**Se vedi questo → FUNZIONA! 🎉**

---

## ❌ ANCORA PROBLEMI?

### Problema: "404 - There isn't a GitHub Pages site here"
**Soluzione**: 
- Hai fatto il merge del Pull Request?
- Hai attivato GitHub Pages? (vedi punto 2️⃣)
- Aspetta 2-3 minuti e riprova

### Problema: Vedo ancora la vecchia versione
**Soluzione**:
1. Svuota la cache: Ctrl+Shift+R o Cmd+Shift+R
2. Prova in modalità incognito: Ctrl+Shift+N
3. Aspetta 5-10 minuti per l'aggiornamento CDN

### Problema: "Sito non raggiungibile" o errore DNS
**Soluzione**: 
- Controlla che il DNS sia configurato (vedi PUBBLICAZIONE.md)
- Usa https://dnschecker.org/ per verificare
- Aspetta 1-2 ore per la propagazione DNS

---

## 📚 GUIDE DETTAGLIATE

Per istruzioni complete passo-passo:
- **PUBBLICAZIONE.md** - Guida completa in italiano
- **DEPLOYMENT.md** - Guida tecnica in inglese
- **README.md** - Documentazione del progetto

---

## 🆘 SERVE AIUTO?

1. Leggi **PUBBLICAZIONE.md** per la guida completa
2. Verifica lo stato: https://www.githubstatus.com/
3. Controlla i log: https://github.com/minimus-cyber/Nonnetta/actions

---

**Creato**: 2 Febbraio 2026
**Per**: www.nonnetta.eu
