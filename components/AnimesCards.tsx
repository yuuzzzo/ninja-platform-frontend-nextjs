import Image from "next/image";
import styles from "./animesCards.module.css";
import Link from "next/link";

interface AnimeProps {
  anime: {
    id: number;
    title: string;
    synopisis: string;
    average: string;
    capeImage: string;
  };
}

export default function AnimesCards({ anime }: AnimeProps) {
  return (
    <article className={styles.card}>
      <div className={styles.average}>
        ⭐ {Number(anime.average).toFixed(1)}
      </div>

      <div className={styles.imageWrapper}>
        <Image
          src={anime.capeImage}
          alt={anime.title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          priority={false}
        />
      </div>

      <div className={styles.info}>
        <h2 className={styles.title}>{anime.title}</h2>
        <p className={styles.synopsis}>{anime.synopisis}</p>
      </div>

      <div className={styles.containerButton}>
        <Link
          href={`/animes/category/description/${anime.id}`}
          className={styles.linkWrapper}
        >
          <button className={styles.buttonForm}>Ver pergaminho</button>
        </Link>
      </div>
    </article>
  );
}
