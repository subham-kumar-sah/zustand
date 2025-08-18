import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  addHabit: (name: string, frequency: "daily" | "weekly") => void;
  removeHabit?: (id: string) => void;
  toggleHabbit?: (id: string, date: string) => void;
  fetchHabits?: () => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}
const useHabbitStore = create<HabitState>()(
  devtools(
    persist(
      (set, get) => {
        return {
          habits: [],
          addHabit: (name, frequency) => {
            set((state) => {
              return {
                habits: [
                  ...state.habits,
                  {
                    id: Date.now().toString(),
                    name,
                    frequency,
                    completedDates: [],
                    createdAt: new Date().toISOString(),
                  },
                ],
              };
            });
          },
          removeHabit: (id) => {
            set((state) => {
              return {
                habits: state.habits.filter((habit) => habit.id !== id),
              };
            });
          },
          toggleHabbit: (id, date) => {
            set((state) => {
              return {
                habits: state.habits.map((habit) =>
                  habit.id === id
                    ? {
                        ...habit,
                        completedDates: habit.completedDates.includes(date)
                          ? habit.completedDates.filter((d) => d !== date)
                          : [...habit.completedDates, date],
                      }
                    : habit
                ),
              };
            });
          },
          fetchHabits: async () => {
            set({ isLoading: true, error: null });
            try {
              const currentHabits = get().habits;
              if (currentHabits.length > 0) {
                set({ habits: currentHabits, isLoading: false });
                return;
              }
              await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate API call
              const mockedHabits: Habit[] = [
                {
                  id: "1",
                  name: "Exercise",
                  frequency: "daily",
                  completedDates: ["2023-10-01", "2023-10-02"],
                  createdAt: "2023-10-01T00:00:00Z",
                },
                {
                  id: "2",
                  name: "Read a book",
                  frequency: "weekly",
                  completedDates: ["2023-10-01"],
                  createdAt: "2023-10-01T00:00:00Z",
                },
              ];
              set({ habits: mockedHabits, isLoading: false });
            } catch (error) {
              console.error("Failed to fetch habits:", error);
              set({ error: "Failed to fetch habits", isLoading: false });
            }
          },
        };
      },
      {
        name: "habit-store", // unique name for the storage
        storage: createJSONStorage(() => localStorage), // use localStorage as the storage
      }
    )
  )
);

export default useHabbitStore;
