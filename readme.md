::::::::::::::::MyFinance::::::::::::::::

il progetto ha come scopo l'obiettivo di esporre le competeneze acquisite durante il bootcamp fullstack dev di Epicode e la gestione delle risorse e degli strumenti dello stack MERN 🖥️ (studiato durante l'arco del percorso)

MyFinance è una webapp pensata per poter dare l'opportunità all'utetnte di tener traccia delle proprie spese, avere statistiche circa le spese effettuate durante il mese ed una panoramica generica sulle spese annue, condividere le spese con altri utenti iscritti(potenziali familiari o amici 😊 )

Sito hostato su netlify - https://myfinance-capstone.netlify.app/; la parte backend/webservices è stata hostata su render.com

Tech&Resources FRONTEND

Per raggiungere l'obiettivo prefissato, lato frontend ho fatto appello alle seguenti risorse:

- FontAwesome - stack fondamentale per la grafica del template
- Bootstrap - stack fondamentale per la grafica del template
- Chart.Js - implementati i grafici delle statistiche spese
- FramerMotion.js - utilizzato per animazioni delle pagine
- Toastify.js - divertente metodo di avviso e gestione eventi
- SweetAlert2 - altro metodo divertente, carino ed interattivo per la gestione errori / eventi
- Moment.js - utilissimo per formattare a mio piacimento le date
- polished.js - utilizzato per calcolarmi il contrasto tra background & text ; durante lo sviluppo mi sono imbattuto in testo bianco sfondo bianco, ho voluto evitare questa esperienza all'utente di conseguenza se il contrasto dei due colori in input è minore di un certo numro che può essere cambiato, applica testo nero altrimenti rimane testo bianco
- uuid - necessario per gestire gli id dei diversi componenti
- multer-storage-cloudinary - utilizzato per caricare le immagini degli utenti
- jwt-decode - necessario per il decode della pwd dopo l'ottenimento del token dal srv ; utilizzato anche per spacchettare i dati per la session
- axios - utilissimo per gestire le richieste; creato client personalizzato dal quale ho inviato le richieste al server

Il tempo a disposizione (e la poca esperienza) non mi ha permesso studiare profondamente la documentazione delle risorse extracorso ed applicare più implementazioni però tenderò a lungo andare a studiarle più da vicino in quanto mi hanno aiutato a rendere molto più dinamico il progetto e mi hanno incuriosito parecchio.

Tech&Resources BACKEND

la parte Backend è stata implementata su base node.js, express.js, mongodb.

risorse:

- bcrypt - necessario per la criptazione password durante creazione user
- express / express-session - necessario per la creazione del server / sessione
- jsonwebtoken - utilizzato per creazione token utente da restituire al FE dopo login
- moment.js - libreria spettacolare per gestire le date
- mongoose - necessario per creazione e gestione modelli
- multer / multer-storage-cloudinary - risorsa utile per caricare immagini su cloudinary
- uuid - gestione id degli elementi

PROCESSI

l'implementazione del progetto è avvevnuta in vari step; la progettazione come ovvio, è stato il primo step.

durante lo sviluppo mi sono attenuto alle tempistiche imposte ed alla scaletta utilizzata. Mi sono creato tutti i to do e sfruttato l'app GoTodo multipiattaforma per la gestione dei task.

il risultato finale è andato oltre l'aspettativa perchè inizialmente era previsto solamente l'inserimento della spesa a portale e la visualizzazione attraverso i grafici in chart JS; è stata implementata extra la pagina expenses, configurations (per la creazione categorie spesa) e profile dove l'utente ha l'opportunità di cambiare immagine profilo (solamente immagine profilo perchè ho dedicato più
tempo allo sviluppo delle altre pagine che ho reputato più importanti)

Il risultato finale (extra a parte che comunque sono strati previsti ma solo se l'obiettivo principale raggiunto) non è diverso dalle previsioni iniziali quindi direi che il percorso è stato implementato con successo
