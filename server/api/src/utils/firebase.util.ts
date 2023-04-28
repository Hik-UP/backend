import admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert('./config/firebaseKey.json')
});

export { admin as firebase };
