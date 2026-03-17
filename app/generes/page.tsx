"use client";

import Link from "next/link";
import styles from "./Generes.module.css";
import { useState } from "react";

export default function Generes() {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  const genres = [
    {
      id: 1,
      name: "Romance",
      icon: "🌸",
      desc: "Um Genin romântico e que leva as artes emocionais para um nivel superior, está pronto para sentir saudades daquela Jounin?",
      class: styles.romance,
    },
    {
      id: 2,
      name: "Ação",
      icon: "🔥",
      desc: "Muitos Genins são ansiosos para lutar, mas só aqueles que estudam e acompanham os pergaminhos de Ação são os vitóriosos, bora pro x1?",
      class: styles.action,
    },
    {
      id: 3,
      name: "Terror",
      icon: "💀",
      desc: "Somente os mais corajosos tem coragem de abrir esses pergaminhos, quero ver se você não vai tremer na base, ahh, e não vale abraçar a Jounin de medo!",
      class: styles.terror,
    },
    {
      id: 5,
      name: "Isekai",
      icon: "🌌",
      desc: "Depois de uma guerra para proteger o Dojo, quem não gosta de fugir da realidade e mergulhar nas fantasias imaginárias né? avoado, porém, feliz, é uma boa proposta.",
      class: styles.isekai,
    },
    {
      id: 6,
      name: "Sports",
      icon: "🏐",
      desc: "Genins atléticos são basicamente todos do Dojo, mas só os escolhidos aguentam o treinamento de nivel Jounin e supera os 'super dotados', você é um?",
      class: styles.sports,
    },
    {
      id: 7,
      name: "Clássicos",
      icon: "📜",
      desc: "Jounins, mais experientes e que gostam dos treinamentos de padrões clássicos do Dojo, histórias e bagagems de lutas capaz de preencher um livro, eu aprecio você, de verdade!",
      class: styles.classics,
    },
  ];

  return (
    <>
      <main className={styles.mainWrapper}>
        <div className={styles.titulo}>
          <p className={styles.tituloEyebrow}>⚔️ Dojo Ninja — Curadoria Premium</p>
          <h1>Está procurando<br />o que hoje, Genin?</h1>
          <p className={styles.tituloSub}>
            Escolha seu gênero e mergulhe nos melhores pergaminhos selecionados
          </p>
        </div>
      </main>
      <section className={styles.container}>
        {genres.map((genre) => (
          <Link key={genre.id} href={`/animes/category/${genre.id}`}>
            <button
              className={`${styles.genreButton} ${genre.class}`}
              disabled={loadingId === genre.id}
              onClick={() => setLoadingId(genre.id)}
              onMouseEnter={() => setIsHovered(genre.id)} // Ativa o ID no estado
              onMouseLeave={() => setIsHovered(null)} // Limpa ao sair
            >
              <span className={styles.icon}>{genre.icon}</span>
              <span>
                {loadingId === genre.id
                  ? "Estilo Ninja... Anime no Jutsu! 💨"
                  : genre.name}
              </span>
            </button>
          </Link>
        ))}
      </section>
      <footer className={styles.footer}>
        <h1 className={styles.phrase}>
          {genres.find((g) => g.id === isHovered)?.desc ||
            "Escolha seu caminho ninja!"}
        </h1>
      </footer>
    </>
  );
}
