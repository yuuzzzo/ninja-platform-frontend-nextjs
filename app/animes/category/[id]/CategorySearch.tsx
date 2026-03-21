"use client";

import { useState } from "react";
import AnimesCards from "@/components/AnimesCards";
import styles from "./CategoryCards.module.css";

interface Anime {
  id: number;
  title: string;
  synopisis: string;
  average: string;
  capeImage: string;
}

interface Props {
  animes: Anime[];
}

export default function CategorySearch({ animes }: Props) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? animes.filter((a) =>
        a.title.toLowerCase().includes(query.toLowerCase())
      )
    : animes;

  return (
    <>
      {/* ── Barra de pesquisa ── */}
      <div className={styles.searchWrapper}>
        <div className={styles.searchBox}>
          <svg
            className={styles.searchIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar pergaminho neste gênero..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className={styles.searchClear}
              onClick={() => setQuery("")}
              aria-label="Limpar busca"
            >
              ✕
            </button>
          )}
        </div>
        {query.trim() && (
          <p className={styles.searchCount}>
            {filtered.length === 0
              ? "Nenhum pergaminho encontrado"
              : `${filtered.length} pergaminho${filtered.length !== 1 ? "s" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`}
          </p>
        )}
      </div>

      {/* ── Grid de cards ── */}
      <div className={styles.gridContainer}>
        {filtered.length > 0 ? (
          filtered.map((anime) => (
            <AnimesCards key={anime.id} anime={anime} />
          ))
        ) : (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>🔍</span>
            <p className={styles.emptyText}>
              Nenhum pergaminho encontrado para &ldquo;{query}&rdquo;
            </p>
          </div>
        )}
      </div>
    </>
  );
}
