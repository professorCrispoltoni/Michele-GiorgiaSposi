# Il sito del vostro matrimonio — guida rapida

## Struttura dei file
- `index.html` → la copertina (foto, nomi, data, conto alla rovescia e il pulsante "Continua a leggere")
- `sito.html` → la pagina con tutte le info (indice, storia, rito, ricevimento, viaggio, RSVP, regalo)
- `style.css` → colori, font, layout, responsive
- `script.js` → conto alla rovescia, menu mobile, copia IBAN, animazioni
- `images/` → tutte le foto (da aggiungere tu)
- `videos/` → il video della proposta (da aggiungere tu)

## I nomi degli sposi
Sono già scritti ovunque: Michele Crispoltoni e Giorgia Paolocci. Se in
futuro serve cambiare qualcosa, cerca "Giorgia" o "Crispoltoni" in
`index.html` con "trova e sostituisci" del tuo editor.

## Le immagini: già tutte al loro posto, basta sostituirle
La cartella `/images` contiene già un file segnaposto per ogni foto, con
un'etichetta colorata che dice cosa va lì. Non devi creare nulla: ti basta
trascinare la tua foto vera dentro `/images` con **lo stesso nome esatto**,
sovrascrivendo il segnaposto. Il sito si aggiorna da solo, senza toccare
HTML o CSS.

| File da sostituire | Dove compare |
|---|---|
| `hero-sposi.jpg` | sfondo della home (foto verticale, es. 1600×2000) |
| `basket.jpg` | sezione "Come ci siamo conosciuti" |
| `santuario.jpg` | sezione "Il rito" |
| `villa-pasqui.jpg` | sezione "Il ricevimento" |
| `trip-sf.jpg`, `trip-vegas.jpg`, `trip-bryce.jpg`, `trip-page.jpg`, `trip-monument.jpg`, `trip-kingman.jpg` | tappe del viaggio (opzionali: se mancano si vede un'illustrazione) |
| `trip-grand-canyon.jpg`, `trip-la.jpg`, `trip-universal.jpg` | Grand Canyon, Los Angeles (+ polaroid Universal) |
| `trip-borabora.jpg`, `trip-moorea.jpg` | Bora Bora e Moorea (opzionali) |
| `proposta-poster.jpg` | anteprima del video della proposta, prima che parta (opzionale) |

Attenzione: il file deve avere **esattamente lo stesso nome ed estensione**
(es. `trip-maui.jpg`, non `trip-maui.JPG` o `trip-maui.png`). Se la tua
foto ha un formato diverso, rinominala semplicemente con estensione `.jpg`.

## Il viaggio di nozze
È un percorso verticale (pensato per smartphone) con una linea dorata che si
riempie mentre si scorre. Ogni tappa è un blocco `<article class="stop">` in
`index.html` (cerca `id="journey"`): per cambiare testi o date basta modificare
quel blocco. Se una foto della tappa non esiste, compare un'illustrazione
colorata al suo posto. `trip-maui.jpg` e `trip-yosemite.jpg` non sono più usate.

## Il video della proposta
In `/videos/proposta.mp4` c'è già un breve segnaposto: sostituiscilo con il
vostro video vero (stesso nome, `proposta.mp4`). Se preferisci usare
YouTube invece di un file, in `index.html` c'è un commento nella sezione
"La nostra storia" che spiega come sostituire il tag `<video>` con un
embed di YouTube.

## L'IBAN
In `index.html`, sezione "Un regalo per il nostro viaggio", cerca i commenti
`MODIFICA QUI` e sostituisci intestatario e IBAN con quelli veri.

## Colori e font
Tutto il sistema di colori e font è definito in cima a `style.css`,
nel blocco `:root { ... }`. Cambiando quei valori cambia tutto il sito.

## Come vederlo
Apri semplicemente `index.html` con un doppio click nel browser. Per
pubblicarlo online, il modo più semplice e gratuito è caricare l'intera
cartella su GitHub Pages o su un servizio come Netlify.
