# 🎭 Setup Staging & Production Environment

Guida per configurare due ambienti separati su GitHub Pages.

## 🌍 Ambienti

- **Production (main)**: `https://YOUR-USERNAME.github.io/unconventionalminds/`
- **Staging (staging)**: `https://YOUR-USERNAME.github.io/unconventionalminds/staging/`

## 🚀 Setup iniziale (prima volta)

### Step 1: Crea repository su GitHub

```bash
cd unconventionalminds

# Inizializza git
git init
git add .
git commit -m "Initial commit"

# Collega a GitHub (sostituisci con il tuo URL)
git remote add origin https://github.com/YOUR-USERNAME/unconventionalminds.git
git branch -M main
git push -u origin main
```

### Step 2: Crea branch staging

```bash
# Crea branch staging da main
git checkout -b staging
git push -u origin staging

# Torna su main
git checkout main
```

### Step 3: Configura GitHub

1. **Settings** → **Actions** → **General**
   - Workflow permissions: **"Read and write permissions"**
   - Salva

2. **Settings** → **Pages**
   - Source: Branch `gh-pages` + `/ (root)`
   - Salva

### Step 4: Primo deploy

```bash
# Modifica qualcosa per triggerare il build
echo "" >> content-simple.json

# Commit su staging
git checkout staging
git add .
git commit -m "Test: trigger staging deploy"
git push

# Commit su main
git checkout main
git add .
git commit -m "Test: trigger production deploy"
git push
```

Aspetta 2-3 minuti e avrai:
- ✅ **Production**: `https://YOUR-USERNAME.github.io/unconventionalminds/`
- ✅ **Staging**: `https://YOUR-USERNAME.github.io/unconventionalminds/staging/`

## 🔄 Workflow giornaliero

### Opzione A: Test su staging, poi production

```bash
# 1. Lavora su staging
git checkout staging

# 2. Modifica contenuti
code content-simple.json

# 3. Test locale
npm run build
# Apri index.html nel browser

# 4. Commit e push su staging
git add .
git commit -m "Update: changed home title"
git push

# 5. Aspetta 2 min, verifica su staging:
# https://YOUR-USERNAME.github.io/unconventionalminds/staging/

# 6. Se tutto ok, merge su main (production)
git checkout main
git merge staging
git push

# 7. Production aggiornata in 2 minuti!
# https://YOUR-USERNAME.github.io/unconventionalminds/
```

### Opzione B: Hotfix diretto su production

```bash
# Per fix urgenti, vai diretto su main
git checkout main
code content-simple.json
git add .
git commit -m "Hotfix: corrected email"
git push

# Poi allinea staging
git checkout staging
git merge main
git push
```

## 📊 Come funziona

```
┌─────────────┐
│   STAGING   │  Push su branch 'staging'
│   BRANCH    │         ↓
└─────────────┘  GitHub Actions
       │            ↓
       │         Build index.html
       │            ↓
       │    Deploy su gh-pages/staging/
       │            ↓
       │    https://.../staging/
       │
       ↓ (dopo test ok)
    git merge
       ↓
┌─────────────┐
│    MAIN     │  Push su branch 'main'
│   BRANCH    │         ↓
└─────────────┘  GitHub Actions
                   ↓
              Build index.html
                   ↓
          Deploy su gh-pages/ (root)
                   ↓
          https://.../  (production)
```

## 🎯 Quando usare staging

✅ **Usa staging per**:
- Testare modifiche importanti
- Provare nuovi contenuti
- Verificare build prima del rilascio
- Far vedere anteprima al cliente

❌ **Non serve staging per**:
- Piccole correzioni typo
- Aggiornamenti urgenti
- Modifiche minori già testate in locale

## 🔍 Monitorare i deploy

### Vedere quale ambiente è stato deployato

1. Vai su **Actions** nel repository
2. Clicca sul workflow
3. Espandi "Display deployment info"
4. Vedrai:
   - `✅ Deployed to PRODUCTION` oppure
   - `✅ Deployed to STAGING`

### Verificare i contenuti deployati

**Staging**:
```bash
curl https://YOUR-USERNAME.github.io/unconventionalminds/staging/index.html | grep "ROUND SIZE"
```

**Production**:
```bash
curl https://YOUR-USERNAME.github.io/unconventionalminds/index.html | grep "ROUND SIZE"
```

## 🛠 Troubleshooting

### Staging e Production hanno lo stesso contenuto

**Problema**: I due ambienti mostrano lo stesso contenuto

**Causa**: Non hai fatto modifiche diverse tra staging e main

**Soluzione**: Modifica `content-simple.json` solo su staging, fai push, verifica che sia diverso da production

### File staging/ compare in production

**Problema**: Vedo una cartella "staging" in production

**Soluzione**: È normale, quella cartella CONTIENE lo staging. Non influisce su production. Se vuoi nasconderla, aggiungi al workflow:

```yaml
exclude_assets: '.github,node_modules,.git,*.backup.html,staging'
```

### Branch gh-pages troppo grande

**Problema**: Il branch gh-pages cresce troppo nel tempo

**Soluzione**:
```bash
# Elimina tutto e riparti da zero (ATTENZIONE: cancella storico deploy)
git push origin --delete gh-pages

# Il prossimo push ricreerà il branch da zero
```

### Voglio eliminare staging

**Problema**: Non mi serve più staging

**Soluzione**:
```bash
# Elimina branch locale
git branch -D staging

# Elimina branch remoto
git push origin --delete staging

# Elimina file staging da gh-pages
# (andrà via automaticamente al prossimo deploy production)
```

## 🔐 Proteggere il branch main

Per evitare push accidentali su production:

1. **Settings** → **Branches**
2. **Add branch protection rule**
3. Branch name pattern: `main`
4. Attiva:
   - ✅ Require pull request before merging
   - ✅ Require approvals: 1
5. Salva

Così dovrai sempre fare PR da staging → main!

## 🚀 Configurazioni avanzate

### A. GitHub Environments (opzionale)

Per aggiungere protezioni e segreti per ambiente:

1. **Settings** → **Environments**
2. **New environment**: `production`
3. **New environment**: `staging`
4. Configura protezioni (approval, delay, ecc)

Poi aggiorna il workflow:
```yaml
jobs:
  build:
    environment: ${{ github.ref == 'refs/heads/main' && 'production' || 'staging' }}
```

### B. Badge nel README

Aggiungi badge per vedere lo stato:

```markdown
![Production](https://github.com/YOUR-USERNAME/unconventionalminds/actions/workflows/build.yml/badge.svg?branch=main)
![Staging](https://github.com/YOUR-USERNAME/unconventionalminds/actions/workflows/build.yml/badge.svg?branch=staging)
```

### C. Deploy su tag/release

Modifica workflow per deployare solo su tag:

```yaml
on:
  push:
    tags:
      - 'v*'
```

Poi:
```bash
git tag v1.0.0
git push --tags
```

## 📞 Riferimenti

- [GitHub Pages Multiple Environments](https://dev.to/mktcode/multiple-environments-with-github-pages-53me)
- [Staging site for GitHub Pages](https://godsped.com/posts/2022/12/staging-github-pages/)
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
- [Deploying with GitHub Actions](https://docs.github.com/en/actions/deployment/about-deployments/deploying-with-github-actions)

---

**Made with ⚡ by Unconventional Minds**
