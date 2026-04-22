import BackButton from "@/components/BackButton";
import MyListButton from "@/components/MyListButton";
import styles from "../../[id]/CategoryCards.module.css";
import CategorySearch from "../../[id]/CategorySearch";

interface Anime {
  id: number;
  title: string;
  synopisis: string;
  average: string;
  capeImage: string;
}

const CATEGORIE: Record<number, { name: string; icon: string; desc: string }> =
  {
    8: {
      name: "Todos os Pergaminhos",
      icon: "🥷🏼",
      desc: "Para aqueles Genins que são ambiciosos e querem explorar todos os pergaminhos disponíveis, aqui você encontrará uma seleção completa de histórias e lutas de todos os tipos de ninjutsus.",
    },
  };

export default async function AllAnimes({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const response = await fetch(`https://api.ninjaanimes.com.br/api/get-anime`);
  const animes = await response.json();
  const respostaRequest: Anime[] = animes.animeSearch;

  const category = CATEGORIE[Number(id)] ?? {};

  return (
    <main className={styles.mainWrapper}>
      <div className={styles.topBar}>
        <BackButton href="/generes" label="Categorias" />
        <MyListButton />
      </div>

      <header className={styles.categoryHeader}>
        <div className={styles.categoryGlow} />
        <span className={styles.categoryIcon}>{category.icon}</span>
        <div className={styles.categoryText}>
          <h1 className={styles.categoryName}>{category.name}</h1>
          <p className={styles.categoryDesc}>{category.desc}</p>
        </div>
        <div className={styles.categoryCount}>
          <span className={styles.countNumber}>{respostaRequest.length}</span>
          <span className={styles.countLabel}>Pergaminhos</span>
        </div>
      </header>
      <div className={styles.divider} />
      <CategorySearch animes={respostaRequest} />
    </main>
  );
}
