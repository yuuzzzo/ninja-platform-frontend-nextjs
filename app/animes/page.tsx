import AnimesCards from "@/components/AnimesCards";
import styles from "./Page.module.css";

export default function AnimesPage() {
  return (
    <main className={styles.mainContainer}>
      <header className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Explorar Animes</h1>
      </header>
      <section className={styles.containerAnimes}>
        <AnimesCards />
      </section>
    </main>
  );
}
