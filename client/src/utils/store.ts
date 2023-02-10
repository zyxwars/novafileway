import { create } from "zustand";

interface State {
  filesToUpload: File[];
  addFilesToUpload: (files: FileList | null) => void;
  removeFileToUpload: (file: File) => void;
  clearFilesToUpload: () => void;
  cancelFileUpload: () => void;

  isOpenUploadModal: boolean;
  setIsOpenUploadModal: (show: boolean) => void;

  isOpenNoteModal: boolean;
  setIsOpenNoteModal: (show: boolean) => void;
}

export const useStore = create<State>()((set, get) => ({
  filesToUpload: [],
  addFilesToUpload: (files) => {
    if (!files) return;

    let fileArray = Array.from(files);
    // Filter out already inputted files
    // So we can use file.name as a key when rendering
    fileArray = fileArray.filter(
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
  cancelFileUpload: () => {
    get().clearFilesToUpload();
    get().setIsOpenUploadModal(false);
  },
  isOpenUploadModal: false,
  setIsOpenUploadModal: (show: boolean) => {
    set({ isOpenUploadModal: show });
  },

  isOpenNoteModal: false,
  setIsOpenNoteModal: (show: boolean) => {
    set({ isOpenNoteModal: show });
  },
}));
