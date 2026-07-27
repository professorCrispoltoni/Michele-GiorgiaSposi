# Il sito del vostro matrimonio — guida rapida

## Struttura dei file
- `index.html` → contenuto e testi del sito
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
| `trip-la.jpg` | Los Angeles (galleria viaggio) |
| `trip-grand-canyon.jpg` | Grand Canyon (galleria viaggio) |
| `trip-yosemite.jpg` | Yosemite (galleria viaggio) |
| `trip-universal.jpg` | Universal Studios (galleria viaggio) |
| `trip-maui.jpg` | Maui (galleria viaggio) |
| `proposta-poster.jpg` | anteprima del video della proposta, prima che parta (opzionale) |

Attenzione: il file deve avere **esattamente lo stesso nome ed estensione**
(es. `trip-maui.jpg`, non `trip-maui.JPG` o `trip-maui.png`). Se la tua
foto ha un formato diverso, rinominala semplicemente con estensione `.jpg`.

## La galleria del viaggio di nozze
È un'unica presentazione a scorrimento (non più un elenco di riquadri):
cambia slide da sola ogni 6 secondi, e si può cambiare anche a mano con
le frecce, i pallini in basso, o con lo swipe del dito su smartphone.
Per aggiungere o togliere una tappa, in `index.html` cerca il commento
"galleria a slide unica": basta copiare o cancellare un intero blocco
`<figure class="slideshow__slide">` e il pallino corrispondente subito
sotto (ricordati di rinumerare i `data-index` in ordine, 0,1,2,3...).

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
