//Firebase
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  updateProfile,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';

import { collection, getDocs, addDoc, updateDoc, getFirestore, deleteDoc, doc } from 'firebase/firestore';
import { createFormattedDate } from './Date';

import { setAuthUser } from './auth';

const firebaseConfig = {
  apiKey: "AIzaSyCWT0AhjMA3rRUxQxzcvH1V9wPEpJzuEAk",
  authDomain: "easygsm-39656.firebaseapp.com",
  projectId: "easygsm-39656",
  storageBucket: "easygsm-39656.appspot.com",
  messagingSenderId: "161853302891",
  appId: "1:161853302891:web:0d0526f72ce08ba2d7292e",
  measurementId: "G-D84HBKGY8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const FirebaseAuth = {
  createUser(email, password, displayName) {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      this.updateDisplayName(user, displayName);
    });
  },

  updateDisplayName(user, displayName) {
    return updateProfile(user, { displayName: displayName });
  },

  updatePicture(user, photoURL) {
    return updateProfile(user, { photoURL: photoURL }).then(() => {
      setAuthUser(user);
    });
  },

  loginWithGoogle() {
    return signInWithPopup(auth, googleProvider).then((userCredential) => {
      const user = userCredential.user;
      setAuthUser(user);
    });
  },

  loginWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      setAuthUser(user);
    });
  },

  logoutUser() {
    return signOut(auth);
  }
};

const FireStore = {
  async getServers() {
    const uid = localStorage.getItem('uid');
    const querySnapshot = await getDocs(collection(db, `servers`, `${uid}`, `servers`));
    const servers = [];
    for (let i = 0; i < querySnapshot.docs.length; i++) {
      let server = querySnapshot.docs[i].data();
      server = { ...server, id: querySnapshot.docs[i].id, status: 0, players: 0 };
      servers.push(server);
    }
    return servers;
  },

  async addServer({ game, name, savePath, executablePath, banlist = [], ports = [] }) {
    const uid = localStorage.getItem('uid');
    return await addDoc(collection(db, `servers`, `${uid}`, 'servers'), {
      game,
      name,
      savePath,
      executablePath,
      banlist,
      ports
    });
  },

  async updateServer({ id, game, name, savePath, executablePath, banlist = [], ports = [] }) {
    const uid = localStorage.getItem('uid');
    return await updateDoc(doc(db, `servers`, `${uid}`, 'servers', `${id}`), {
      game,
      name,
      savePath,
      executablePath,
      banlist,
      ports
    });
  },

  async deleteServer(id) {
    const uid = localStorage.getItem('uid');
    return await deleteDoc(doc(db, `servers`, `${uid}`, 'servers', `${id}`));
  },

  async getGeneralNotifications() {
    const uid = localStorage.getItem('uid');
    const querySnapshot = await getDocs(collection(db, `notifications`, `${uid}`, `general`));
    const notifications = [];
    for (let i = 0; i < querySnapshot.docs.length; i++) {
      let notification = querySnapshot.docs[i].data();
      const convertedDate = createFormattedDate(notification.date.toDate());
      notification = { ...notification, id: querySnapshot.docs[i].id, date: convertedDate };
      notifications.push(notification);
    }
    return notifications;
  },

  async getBackupNotifications() {
    try {
      const uid = localStorage.getItem('uid');
      const querySnapshot = await getDocs(collection(db, `notifications`, `${uid}`, `backups`));
      // console.log(querySnapshot);
      const notifications = [];
      for (let i = 0; i < querySnapshot.docs.length; i++) {
        let notification = querySnapshot.docs[i].data();
        const convertedDate = createFormattedDate(notification.date.toDate());
        notification = { ...notification, id: querySnapshot.docs[i].id, date: convertedDate };
        notifications.push(notification);
      }
      return notifications;
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  },

  async deleteGeneralNotification(id) {
    const uid = localStorage.getItem('uid');
    return await deleteDoc(doc(db, `notifications`, `${uid}`, `general`, id));
  },

  async deleteBackupNotification(id) {
    const uid = localStorage.getItem('uid');
    return await deleteDoc(doc(db, `notifications`, `${uid}`, `backups`, id));
  }
};

export { FirebaseAuth, FireStore };
