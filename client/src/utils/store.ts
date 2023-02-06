import { create } from "zustand";

interface State {
  filesToUpload: File[];
  addFilesToUpload: (files: FileList | null) => void;
  removeFileToUpload: (file: File) => void;
  clearFilesToUpload: () => void;
}

export const useStore = create<State>()((set, get) => ({
  filesToUpload: [],
  addFilesToUpload: (files) => {
    if (!files) return;

    const fileArray = Array.from(files);
    // Filter out already inputted files
    // So we can use file.name as a key when rendering
    fileArray.filter(
      (fileToAdd) =>
        !get().filesToUpload.find((file) => file.name === fileToAdd.name)
    );

    set((state) => ({ filesToUpload: [...state.filesToUpload, ...fileArray] }));
  },
  removeFileToUpload: (fileToRemove) => {
    set((state) => ({
      filesToUpload: state.filesToUpload.filter(
        (file) => file !== fileToRemove
      ),
    }));
  },
  clearFilesToUpload: () => {
    set(() => ({ filesToUpload: [] }));
  },
}));