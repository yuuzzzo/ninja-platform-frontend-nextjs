import Anime from "@/interfaces/Anime";
import UsersRegister from "@/interfaces/UsersRegister";
import UsersLogin from "@/interfaces/UsersLogin";

const BASE_URL = "https://ninja-platform-backend.onrender.com/api";

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
