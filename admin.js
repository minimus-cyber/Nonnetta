// ============================================
// NONNETTA - PANNELLO AMMINISTRAZIONE
// Autenticazione tramite Firebase Authentication.
// L'accesso admin richiede il ruolo "admin" nel documento
// Firestore: users/{uid}/role == "admin"
// Il ruolo viene assegnato manualmente tramite Firebase Console
// o Firebase Admin SDK, MAI tramite password hard-coded nel frontend.
// ============================================
import { auth, db } from './firebase-config.js';
import {
    onAuthStateChanged,
    signOut
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import {
    doc,
    getDoc,
    collection,
    getDocs,
    deleteDoc,
    query,
    collectionGroup,
    where
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// ========== STATO ==========
let currentAdmin = null;

// ========== INIZIALIZZAZIONE ==========
// onAuthStateChanged è avviato a livello di modulo per intercettare lo stato
// di autenticazione il prima possibile, indipendentemente dal caricamento del DOM.
onAuthStateChanged(auth, handleAuthChange);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('admin-logout-btn').addEventListener('click', logoutAdmin);
});

async function handleAuthChange(firebaseUser) {
    if (!firebaseUser) {
        showLoginSection();
        return;
    }

    // Verifica ruolo admin su Firestore
    try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists() && userDoc.data().role === 'admin') {
            currentAdmin = { uid: firebaseUser.uid, email: firebaseUser.email };
            showAdminDashboard();
        } else {
            // Utente autenticato ma non admin
            await signOut(auth);
            showAccessDenied();
        }
    } catch (err) {
        console.error('Errore verifica ruolo admin:', err);
        await signOut(auth);
        showAccessDenied();
    }
}

function showLoginSection() {
    document.getElementById('admin-login-section').style.display = 'block';
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('admin-access-denied').style.display = 'none';
}

function showAdminDashboard() {
    document.getElementById('admin-login-section').style.display = 'none';
    document.getElementById('admin-access-denied').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'block';
    document.getElementById('admin-name').textContent = currentAdmin.email;
    loadDashboardData();
}

function showAccessDenied() {
    document.getElementById('admin-login-section').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('admin-access-denied').style.display = 'block';
}

async function logoutAdmin() {
    await signOut(auth);
    currentAdmin = null;
}

// ========== DASHBOARD DATA ==========
async function loadDashboardData() {
    await loadUsersList();
    await loadStatistics();
}

async function loadUsersList() {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '<p class="help-text">Caricamento...</p>';

    try {
        const usersSnap = await getDocs(collection(db, 'users'));
        if (usersSnap.empty) {
            usersList.innerHTML = '<p class="help-text">Nessun utente registrato.</p>';
            return;
        }

        let html = '';
        for (const userDoc of usersSnap.docs) {
            const data = userDoc.data();
            const uid = userDoc.id;
            const email = data.email || uid;
            const role = data.role || 'utente';
            const registeredDate = data.createdAt
                ? new Date(data.createdAt.toDate ? data.createdAt.toDate() : data.createdAt).toLocaleDateString('it-IT')
                : 'N/D';

            // Conta attività nel sotto-collection diary
            const diarySnap = await getDocs(collection(db, 'users', uid, 'diary'));
            const activityCount = diarySnap.size;

            html += `
                <div class="user-item">
                    <div>
                        <strong>📧 ${email}</strong><br>
                        <small>Ruolo: ${role} | Registrato: ${registeredDate} | Attività: ${activityCount}</small>
                    </div>
                    <button class="btn btn-danger" onclick="deleteUser('${uid}', '${email}')">Elimina</button>
                </div>
            `;
        }
        usersList.innerHTML = html;
    } catch (err) {
        console.error('Errore caricamento utenti:', err);
        usersList.innerHTML = '<p class="help-text">Errore nel caricamento utenti.</p>';
    }
}

async function loadStatistics() {
    try {
        const usersSnap = await getDocs(collection(db, 'users'));
        const totalUsers = usersSnap.size;

        let totalActivities = 0;
        let activeToday = 0;
        const today = new Date().toLocaleDateString('it-IT');

        for (const userDoc of usersSnap.docs) {
            const diarySnap = await getDocs(collection(db, 'users', userDoc.id, 'diary'));
            totalActivities += diarySnap.size;
            const hasActivityToday = diarySnap.docs.some(d => {
                const dateStr = d.data().date ? new Date(d.data().date).toLocaleDateString('it-IT') : '';
                return dateStr === today;
            });
            if (hasActivityToday) activeToday++;
        }

        document.getElementById('total-users').textContent = totalUsers;
        document.getElementById('total-activities').textContent = totalActivities;
        document.getElementById('active-today').textContent = activeToday;
    } catch (err) {
        console.error('Errore caricamento statistiche:', err);
    }
}

window.deleteUser = async function(uid, email) {
    if (!confirm(`Sei sicuro di voler eliminare l'utente ${email}? Questa azione non può essere annullata.`)) {
        return;
    }

    try {
        // Elimina la sotto-collection diary
        const diarySnap = await getDocs(collection(db, 'users', uid, 'diary'));
        for (const d of diarySnap.docs) {
            await deleteDoc(d.ref);
        }
        // Elimina il documento utente
        await deleteDoc(doc(db, 'users', uid));
        await loadDashboardData();
        alert('Utente eliminato.');
    } catch (err) {
        console.error('Errore eliminazione utente:', err);
        alert('Errore durante l\'eliminazione dell\'utente.');
    }
};

// ========== NAVIGAZIONE TASTIERA ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentAdmin) {
        if (confirm('Vuoi uscire dal pannello amministratore?')) {
            logoutAdmin();
        }
        e.preventDefault();
    }
});
