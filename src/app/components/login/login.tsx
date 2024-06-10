'use client'
import { useState } from "react";
import { userLogin } from "@/app/auth/auth_email";
import { userLogin1 } from "@/app/auth/auth_google";
export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);
        setError("");

        try {
          await userLogin(email, password); 
         
            window.location.href = '/sucessLoginEmail'
        } catch (err) {
            setError("Falha no login. Verifique suas credenciais.");
        } finally {
            setLoading(false);
        }
    };

    //login do google
    const loginGoogle =async ()=>{
     await userLogin1()
       window.location.href = '/sucessLoginGoogle'
    }

    return (
        <div className="text-black">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
                <label htmlFor="email" className="block mb-1">email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block mb-1">Senha:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>
            <div className=" flex flex-row justify-between">

            <button
                onClick={handleLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={loading}
            >

                {loading ? "Carregando..." : "E-mail"}
            </button>

            <button
            onClick={loginGoogle}
             className="bg-lime-600 text-white px-4 py-2 rounded hover:bg-blue-600"
            >Google</button>
                
            </div>
        </div>
    );
}
