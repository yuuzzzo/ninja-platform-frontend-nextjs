import Image from "next/image";
import styles from "./AnimeDetails.module.css";

export default async function AnimeDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(`https://api.ninjaanimes/api/animes/${id}`);

  const anime = await response.json();

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.imageWrapper}>
            <div className={styles.rating}>⭐ {anime.average}</div>
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
              {anime.category?.name || "Ninja Rank"}
            </div>
            <h1 className={styles.title}>{anime.title}</h1>

            <div>
              <h3 className={styles.sectionTitle}>Sinopse</h3>
              <p className={styles.synopsis}>{anime.synopisis}</p>
            </div>
          </div>
        </header>

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
