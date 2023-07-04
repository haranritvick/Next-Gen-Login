import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAS4xBqRMbmnGlqcGvdSsQDf_6MGvFmc9U",
  authDomain: "bank-authotp.firebaseapp.com",
  projectId: "bank-authotp",
  storageBucket: "bank-authotp.appspot.com",
  messagingSenderId: "115315070000",
  appId: "1:115315070000:web:51bd3f278b578a004789f5",
  measurementId: "G-DZT0QVCHZQ"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;