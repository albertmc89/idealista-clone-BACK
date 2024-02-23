import admin from "firebase-admin";

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.PRIVATE_KEY?.replace(/\\n/gm, "\n"),
    clientEmail: process.env.CLIENT_MAIL,
  }),
});

export default firebaseApp;
