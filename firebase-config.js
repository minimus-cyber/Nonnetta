// ============================================================
// CONFIGURAZIONE FIREBASE - DA PERSONALIZZARE
// ============================================================
// Istruzioni:
// 1. Vai su https://console.firebase.google.com/
// 2. Crea un progetto (o selezionane uno esistente)
// 3. Aggiungi un'app Web e copia la configurazione qui sotto
// 4. Abilita Authentication > Email/Password e Google
// 5. Crea il database Firestore e imposta le Security Rules (vedi firestore.rules)
// 6. Aggiungi i tuoi domini a Authentication > Impostazioni > Domini autorizzati
//
// NOTA: firebaseConfig NON è un segreto. È pensata per essere pubblica.
// La sicurezza è garantita dalle Firestore Security Rules lato server.
// Non committare mai service account keys o Firebase Admin SDK credentials.
// ============================================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// Sostituisci con la configurazione del tuo progetto Firebase
const firebaseConfig = {
  apiKey: "INSERISCI-QUI-LA-TUA-API-KEY",
  authDomain: "il-tuo-progetto.firebaseapp.com",
  projectId: "il-tuo-progetto",
  storageBucket: "il-tuo-progetto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:000000000000"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
