import Image from "next/image";
import styles from "./AnimeDetails.module.css";

export default async function AnimeDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `https://api.ninjaanimes.com.br/api/animes/${id}`,
  );

  const anime = await response.json();

  const categorys = [
    { id: 1, Category: "Romance" },
    { id: 2, Category: "Ação" },
    { id: 3, Category: "Terror" },
    { id: 5, Category: "Isekai" },
    { id: 6, Category: "Sports" },
    { id: 7, Category: "Clássicos" },
  ];

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.imageWrapper}>
            <div className={styles.rating}>
              {(anime.average >= 85 && `NINJA TROPHY ${anime.average} 🏆`) ||
                `⭐ ${anime.average}`}
            </div>
            <Image
              src={anime.capeImage}
              width={350}
              height={500}
              alt={anime.title}
              className={styles.image}
              priority
            />
          </div>

          <div className={styles.info}>
            <div className={styles.badge}>
              {categorys.find((category) => category.id === anime.categoryId)
                ?.Category || "Ninja Rank"}
            </div>
            <h1 className={styles.title}>{anime.title}</h1>

            <div>
              <h3 className={styles.sectionTitle}>Sinopse</h3>
              <p className={styles.synopsis}>{anime.synopisis}</p>
            </div>
          </div>
        </header>

        <section className={styles.ninjaSectionPergaminho}>
          <h2 className={styles.ninjaTitle}>
            <span>📜</span> Pergaminho do Anime
          </h2>
          <p className={styles.opinionText}>
            Temporadas: {anime.Temp}
            Episodios: {anime.episodes}
            Duração dos Episódios: {anime.DurationEp}
            {anime.StatusFinished
              ? "Anime já finalizado!"
              : "O Anime ainda está sendo lançado!"}
            {anime.StreamingPlatforms.map(
              (streamings: any) => `Plataformas para assistir: ${streamings}`,
            )}
            <br />
            {anime.Studios.map((studios: any) => `Studios: ${studios}`)}
            <br />
          </p>
        </section>
        <section className={styles.ninjaSection}>
          <h2 className={styles.ninjaTitle}>
            <span>🏮</span> Opinião do Ninja
          </h2>
          <p className={styles.opinionText}>{anime.opinionNinja}</p>
        </section>
      </div>
    </main>
  );
}
