

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, onAuthStateChanged, User } from "firebase/auth";
import { redirect } from "next/navigation";



const firebaseConfig = {
/*   apiKey:`AIzaSyDcZJiJTmCSrvr9INI9Z9Zg5n1eSnjcSsw`,
  authDomain: "sbi-db.firebaseapp.com",
  databaseURL: "https://sbi-db-default-rtdb.firebaseio.com",
  projectId: "sbi-db",
  storageBucket: "sbi-db.appspot.com",
  messagingSenderId: `421227812598`,
  appId: `1:421227812598:web:f72bc9fb462db69264fed7` */

  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/* Esta função permite o usuario criar um login usando email e senha */
export async function createUserEmail(email: string, password: string): Promise<boolean> {
  try {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
    const user = userCredential.user;
    return true;
  } catch (error) {
    return false;
  }
}

/* Esta função permite que o usuario faça login utilizando o email e senha criados anteriormente */
export async function userLogin(email: string, password: string): Promise<boolean> {
  try {
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
    const user = userCredential.user;
    return true;
  } catch (error) {
    return false;
  }
}

/* Esta função permite que o usuairo faça logout de sua aplicação */
export async function userLogout(): Promise<boolean> {
  try {
    await signOut(getAuth());
    window.location.href='/'
    return true;
    } catch (error) {
      return false;
      }
}


//futuramente vai para os tipos
export interface AuthStatus {
  loggedIn: boolean;
  email?: string | null;

  }
  
  /*Esta função retorna a session no sistema, e o email do usuario logado */
export async function getAuthStatus(): Promise<AuthStatus> {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        resolve({ loggedIn: true, email: user.email });
      } else {
      
        resolve({ loggedIn: false, email: null });
        
       
      }
    }, (error) => {
 
      reject(error);
    });
  });
}

