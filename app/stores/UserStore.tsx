import { create } from 'zustand';

export interface ApiUser {
  readonly id: number;
  readonly name: string;
  readonly email: string;
}

export type UserStore = {
  readonly userId: number;
  readonly loggedIn: boolean;
  setUserId: (newUserId: number) => void;
  increment: () => void;
  decrement: () => void;
};

// --- Setup zustand for local state (counter representing userId) ---
export const useUserStore = create<UserStore>((set, get) => ({
  userId: 1,
  loggedIn: false,
  setUserId: (newUserId: number) => set({ userId: newUserId }),
  increment: () => set({ userId: get().userId + 1 }),
  decrement: () => set({ userId: get().userId > 1 ? get().userId - 1 : 1 }),
}));

// Simulate an API call that fetches user data based on userId.
export const fetchUser = async (userId: number): Promise<ApiUser> => {
  // Simulate network latency.

  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (userId == 3) {
    return Promise.reject(new Error('User not found'));
  } else
    return {
      id: userId,
      name: `User ${userId}`,
      email: `user${userId}@example.com`,
    };
};
