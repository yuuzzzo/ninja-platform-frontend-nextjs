import AnimesCards from "@/components/AnimesCards";
import styles from "./CategoryCards.module.css";

interface Anime {
  id: number;
  title: string;
  synopisis: string;
  average: string;
  capeImage: string;
}

export default async function Category({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `https://ninja-platform-backend.onrender.com/api/animes/category/${id}`,
  );
  const animes = await response.json();
  const respostaRequest = animes.anime;

  return (
    <main className={styles.mainWrapper}>
      <div className={styles.gridContainer}>
        {respostaRequest.map((anime: Anime) => (
          <AnimesCards key={anime.id} anime={anime} />
        ))}
      </div>
    </main>
  );
}
