import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithRedirect, onAuthStateChanged, User } from "firebase/auth";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, 
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

// Interface para o status da autenticação
export interface AuthStatus {
  loggedIn: boolean;
  email?: string | null;
  nome?: string | null;
  fotoUrl?: string | null;
}

// Função de login com redirecionamento do Google
export async function userLogin1() {
  await signInWithRedirect(auth, provider);
}

// Função para obter informações do usuário
export async function userData(): Promise<AuthStatus> {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Obtendo informações adicionais do usuário
        const nome = user.displayName;
        const email = user.email;
        const fotoUrl = user.photoURL;

        resolve({
          loggedIn: true,
          email: email,
          nome: nome,
          fotoUrl: fotoUrl,
        });
      } else {
        resolve({
          loggedIn: false,
          email: null,
          nome: null,
          fotoUrl: null,
        });
      }
    }, (error) => {
      reject(error);
    });
  });
}

