import Anime from "@/interfaces/Anime";
import UsersRegister from "@/interfaces/UsersRegister";
import UsersLogin from "@/interfaces/UsersLogin";
import InsertAnimes from "@/interfaces/InsertAnimes";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.ninjaanimes.com.br/api";

export const animeService = {
  async getAllAnimes(): Promise<Anime[]> {
    const resposta = await fetch(`${BASE_URL}/get-anime`);

    if (!resposta.ok)
      throw new Error("Erro ao buscar os animes no banco de dados!");

    const dados = await resposta.json();

    return Array.isArray(dados) ? dados : dados.animeSearch || [];
  },

  async getAnimeById(id: number): Promise<Anime> {
    const resposta = await fetch(`${BASE_URL}/get-anime/${id}`);
    return resposta.json();
  },

  async getCategoryAnimeById(id: number): Promise<Anime> {
    const resposta = await fetch(`${BASE_URL}/animes/category/${id}`);
    return resposta.json();
  },

  async insertAnimes(
    insertAnime: Partial<InsertAnimes>,
  ): Promise<InsertAnimes> {
    const resposta = await fetch(`${BASE_URL}/send-anime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "YUZZOSUPERADMINLASTCHANCE",
      },
      body: JSON.stringify(insertAnime),
    });

    if (!resposta.ok) {
      throw new Error("Não foi possivel enviar o anime para o banco!");
    }

    return await resposta.json();
  },
};

export const passwordService = {
  async esqueciSenha(email: string, user: string): Promise<{ resetToken: string }> {
    const resposta = await fetch(`${BASE_URL}/esqueci-senha`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, user }),
    });

    if (!resposta.ok) throw new Error("Credenciais não encontradas na base Ninja.");

    return await resposta.json();
  },

  async redefinirSenha(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    const resposta = await fetch(`${BASE_URL}/redefinir-senha`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    if (!resposta.ok) throw new Error("Token inválido ou expirado.");

    return await resposta.json();
  },
};

export const usersService = {
  async postUserRegister(
    userData: Partial<UsersRegister>,
  ): Promise<UsersRegister> {
    const resposta = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!resposta.ok)
      throw new Error("Não foi possivel conectar ao banco de dados!");

    return await resposta.json();
  },

  async postUserLogin(userData: Partial<UsersLogin>): Promise<UsersLogin> {
    const resposta = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!resposta.ok)
      throw new Error("Não foi possivel conectar ao banco de dados!");

    return await resposta.json();
  },
};
