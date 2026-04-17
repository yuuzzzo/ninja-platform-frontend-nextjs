"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import styles from "./pageIntroduction.module.css";

export default function pageIntroduction() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  return (
    <main className={styles.containerEntrada}>
      <div className={styles.contentCard}>
        <div className={styles.iconEntrada}>
          <img
            src="/kawasaki-seeklogo.png"
            width={520}
            height={164}
            alt="Icon entrada plataforma"
            className={styles.imageLogo}
          />
        </div>
        <div className={styles.tituloEntrada}>
          <h1>☁️ Sobre o Dojo 📜</h1>
        </div>
        <div className={styles.sobreEntrada}>
          <p>
            Saudações, Genin!! Bem-vindo ao nosso Dojo dos Animes! Aqui, o
            mestre Ninja (sim, eu!) vai te recomendar as melhores obras que já
            passaram pelo meu radar, não importa a categoria. Mas preste atenção
            nas regras do dojo: tudo o que você ler aqui — das notas às opiniões
            — é o meu veredito oficial. Nada de copiar de outros pergaminhos
            pela internet! Tudo foi escrito de coração, com sinceridade
            implacável e, lógico, regado a umas piadinhas ninjas, rs.
            Divirta-se, meu Genin!
<br />
<br />
            Se tiver alguma sugestão de obra para nosso Dojo, não se segure, chame o Ninja nesse número +55 (11) 95980-2686 e informe a sua sugestão, estou aqui sempre disponível para ajudar vocês meus pequenos Genins!
          </p>
        </div>
        <div className={styles.buttonsRedirectEntrada}>
          <Link href="/generes" className={styles.buttonDojo}>
            Adentrar ao Dojo
          </Link>
        </div>
      </div>
    </main>
  );
}
