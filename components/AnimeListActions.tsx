"use client";

import { useEffect, useState } from "react";
import { getSessionUser } from "@/services/session.service";
import { userAnimeListService } from "@/services/NinjaApi.service";
import type { AnimeListType } from "@/interfaces/UserAnimeList";
import styles from "./AnimeListActions.module.css";

interface AnimeListActionsProps {
  animeId: number;
}

const LIST_OPTIONS: { type: AnimeListType; label: string }[] = [
  { type: "WANT_TO_WATCH", label: "Quero assistir" },
  { type: "WATCHED", label: "Ja assisti" },
  { type: "LIKED", label: "Gostei desse anime" },
  { type: "DISLIKED", label: "Nao gostei desse anime" },
];

export default function AnimeListActions({ animeId }: AnimeListActionsProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<AnimeListType | null>(null);
  const [states, setStates] = useState<Record<AnimeListType, boolean>>({
    WANT_TO_WATCH: false,
    WATCHED: false,
    LIKED: false,
    DISLIKED: false,
  });

  useEffect(() => {
    const user = getSessionUser();
    setUserId(user?.id ?? null);
  }, []);

  useEffect(() => {
    async function loadStatus() {
      if (!userId) return;
      try {
        const status = await userAnimeListService.getAnimeStatus(
          userId,
          animeId,
        );
        setStates({
          WANT_TO_WATCH: status.includes("WANT_TO_WATCH"),
          WATCHED: status.includes("WATCHED"),
          LIKED: status.includes("LIKED"),
          DISLIKED: status.includes("DISLIKED"),
        });
      } catch (error) {
        console.error("Erro ao carregar lista do anime:", error);
      }
    }

    loadStatus();
  }, [userId, animeId]);

  async function handleToggle(listType: AnimeListType) {
    if (!userId) return;

    setIsLoading(listType);
    try {
      if (states[listType]) {
        await userAnimeListService.removeAnimeFromList(
          userId,
          animeId,
          listType,
        );
      } else {
        await userAnimeListService.addAnimeToList(userId, animeId, listType);
      }

      setStates((prev) => ({
        ...prev,
        [listType]: !prev[listType],
      }));
    } catch (error) {
      console.error("Erro ao atualizar lista do anime:", error);
    } finally {
      setIsLoading(null);
    }
  }

  return (
    <section className={styles.wrapper}>
      <h3 className={styles.title}>Minha Lista Ninja</h3>
      {!userId ? (
        <p className={styles.helperText}>
          Faca login para salvar este anime nas suas listas.
        </p>
      ) : (
        <p className={styles.helperText}>
          Clique para adicionar ou remover este anime de alguma de suas listas.
        </p>
      )}
      <div className={styles.grid}>
        {LIST_OPTIONS.map((option) => (
          <button
            key={option.type}
            type="button"
            className={`${styles.actionButton} ${states[option.type] ? styles.active : ""}`}
            onClick={() => handleToggle(option.type)}
            disabled={!userId || isLoading === option.type}
          >
            {isLoading === option.type
              ? "Salvando..."
              : states[option.type]
                ? `Remover: ${option.label}`
                : option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
