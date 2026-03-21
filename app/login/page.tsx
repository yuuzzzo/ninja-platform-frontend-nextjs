"use client";

import { usersService, passwordService } from "@/services/NinjaApi.service";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import Swal from "sweetalert2";

type View = "login" | "recuperar-step1" | "recuperar-step2";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<View>("login");
  const [resetToken, setResetToken] = useState("");
  const [emailRecuperar, setEmailRecuperar] = useState("");

  async function sendLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    try {
      setIsLoading(true);

      const response = await usersService.postUserLogin(userData);

      if (response) {
        await Swal.fire({
          title: "Bem vindo(a) de volta Genin!",
          text: "Login realizado com sucesso",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
      router.push("/generes");
    } catch (error) {
      Swal.fire({
        title: "Erro ao entrar no Dojo",
        text: "E-mail ou senha inválidos",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      console.error("Erro ao conectar na API:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function solicitarToken(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;

    try {
      setIsLoading(true);
      const { resetToken: token } = await passwordService.esqueciSenha(email, username);
      setResetToken(token);
      setEmailRecuperar(email);
      setView("recuperar-step2");
    } catch (error) {
      Swal.fire({
        title: "Credenciais inválidas",
        text: "O nome de usuário e e-mail não correspondem a nenhuma conta.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function redefinirSenha(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newPassword = formData.get("newPassword") as string;

    try {
      setIsLoading(true);
      await passwordService.redefinirSenha(resetToken, newPassword);
      await Swal.fire({
        title: "Senha redefinida!",
        text: "Sua nova senha foi salva com sucesso.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      setView("login");
      setResetToken("");
      setEmailRecuperar("");
    } catch (error) {
      Swal.fire({
        title: "Erro ao redefinir senha",
        text: "O token expirou ou é inválido. Solicite um novo.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      setView("recuperar-step1");
      setResetToken("");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (view === "recuperar-step1") {
    return (
      <main className={styles.container}>
        <form className={styles.formContainer} onSubmit={solicitarToken}>
          <div className={styles.logoNinja}>
            <h1 className={styles.titleForm}>Recuperar Senha</h1>
            <Image
              src={"/logo.png"}
              width={120}
              height={120}
              style={{ maxWidth: "100%", height: "auto", display: "block", margin: 0 }}
              alt="logo recuperar senha"
            />
          </div>
          <p className={styles.recoveryInfo}>
            Informe seu nome de usuário e e-mail para verificar sua identidade.
          </p>
          <input
            className={styles.inputForm}
            type="text"
            name="username"
            placeholder="Nome de usuário"
            required
            disabled={isLoading}
          />
          <input
            className={styles.inputForm}
            type="email"
            name="email"
            placeholder="E-mail cadastrado"
            required
            disabled={isLoading}
          />
          <button className={styles.buttonForm} type="submit" disabled={isLoading}>
            {isLoading ? "Verificando..." : "Verificar Identidade"}
          </button>
          <button
            type="button"
            className={styles.buttonRedirect}
            onClick={() => setView("login")}
            disabled={isLoading}
          >
            Voltar ao login
          </button>
        </form>
      </main>
    );
  }

  if (view === "recuperar-step2") {
    return (
      <main className={styles.container}>
        <form className={styles.formContainer} onSubmit={redefinirSenha}>
          <div className={styles.logoNinja}>
            <h1 className={styles.titleForm}>Nova Senha</h1>
            <Image
              src={"/logo.png"}
              width={120}
              height={120}
              style={{ maxWidth: "100%", height: "auto", display: "block", margin: 0 }}
              alt="logo nova senha"
            />
          </div>
          <p className={styles.recoveryInfo}>
            Token gerado para <strong>{emailRecuperar}</strong>. Crie sua nova senha abaixo.
          </p>
          <input
            className={styles.inputForm}
            type="password"
            name="newPassword"
            placeholder="Nova senha (mín. 6 caracteres)"
            minLength={6}
            required
            disabled={isLoading}
          />
          <button className={styles.buttonForm} type="submit" disabled={isLoading}>
            {isLoading ? "Salvando..." : "Redefinir Senha"}
          </button>
          <button
            type="button"
            className={styles.buttonRedirect}
            onClick={() => setView("recuperar-step1")}
            disabled={isLoading}
          >
            Usar outro e-mail
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <form className={styles.formContainer} onSubmit={sendLogin}>
        <div className={styles.logoNinja}>
          <h1 className={styles.titleForm}>Login Ninja</h1>
          <Image
            src={"/logo.png"}
            width={120}
            height={120}
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
              margin: 0,
            }}
            alt="logo login"
          />
        </div>
        <input
          className={styles.inputForm}
          type="email"
          name="email"
          placeholder="Email"
          required
          disabled={isLoading}
        />
        <input
          className={styles.inputForm}
          type="password"
          name="password"
          placeholder="Password"
          required
          disabled={isLoading}
        />
        <button
          className={styles.buttonForm}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Verificando..." : "Logar"}
        </button>
        <button
          type="button"
          className={styles.linkEsqueci}
          onClick={() => setView("recuperar-step1")}
          disabled={isLoading}
        >
          Esqueci minha senha
        </button>
        <button
          type="button"
          className={styles.buttonRedirect}
          onClick={() => router.push("/register")}
          disabled={isLoading}
        >
          Não tenho conta!
        </button>
      </form>
    </main>
  );
}
