import { create } from "zustand";

type FileWithProgress = File & { progress?: number };

interface State {
  filesToUpload: FileWithProgress[];
  addFilesToUpload: (files: FileList | null) => void;
  removeFileToUpload: (file: FileWithProgress) => void;
  clearFilesToUpload: () => void;
  cancelFileUpload: () => void;
  setUploadProgress: (file: FileWithProgress, progress: number) => void;

  isOpenUploadModal: boolean;
  setIsOpenUploadModal: (show: boolean) => void;

  isOpenNoteModal: boolean;
  setIsOpenNoteModal: (show: boolean) => void;
}

export const useStore = create<State>()((set, get) => ({
  filesToUpload: [],
  addFilesToUpload: (files) => {
    if (!files) return;

    // TODO: Ugly hack
    let fileArray = Array.from(files) as FileWithProgress[];
    fileArray.forEach((file) => (file.progress = 0));
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
  setUploadProgress: (fileToChange, progress) => {
    const file = get().filesToUpload.find(
      (file) => file.name === fileToChange.name
    );
    // The file was probably removed before it finished uploading
    if (!file) return;
    // TODO: Ugly hack
    file.progress = progress;

    // Force reload the state with the new progress value
    set((state) => ({ filesToUpload: [...state.filesToUpload] }));
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
