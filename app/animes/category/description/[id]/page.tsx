import Image from "next/image";
import styles from "./AnimeDetails.module.css";
import BackButton from "@/components/BackButton";

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
        <BackButton
          href={`/animes/category/${anime.categoryId}`}
          label="Voltar à lista"
        />

        <header className={styles.header}>
          <div className={styles.imageContainer}>
            <div className={styles.rating}>
              {Number(anime.average) >= 85
                ? `🏆 NINJA TROPHY ${Number(anime.average).toFixed(1)}`
                : `⭐ ${Number(anime.average).toFixed(1)}`}
            </div>
            <div className={styles.imageWrapper}>
              <Image
                src={anime.capeImage}
                width={310}
                height={440}
                alt={anime.title}
                className={styles.image}
                priority
              />
            </div>
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
            Temporadas:{" "}
            {anime.Temp == 1 ? `${anime.Temp} Temp.` : `${anime.Temp} Temps.`}
            <br />
            Episodios: {anime.episodes} Eps.
            <br />
            Duração dos Episódios: {anime.DurationEp} minutos.
            <br />
            {anime.StatusFinished
              ? "Status: Anime já foi finalizado!"
              : "Status: O Anime ainda está sendo lançado!"}
            <br />
            Plataformas para Assistir: {anime.StreamingPlatforms.join(", ")}.
            <br />
            Studios: {anime.Studios.join(", ")}
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
