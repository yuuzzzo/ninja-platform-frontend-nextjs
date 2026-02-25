"use client";

import { usersService } from "@/services/NinjaApi.service";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import Swal from "sweetalert2";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
