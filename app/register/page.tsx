"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation"; // Corrigido para navigation
import { usersService } from "@/services/NinjaApi.service";
import styles from "./page.module.css";
import Image from "next/image";
import Swal from "sweetalert2";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function enviaCadastro(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Captura os dados do formulário de forma simples
    const formData = new FormData(event.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    try {
      setIsLoading(true);
      const response = await usersService.postUserRegister(userData);

      if (response) {
        await Swal.fire({
          title: "Um novo Genin no dojo? legaaal!",
          text: "Cadastro efetuado com sucesso!",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
      router.push("/login");
    } catch (error) {
      Swal.fire({
        title: "Erro ao realizar cadastro",
        text: "Por favor verifique os dados!",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <form className={styles.formContainer} onSubmit={enviaCadastro}>
        <div className={styles.logoNinja}>
          <h1 className={styles.titleForm}>Registro Ninja</h1>
          <Image
            src={"/logo.png"}
            width={120}
            height={120}
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
              margin: "0",
            }}
            alt="logo cadastro"
          />
        </div>
        <input
          className={styles.inputForm}
          name="user"
          placeholder="Username"
          required
          disabled={isLoading}
        />
        <input
          className={styles.inputForm}
          name="email"
          type="email"
          placeholder="E-mail"
          required
          disabled={isLoading}
        />
        <input
          className={styles.inputForm}
          name="password"
          type="password"
          placeholder="Password"
          required
          disabled={isLoading}
        />
        <button
          className={styles.buttonForm}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Registrar"}
        </button>
        <button
          className={styles.buttonRedirect}
          onClick={() => router.push("/login")}
          disabled={isLoading}
        >
          Já possuo conta!
        </button>
      </form>
    </main>
  );
}
