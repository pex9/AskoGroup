# Asko Group – sito classico (HTML + JS, nessuna build)

## Prova in locale
    python3 server.py      (su Windows: python server.py)
Apri http://localhost:8000 e il pannello da http://localhost:8000/admin/ (nessun login: salva direttamente in `data/mezzi.json` e `uploads/`).

## Online su GitHub Pages
1. Carica tutto il contenuto della cartella nel repo (branch `main`).
2. Settings → Pages → Deploy from a branch → `main` / root.
3. `/admin/` chiede repo, branch e token GitHub (fine-grained, solo questo repo, Contents: Read and write) e li ricorda in quel browser. Ogni salvataggio fa un commit e il sito si aggiorna in 1-2 minuti.
4. Dominio: Settings → Pages → Custom domain `www.askogroup.it` + CNAME DNS verso `UTENTE.github.io`.
5. Form contatti: crea un form su formspree.io e metti l'URL in `app.js` (`C.form`). Link social reali: sempre in `app.js`.
