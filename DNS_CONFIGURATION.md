# Configurazione DNS per www.nonnetta.eu

Questo documento fornisce istruzioni dettagliate per configurare correttamente i record DNS per il dominio personalizzato `www.nonnetta.eu` con GitHub Pages.

## ✅ File Configurati nel Repository

I seguenti file sono stati creati e configurati per GitHub Pages:

1. **`CNAME`** - Contiene il dominio personalizzato `www.nonnetta.eu`
2. **`index.html`** - La pagina principale del sito web
3. **`.nojekyll`** - Disabilita il processamento Jekyll di GitHub

## 🔧 Configurazione GitHub Pages

Per abilitare GitHub Pages nel repository:

1. Vai su **Settings** del repository su GitHub
2. Nella sezione **Pages** (menu laterale sinistro)
3. Configura:
   - **Source**: Seleziona `copilot/fix-github-pages-configuration` branch (o il branch che contiene questi file)
   - **Custom domain**: `www.nonnetta.eu` dovrebbe essere già presente (dal file CNAME)
   - **Enforce HTTPS**: ✅ Abilita questa opzione (importante per la sicurezza)

## 🌐 Configurazione Record DNS

Per far funzionare correttamente il dominio personalizzato, devi configurare i seguenti record DNS presso il tuo provider DNS (ad esempio, GoDaddy, Cloudflare, Namecheap, etc.):

### Record CNAME per www.nonnetta.eu

Crea un record **CNAME** per il sottodominio `www`:

```
Type:  CNAME
Name:  www
Value: minimus-cyber.github.io
TTL:   3600 (o automatico)
```

### Record A per nonnetta.eu (dominio root - opzionale ma consigliato)

Se vuoi che anche `nonnetta.eu` (senza www) funzioni, crea questi 4 record **A**:

```
Type:  A
Name:  @ (o lasciare vuoto, rappresenta il dominio root)
Value: 185.199.108.153
TTL:   3600

Type:  A
Name:  @
Value: 185.199.109.153
TTL:   3600

Type:  A
Name:  @
Value: 185.199.110.153
TTL:   3600

Type:  A
Name:  @
Value: 185.199.111.153
TTL:   3600
```

## ⏱️ Tempo di Propagazione DNS

Dopo aver configurato i record DNS:
- La propagazione può richiedere da **pochi minuti a 48 ore**
- Puoi verificare la propagazione usando strumenti online come:
  - https://www.whatsmydns.net/
  - https://dnschecker.org/

## 🔍 Verifica Configurazione

### Verifica Record DNS

Puoi verificare i tuoi record DNS con questi comandi:

```bash
# Verifica record CNAME per www
dig www.nonnetta.eu CNAME +short

# Verifica record A per il dominio root
dig nonnetta.eu A +short

# Verifica completa
nslookup www.nonnetta.eu
```

### Verifica Sito Web

Una volta che:
1. GitHub Pages è configurato correttamente nel repository
2. I record DNS sono propagati

Dovresti essere in grado di visitare:
- https://www.nonnetta.eu (dominio personalizzato)
- https://minimus-cyber.github.io/Nonnetta (URL GitHub Pages diretto)

## 🐛 Risoluzione Problemi Comuni

### Errore 404 - Pagina non trovata
- **Causa**: GitHub Pages non è configurato correttamente o il branch sorgente non contiene `index.html`
- **Soluzione**: Verifica che il branch configurato in Settings > Pages contenga i file `index.html` e `CNAME`

### DNS_PROBE_FINISHED_NXDOMAIN
- **Causa**: Record DNS non configurati o non ancora propagati
- **Soluzione**: Verifica i record DNS e attendi la propagazione (fino a 48 ore)

### Certificato SSL non valido
- **Causa**: La configurazione HTTPS non è ancora completata
- **Soluzione**: Attendi qualche minuto dopo la configurazione. GitHub genera automaticamente il certificato SSL

### CNAME già in uso
- **Causa**: Il dominio è già configurato per un altro repository
- **Soluzione**: Rimuovi il dominio dall'altro repository o usa un sottodominio diverso

## 📚 Risorse Utili

- [Documentazione ufficiale GitHub Pages](https://docs.github.com/en/pages)
- [Configurazione dominio personalizzato](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Risoluzione problemi DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)

## 🎯 Prossimi Passi

1. ✅ Configurare GitHub Pages nelle impostazioni del repository
2. ✅ Configurare i record DNS presso il provider
3. ✅ Attendere la propagazione DNS (verificare con dig/nslookup)
4. ✅ Verificare che HTTPS sia abilitato
5. ✅ Visitare https://www.nonnetta.eu per confermare il funzionamento

---

**Nota**: Se dopo aver seguito tutti questi passaggi il problema persiste, considera di contattare il supporto GitHub o verificare lo stato del servizio GitHub Pages su https://www.githubstatus.com/
