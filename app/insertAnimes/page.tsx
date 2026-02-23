"use client";

import { FormEvent } from "react";
import { animeService } from "@/services/NinjaApi.service";
import styles from "./insertAnimes.module.css";

export default function insertAnimes() {
  async function enviaAnimesDb(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const insertAnime = Object.fromEntries(formData.entries());

    try {
      const response = await animeService.insertAnimes(insertAnime);

      if (response) {
        alert("Anime cadastrado no banco com sucesso!");
        console.log("Anime in DB:", response);
      }
    } catch (error) {
      console.error("Erro ao cadastrar anime no banco", error);
    }
  }
  return (
    <main className={styles.container}>
      <form className={styles.formContainer} onSubmit={enviaAnimesDb}>
        <h1 className={styles.titleForm}>Cadastrar Anime DB</h1>
        <input
          className={styles.inputForm}
          name="title"
          type="text"
          placeholder="titulo do anime"
          required
        />
        <input
          className={styles.inputForm}
          name="average"
          type="text"
          placeholder="nota do anime"
          required
        />
        <input
          className={styles.inputForm}
          name="synopisis"
          type="text"
          placeholder="sinopse do anime"
          required
        />
        <input
          className={styles.inputForm}
          name="capeImage"
          type="text"
          placeholder="Capa do anime ( média )"
          required
        />
        <input
          className={styles.inputForm}
          name="opinionNinja"
          type="text"
          placeholder="Opiniao do ninja"
          required
        />
        <input
          className={styles.inputForm}
          name="categoryId"
          type="text"
          placeholder="Id da categoria do anime"
          required
        />
        <button className={styles.buttonForm} type="submit">
          Enviar Anime!
        </button>
      </form>
    </main>
  );
}
