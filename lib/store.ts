import { create } from 'zustand';

export const LOCAL_STORAGE_KEY_LIKED = 'liked';
export const LOCAL_STORAGE_KEY_DISLIKED = 'disliked';

type RepurposedStore = {
  liked: Set<number>;
  disliked: Set<number>;
  _updateLiked: (liked: Set<number>) => void;
  _updateDisliked: (disliked: Set<number>) => void;
  addLiked: (liked: number) => void;
  addDisliked: (disliked: number) => void;
  removeLiked: (likedId: number) => void;
  removeDisliked: (disliked: number) => void;
};

export const useRepurposedStore = create<RepurposedStore>((set, get) => ({
  liked: new Set(),
  disliked: new Set(),
  _updateLiked: (liked) => {
    set(() => ({ liked }));
    localStorage.setItem(LOCAL_STORAGE_KEY_LIKED, JSON.stringify([...liked.values()]));
  },
  _updateDisliked: (disliked) => {
    set(() => ({ disliked }));
    localStorage.setItem(LOCAL_STORAGE_KEY_DISLIKED, JSON.stringify([...disliked.values()]));
  },
  addLiked: (liked) => {
    get()._updateLiked(new Set([...get().liked, liked]));
  },
  addDisliked: (disliked) => get()._updateDisliked(new Set([...get().disliked, disliked])),
  removeLiked: (likedId) => {
    const liked = get().liked;
    if (liked.delete(likedId)) get()._updateLiked(new Set([...liked]));
  },
  removeDisliked: (disliked) => get()._updateDisliked(new Set([...get().disliked, disliked]))
}));
