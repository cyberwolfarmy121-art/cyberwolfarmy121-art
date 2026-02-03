// Firebase Configuration for Karate Academy
// Configured with user's Firebase project

const firebaseConfig = {
    apiKey: "AIzaSyAjozWqZds5uNNtNge6fBkFJjBLDF1HD0o",
    authDomain: "karate-academy-13294.firebaseapp.com",
    databaseURL: "https://karate-academy-13294-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "karate-academy-13294",
    storageBucket: "karate-academy-13294.firebasestorage.app",
    messagingSenderId: "237731746798",
    appId: "1:237731746798:web:9ea6165440c96382e934ff",
    measurementId: "G-X4Q6XPHKDD"
};

// Initialize Firebase only if SDK is available
let database = null;

function initFirebase() {
    if (typeof firebase !== 'undefined' && !database) {
        try {
            firebase.initializeApp(firebaseConfig);
            database = firebase.database();
            console.log('Firebase initialized successfully');
        } catch (error) {
            console.log('Firebase initialization skipped:', error.message);
        }
    }
}

// Get settings from localStorage
function getSettings() {
    const stored = localStorage.getItem('karateSettings');
    if (stored) {
        return JSON.parse(stored);
    }
    return {
        siteName: 'Karate Academy',
        logoImage: '',
        logoIcon: 'fas fa-fist-raised',
        contactAddress: '',
        contactPhone: '',
        contactEmail: '',
        contactHours: ''
    };
}

// Get pricing from localStorage
function getPricing() {
    const stored = localStorage.getItem('karatePricing');
    if (stored) {
        return JSON.parse(stored);
    }
    return {
        beginner: { price: 49, discount: 0, features: ['Basic training videos', 'Beginner kata tutorials', 'Community access'] },
        advanced: { price: 89, discount: 0, features: ['All Beginner features', 'Advanced kata training', 'Kumite techniques', 'Priority support'] },
        elite: { price: 149, discount: 0, features: ['All Advanced features', '1-on-1 coaching sessions', 'Exclusive content', 'Personalized training plan'] }
    };
}

// Get payment sessions from localStorage
function getPaymentSessions() {
    const stored = localStorage.getItem('karatePaymentSessions');
    if (stored) {
        return JSON.parse(stored);
    }
    return { upi: true, banking: true, check: true, screenshot: true };
}

// Firebase helper functions
const firebaseSync = {
    isAvailable: () => database !== null,

    save: async (path, data) => {
        if (database) {
            try {
                await database.ref(path).set(data);
                console.log('Saved to Firebase:', path);
                return true;
            } catch (error) {
                console.log('Firebase save skipped');
                return false;
            }
        }
        return false;
    },

    listen: (path, callback) => {
        if (database) {
            const ref = database.ref(path);
            ref.on('value', (snapshot) => {
                callback(snapshot.val());
            });
            return () => ref.off();
        }
        return () => {};
    }
};

// Initialize Firebase when DOM is ready
document.addEventListener('DOMContentLoaded', initFirebase);
