import { create } from "zustand";

const useContentStore = create((set) => ({
  contentType: "movies",
  setContentType: (type) => set({ contentType: type }),
}));

export default useContentStore;
