"use client";

import Link from "next/link";
import styles from "./Generes.module.css";
import { useState } from "react";

export default function Generes() {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const genres = [
    { id: 1, name: "Romance", icon: "🌸", class: styles.romance },
    { id: 2, name: "Ação", icon: "🔥", class: styles.action },
    { id: 3, name: "Terror", icon: "💀", class: styles.terror },
    { id: 5, name: "Isekai", icon: "🌌", class: styles.isekai },
    { id: 6, name: "Sports", icon: "🏐", class: styles.sports },
    { id: 7, name: "Clássicos", icon: "📜", class: styles.classics },
  ];

  return (
    <>
      <main className={styles.mainWrapper}>
        <div className={styles.titulo}>
          <h1>Está procurando o que hoje Genin?</h1>
        </div>
      </main>
      <section className={styles.container}>
        {genres.map((genre) => (
          <Link key={genre.id} href={`/animes/category/${genre.id}`}>
            <button
              key={genre.id}
              className={`${styles.genreButton} ${genre.class}`}
              disabled={loadingId === genre.id}
              onClick={() => setLoadingId(genre.id)}
            >
              <span className={styles.icon}>{genre.icon}</span>
              <span>
                {loadingId === genre.id
                  ? "Estilo Ninja... Anime no Jutsu! 💨"
                  : `${genre.name}`}
              </span>
            </button>
          </Link>
        ))}
      </section>
    </>
  );
}
