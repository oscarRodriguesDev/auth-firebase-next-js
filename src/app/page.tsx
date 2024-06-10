'use client';
import LoginForm from "./components/login/login";
import { useEffect, useState } from "react";
import { userLogin, getAuthStatus } from "./auth/auth_email";
import Link from "next/link";


export default function Home() {
  const [estado, setEstado] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const session = await getAuthStatus();
        setEstado(session.loggedIn);
      } catch (error) {
        setEstado(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <>
      {estado? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="text-black"><p>Você jã esta logado</p></div>
         <Link href='/sucessLoginGoogle'>
           <div className="w-full bg-lime-700 pl-3 pr-3 py-2 rounded-lg"> Entrar na aplicação?</div> 
         </Link>
        </div>
      ) : (
        !estado && (
          <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl text-black font-semibold mb-4">Login</h2>
                <LoginForm />
            </div>
          </div>
        )
      )}
    </>
  );
}

