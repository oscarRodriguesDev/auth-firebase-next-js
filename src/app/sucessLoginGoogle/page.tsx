"use client";
import { userLogout, getAuthStatus } from "../auth/auth_email";
import { useState, useEffect } from "react";
export default function WelcomePage() {
  const [state, setState] = useState<boolean>();
  const [frase, setFrase] = useState<string>("Sejam bem-vindos, usuário!");
  const [btnText, setBtnText] = useState<string>("Sair");
  const [nome, setNome] = useState<string>("user");

  async function verify() {
    try {
      const session = await getAuthStatus();
      setState(session.loggedIn);

      if (session.loggedIn) {
        if (session.email !== undefined && session.email !== null) {
          setNome(session.email);
        } else {
          setNome("");
        }
      } else {
        setNome("");
      }
    } catch (error) {
      console.error("Erro ao verificar a autenticação:", error);
      setState(false);
      setNome("");
    }
  }

  useEffect(() => {
    if (!state) {
      setFrase("Nenhum usuario logado!");
      setBtnText("Efeturar login");
    } else {
      setFrase(`seja bem vindo a aplicação ${nome}`);
      setBtnText("Exit");
    }
    verify();
  }, [state]);

  async function exitHandler() {
    await userLogout();
    alert("exiting");
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-semibold text-center">{frase}</h1>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          exitHandler();
        }}
      >
        {btnText}
      </button>
    </div>
  );
}
