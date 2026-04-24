import { renderIdeas } from './ideas.js';
// import { renderMarathon } from './marathon.js'; // We'll do this next

const firebaseConfig = {
    apiKey: "AIzaSyAnnzBIK2Y0P1Gn8_4I6ZOu2z0P1LEeDk0",
  authDomain: "aijazideas.firebaseapp.com",
  databaseURL: "https://aijazideas-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aijazideas",
  storageBucket: "aijazideas.firebasestorage.app",
  messagingSenderId: "822948950064",
  appId: "1:822948950064:web:031df081b41175ef3a7df5"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// The function that switches tabs
window.loadTab = function(tabName) {
    if (tabName === 'ideas') {
        renderIdeas(db);
    } else if (tabName === 'marathon') {
        location.reload(); // Temporary fix: reload to show original index content
    }
};

// Default load
// For now, let's not overwrite the home page until you're ready
