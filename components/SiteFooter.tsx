import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.divider} />

      <div className={styles.mainLine}>
        <span className={styles.katana}>⚔️</span>
        <p className={styles.rights}>
          Todos os direitos reservados ao mestre{" "}
          <span className={styles.author}>Ninja Yuri Dev</span>
        </p>
        <span className={styles.katana}>⚔️</span>
      </div>

      <span className={styles.seal}>
        ⛩ Dojo Ninja — Curadoria Premium de Animes ⛩
      </span>
    </footer>
  );
}
