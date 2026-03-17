import AnimesCards from "@/components/AnimesCards";
import BackButton from "@/components/BackButton";
import styles from "./CategoryCards.module.css";

interface Anime {
  id: number;
  title: string;
  synopisis: string;
  average: string;
  capeImage: string;
}

const CATEGORIES: Record<number, { name: string; icon: string; desc: string }> = {
  1: { name: "Romance",   icon: "🌸", desc: "Aqui é o lugar onde o coração é mais forte que jutsu" },
  2: { name: "Ação",      icon: "🔥", desc: "Arena do dojo, aqui é aonde os mais fortes disputam!" },
  3: { name: "Terror",    icon: "💀", desc: "Vamos ver se sua coragem afasta a névoa sombria deste pergaminho" },
  5: { name: "Isekai",    icon: "🌌", desc: "Fugindo da realidade no estilo ninja que o Dojo ensina" },
  6: { name: "Sports",    icon: "🏐", desc: "Quer ser o melhor? o mais forte?, entre na quadra e que comece os jogos" },
  7: { name: "Clássicos", icon: "📜", desc: "Lugar dos Jounins mais experientes que querem sentir nostalgia dos pergaminhos antigos" },
};

export default async function Category({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `https://api.ninjaanimes.com.br/api/animes/category/${id}`,
  );
  const animes = await response.json();
  const respostaRequest: Anime[] = animes.anime;

  const category = CATEGORIES[Number(id)] ?? {
    name: "Pergaminhos",
    icon: "⚔️",
    desc: "Curadoria selecionada pelo Ninja",
  };

  return (
    <main className={styles.mainWrapper}>
      {/* ── Barra de navegação ── */}
      <div className={styles.topBar}>
        <BackButton href="/generes" label="Categorias" />
      </div>

      {/* ── Header da categoria ── */}
      <header className={styles.categoryHeader}>
        <div className={styles.categoryGlow} />
        <span className={styles.categoryIcon}>{category.icon}</span>
        <div className={styles.categoryText}>
          <h1 className={styles.categoryName}>{category.name}</h1>
          <p className={styles.categoryDesc}>{category.desc}</p>
        </div>
        <div className={styles.categoryCount}>
          <span className={styles.countNumber}>{respostaRequest.length}</span>
          <span className={styles.countLabel}>pergaminhos</span>
        </div>
      </header>

      {/* ── Linha divisória ── */}
      <div className={styles.divider} />

      {/* ── Grid de cards ── */}
      <div className={styles.gridContainer}>
        {respostaRequest.map((anime) => (
          <AnimesCards key={anime.id} anime={anime} />
        ))}
      </div>
    </main>
  );
}
