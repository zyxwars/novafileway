import { StateCreator, create } from "zustand";
import { StoreState } from "./store";

// Needed as the same file uploaded twice is not considered equal
const getFileId = (file: File) => {
  return file.name;
};

// TODO: Check proper interface naming
export interface SelectedFile {
  data: File;
  id: string;
  isUploadQueued: boolean;
}

type UploadFn = (file: SelectedFile) => any;

export interface UploadSlice {
  selectedFiles: SelectedFile[];
  uploadingFileId: string | null;
  uploadProgress: number;
  uploadAbortController: AbortController;

  addFiles: (files: FileList | null) => void;
  removeFile: (id: string) => void;
  startUpload: (uploadFn: UploadFn, queueFiles?: boolean) => void;
  finishUpload: (uploadFn: UploadFn) => void;
  closeUploadModal: () => void;
  setUploadProgress: (uploadProgress: number) => void;
  abortUpload: () => void;
}

export const createUploadSlice: StateCreator<
  StoreState,
  [],
  [],
  UploadSlice
> = (set, get) => ({
  selectedFiles: [],
  uploadingFileId: null,
  uploadProgress: 0,
  uploadAbortController: new AbortController(),

  addFiles: (files) => {
    if (!files) return;

    let newFiles = Array.from(files);

    // Don't add files that are already added
    newFiles = newFiles.filter(
      (fileToAdd) =>
        !get().selectedFiles.find((file) => file.id === getFileId(fileToAdd))
    );

    // Add required fields
    const newFilesMapped: SelectedFile[] = newFiles.map((file) => ({
      data: file,
      id: getFileId(file),
      isBeingUploaded: false,
      isUploadQueued: false,
    }));

    set((state) => ({
      selectedFiles: [...state.selectedFiles, ...newFilesMapped],
    }));
  },
  removeFile: (id) => {
    if (id === get().uploadingFileId) get().abortUpload();

    set((state) => ({
      selectedFiles: state.selectedFiles.filter((file) => file.id !== id),
    }));
  },
  closeUploadModal: () => {
    get().abortUpload();
    set(() => ({ selectedFiles: [], isOpenUploadModal: false }));
  },
  startUpload: (uploadFn, queueFiles = true) => {
    if (queueFiles)
      set((state) => ({
        selectedFiles: state.selectedFiles.map((file) => ({
          ...file,
          isUploadQueued: true,
        })),
      }));

    // Start new upload if there is no ongoing upload
    if (get().uploadingFileId) return;

    const firstToUpload = get().selectedFiles.find(
      (file) => file.isUploadQueued
    );
    // Exit if there are not queued files
    if (!firstToUpload) return;

    set({ uploadingFileId: firstToUpload.id, uploadProgress: 0 });
    uploadFn(firstToUpload);
  },
  finishUpload: (uploadFn) => {
    // Remove uploaded file and start next upload
    set((state) => ({
      uploadingFileId: null,
      selectedFiles: state.selectedFiles.filter(
        (file) => file.id !== state.uploadingFileId
      ),
    }));

    get().startUpload(uploadFn);
  },
  setUploadProgress: (uploadProgress) => {
    set({ uploadProgress });
  },
  abortUpload: () => {
    set((state) => {
      state.uploadAbortController.abort();
      return { uploadAbortController: new AbortController() };
    });
  },
});
