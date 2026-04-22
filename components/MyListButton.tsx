import Link from "next/link";
import styles from "./MyListButton.module.css";

export default function MyListButton() {
  return (
    <Link href="/my-list" className={styles.myListButton}>
      📚 Minhas Listas
    </Link>
  );
}
