import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCcTpkW3CFy3EyWzDtZ69ljA2FXyg1FiMs',
  authDomain: 'todolistapp-d0513.firebaseapp.com',
  projectId: 'todolistapp-d0513',
  storageBucket: 'todolistapp-d0513.firebasestorage.app',
  messagingSenderId: '775832604545',
  appId: '1:775832604545:web:b3e6c64f01fbed813c2280',
  measurementId: 'G-WZEVMHVL8T',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
