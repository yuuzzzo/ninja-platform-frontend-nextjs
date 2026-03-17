"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./BackButton.module.css";

interface BackButtonProps {
  href: string;
  label?: string;
}

export default function BackButton({ href, label = "Voltar" }: BackButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleClick() {
    if (isLoading) return;
    setIsLoading(true);
    router.push(href);
  }

  return (
    <button
      onClick={handleClick}
      className={`${styles.backButton} ${isLoading ? styles.loading : ""}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className={styles.spinner} />
      ) : (
        <span className={styles.arrow}>←</span>
      )}
      <span className={styles.label}>
        {isLoading ? "Voltando..." : label}
      </span>
    </button>
  );
}
