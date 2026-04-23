import Image from "next/image";
import styles from "./AnimeDetails.module.css";
import BackButton from "@/components/BackButton";
import AnimeListActions from "@/components/AnimeListActions";
import MyListButton from "@/components/MyListButton";

const PLATFORM_CLASS: Record<string, string> = {
  Netflix: styles.platformNetflix,
  Crunchyroll: styles.platformCrunchyroll,
  "Amazon Prime": styles.platformAmazonPrime,
  Funimation: styles.platformFunimation,
  "Disney+": styles.platformDisney,
  HiDive: styles.platformHidive,
};

export default async function AnimeDetails({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const { from } = await searchParams;

  const response = await fetch(
    `https://api.ninjaanimes.com.br/api/animes/${id}`,
  );

  const anime = await response.json();
  const fallbackHref = `/animes/category/${anime.categoryId}`;
  const backHref =
    from && from.startsWith("/animes/category/") ? from : fallbackHref;

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.topNav}>
          <BackButton href={backHref} label="Voltar à lista" />
          <MyListButton />
        </div>

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
            <div className={styles.badgeRow}>
              {anime.SubCategorias.map((datas: string) => (
                <div key={datas} className={styles.badge}>
                  {datas}
                </div>
              ))}
            </div>
            <h1 className={styles.title}>{anime.title}</h1>
            <span className={styles.releaseDate}>
              Ano de lançamento: {anime.DataLancamento}
            </span>
            <div className={styles.geninVotes}>
              <div className={styles.voteApproved}>
                ✅ Genins gostaram: {anime.approvedGeninCount ?? 0}
              </div>
              <div className={styles.voteRejected}>
                ❌ Genins não gostaram: {anime.rejectedGeninCount ?? 0}
              </div>
            </div>
            <div>
              <h3 className={styles.sectionTitle}>Sinopse</h3>
              <p className={styles.synopsis}>{anime.synopisis}</p>
            </div>
            <AnimeListActions animeId={Number(id)} />
          </div>
        </header>

        <section className={styles.ninjaSectionPergaminho}>
          <h2 className={styles.ninjaTitle}>
            <span>📜</span> Pergaminho do Anime
          </h2>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>🎬</span>
              <span className={styles.statLabel}>Temporadas</span>
              <span className={styles.statValue}>
                {anime.Temp} {anime.Temp == 1 ? "Temp." : "Temps."}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>📺</span>
              <span className={styles.statLabel}>Episódios</span>
              <span className={styles.statValue}>{anime.episodes} Eps.</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statIcon}>⏱️</span>
              <span className={styles.statLabel}>Duração / Ep.</span>
              <span className={styles.statValue}>{anime.DurationEp} min</span>
            </div>
          </div>

          <div className={styles.chipsSection}>
            <span className={styles.chipsLabel}>Plataformas</span>
            <div className={styles.chipsRow}>
              {anime.StreamingPlatforms.map((platform: string) => (
                <span
                  key={platform}
                  className={`${styles.platformChip} ${PLATFORM_CLASS[platform] ?? ""}`}
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.chipsSection}>
            <span className={styles.chipsLabel}>Estúdios</span>
            <div className={styles.chipsRow}>
              {anime.Studios.map((studio: string) => (
                <span key={studio} className={styles.studioChip}>
                  {studio}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`${styles.statCard} ${styles.statusCard} ${anime.StatusFinished ? styles.finished : styles.ongoing}`}
          >
            <span className={styles.statIcon}>
              {anime.StatusFinished ? "✅" : "🔥"}
            </span>
            <div className={styles.statusInfo}>
              <span className={styles.statLabel}>Status</span>
              <span className={styles.statValue}>
                {anime.StatusFinished
                  ? "Anime Finalizado"
                  : "Anime Em andamento"}
              </span>
            </div>
          </div>
        </section>

        <section className={styles.ninjaSection}>
          <h2 className={styles.ninjaTitle}>
            <span>🏮</span> Opinião do Ninja
          </h2>
          <p className={styles.opinionText}>
            <br />
            {anime.opinionNinja
              ? anime.opinionNinja
              : "O Ninja ainda está avaliando este pergaminho... 🥷 🔍"}
          </p>
        </section>
      </div>
    </main>
  );
}
