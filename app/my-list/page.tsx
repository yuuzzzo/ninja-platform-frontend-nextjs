"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/BackButton";
import { getSessionUser } from "@/services/session.service";
import { userAnimeListService } from "@/services/NinjaApi.service";
import type { AnimeListType, UserAnimeListItem } from "@/interfaces/UserAnimeList";
import styles from "./page.module.css";

const LIST_LABEL: Record<AnimeListType, string> = {
  WANT_TO_WATCH: "Quero assistir",
  WATCHED: "Ja assisti",
  LIKED: "Gostei desse anime",
  DISLIKED: "Nao gostei desse anime",
};

export default function MyListPage() {
  const [items, setItems] = useState<UserAnimeListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedListType, setSelectedListType] = useState<AnimeListType | null>(null);

  useEffect(() => {
    async function loadUserList() {
      const user = getSessionUser();
      if (!user) {
        setError("Faca login para acessar suas listas.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await userAnimeListService.getUserAnimeList(user.id);
        setItems(data);
      } catch {
        setError("Nao foi possivel carregar suas listas.");
      } finally {
        setIsLoading(false);
      }
    }

    loadUserList();
  }, []);

  const grouped = useMemo(() => {
    const base: Record<AnimeListType, UserAnimeListItem[]> = {
      WANT_TO_WATCH: [],
      WATCHED: [],
      LIKED: [],
      DISLIKED: [],
    };

    for (const item of items) {
      base[item.listType].push(item);
    }

    return base;
  }, [items]);

  return (
    <main className={styles.container}>
      <div className={styles.topBar}>
        <BackButton href="/generes" label="Voltar ao Dojo" />
      </div>

      <section className={styles.header}>
        <h1>📚 Minhas Listas Ninja</h1>
        <p>Historico individual de animes marcados pelo usuario logado.</p>
      </section>

      {isLoading && <p className={styles.feedback}>Carregando suas listas...</p>}
      {!!error && !isLoading && <p className={styles.feedback}>{error}</p>}

      {!isLoading && !error && !selectedListType && (
        <section className={styles.selectorSection}>
          <h2>Escolha qual lista deseja visualizar</h2>
          <div className={styles.selectorGrid}>
            {(Object.keys(LIST_LABEL) as AnimeListType[]).map((listType) => (
              <button
                key={listType}
                type="button"
                className={styles.selectorButton}
                onClick={() => setSelectedListType(listType)}
              >
                <span>{LIST_LABEL[listType]}</span>
                <strong>{grouped[listType].length} animes</strong>
              </button>
            ))}
          </div>
        </section>
      )}

      {!isLoading && !error && selectedListType && (
        <section className={styles.listSection}>
          <div className={styles.sectionTop}>
            <button
              type="button"
              className={styles.backToSelector}
              onClick={() => setSelectedListType(null)}
            >
              ← Voltar para selecao de listas
            </button>
          </div>
          <div className={styles.filterRow}>
            {(Object.keys(LIST_LABEL) as AnimeListType[]).map((listType) => (
              <button
                key={listType}
                type="button"
                className={`${styles.filterButton} ${selectedListType === listType ? styles.filterButtonActive : ""}`}
                onClick={() => setSelectedListType(listType)}
              >
                {LIST_LABEL[listType]} ({grouped[listType].length})
              </button>
            ))}
          </div>

          <h2>{LIST_LABEL[selectedListType]}</h2>
          {grouped[selectedListType].length === 0 ? (
            <p className={styles.empty}>Nenhum anime nesta categoria.</p>
          ) : (
            <div className={styles.grid}>
              {grouped[selectedListType].map((item) => (
                <Link
                  key={item.id}
                  href={`/animes/category/description/${item.animeId}`}
                  className={styles.card}
                >
                  <div className={styles.imageWrap}>
                    {item.anime?.capeImage && (
                      <Image
                        src={item.anime.capeImage}
                        alt={item.anime?.title ?? "Anime"}
                        fill
                        className={styles.image}
                      />
                    )}
                  </div>
                  <div className={styles.info}>
                    <h3>{item.anime?.title ?? `Anime #${item.animeId}`}</h3>
                    <span>⭐ {Number(item.anime?.average ?? 0).toFixed(1)}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
