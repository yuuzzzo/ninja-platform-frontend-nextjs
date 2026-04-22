export type AnimeListType = "WANT_TO_WATCH" | "WATCHED" | "LIKED" | "DISLIKED";

export interface UserAnimeListItem {
  id: number;
  userId: number;
  animeId: number;
  listType: AnimeListType;
  createdAt: string;
  updatedAt: string;
  anime?: {
    id: number;
    title: string;
    capeImage: string;
    average: string;
    categoryId: number | null;
  };
}
