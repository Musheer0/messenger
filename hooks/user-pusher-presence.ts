import { create } from 'zustand';

interface StringArrayStore {
  items: string[];
  setItems: (newItems: string[]) => void;
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
}

const usePresence = create<StringArrayStore>((set) => ({
  items: [],

  // Set the entire array of strings
  setItems: (newItems) => set({ items: newItems }),

  // Add a new item to the array if it doesn't already exist
  addItem: (item) => 
    set((state) => ({
      items: state.items.includes(item) ? state.items : [...state.items, item],
    })),

  // Remove an item from the array
  removeItem: (item) =>
    set((state) => ({
      items: state.items.filter((i) => i !== item),
    })),
}));

export default usePresence;
