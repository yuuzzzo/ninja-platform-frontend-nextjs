import Image from "next/image";
import styles from "./animesCards.module.css";
import { animeService } from "@/services/NinjaApi.service";

export default async function AnimesCards() {
  const listaAnimes = await animeService.getAllAnimes();

  return (
    <>
      {listaAnimes.map((anime) => (
        <article key={anime.id} className={styles.card}>
          <p className={styles.average}>⭐ {anime.average}</p>
          <div className={styles.imageWrapper}>
            <Image
              src={anime.capeImage}
              alt={anime.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
              priority={false}
            />
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>{anime.title}</h2>
            <p className={styles.synopsis}>{anime.synopisis}</p>
          </div>
        </article>
      ))}
    </>
  );
}
