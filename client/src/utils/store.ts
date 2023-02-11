import { create } from "zustand";

export type FileWithProgress = File & { progress: number };

interface State {
  filesToUpload: FileWithProgress[];

  isOpenUploadModal: boolean;

  isOpenNoteModal: boolean;
}

interface Actions {
  addFilesToUpload: (files: FileList | null) => void;
  removeFileToUpload: (file: FileWithProgress) => void;
  clearFilesToUpload: () => void;
  setFileUploadProgress: (file: FileWithProgress, progress: number) => void;

  setIsOpenUploadModal: (show: boolean) => void;

  setIsOpenNoteModal: (show: boolean) => void;
}

export const useStore = create<State & Actions>()((set, get) => ({
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
        (file) => file.name !== fileToRemove.name
      ),
    }));
  },
  clearFilesToUpload: () => {
    set(() => ({ filesToUpload: [] }));
  },
  setFileUploadProgress: (fileToChange, progress) => {
    set((state) => ({
      filesToUpload: state.filesToUpload.map((file) => {
        if (file.name !== fileToChange.name) return file;

        const changedFile = new File([fileToChange], fileToChange.name, {
          type: fileToChange.type,
        }) as FileWithProgress;
        changedFile.progress = progress;

        return changedFile;
      }),
    }));
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
