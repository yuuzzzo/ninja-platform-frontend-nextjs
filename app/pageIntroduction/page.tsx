import Image from "next/image";

export default function pageIntroduction() {
  return (
    <main className="containerEntrada">
      <div className="iconEntrada">
        <Image
          src={"/icon_entrada.png"}
          width={800}
          height={500}
          alt="Icon entrada plataforma"
        />
      </div>
      <div className="tituloEntrada">
        <h1>Ninja Animes Plataforma 🥷🏻</h1>
      </div>
      <br />
      <div className="sobreEntrada">
        <p>
          Saudações, Genin!! Bem-vindo ao nosso Dojo dos Animes! Aqui, o mestre
          Ninja (sim, eu!) vai te recomendar as melhores obras que já passaram
          pelo meu radar, não importa a categoria. Mas preste atenção nas regras
          do dojo: tudo o que você ler aqui — das notas às opiniões — é o meu
          veredito oficial. Nada de copiar de outros pergaminhos pela internet!
          Tudo foi escrito de coração, com sinceridade implacável e, lógico,
          regado a umas piadinhas ninjas, rs. Divirta-se, meu Genin! E aí, está
          pronto para embarcar nessa jornada ou vai ficar de fora?
        </p>
      </div>
      <div className="buttonsRedirectEntrada"></div>
    </main>
  );
}
