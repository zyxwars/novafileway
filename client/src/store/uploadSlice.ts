import { StateCreator, create } from "zustand";
import { StoreState } from "./store";
import { Axios, AxiosProgressEvent } from "axios";

// Needed as the same file uploaded twice is not considered equal
const getFileId = (file: File) => {
  return file.name;
};

// TODO: Check proper interface naming
export interface FileToUpload {
  data: File;
  id: string;
  isUploadQueued: boolean;
}

type UploadFn = (file: FileToUpload) => any;

export interface UploadSlice {
  filesToUpload: FileToUpload[];
  currentUploadFileId: string | null;
  uploadProgress: AxiosProgressEvent | null;
  uploadAbortController: AbortController;
  noteText: string;

  addFilesToUpload: (files: FileList | null) => void;
  removeFileToUpload: (id: string) => void;
  startUpload: (uploadFn: UploadFn, queueFiles?: boolean) => void;
  finishUpload: (uploadFn: UploadFn) => void;
  closeUploadModal: () => void;
  setUploadProgress: (uploadProgress: AxiosProgressEvent) => void;
  abortUpload: () => void;
  setNoteText: (noteText: string) => void;
}

export const createUploadSlice: StateCreator<
  StoreState,
  [],
  [],
  UploadSlice
> = (set, get) => ({
  filesToUpload: [],
  currentUploadFileId: null,
  uploadProgress: null,
  uploadAbortController: new AbortController(),
  noteText: "",

  addFilesToUpload: (files) => {
    if (!files) return;

    let newFiles = Array.from(files);

    // Don't add files that are already added
    newFiles = newFiles.filter(
      (fileToAdd) =>
        !get().filesToUpload.find((file) => file.id === getFileId(fileToAdd))
    );

    // Add required fields
    const newFilesMapped: FileToUpload[] = newFiles.map((file) => ({
      data: file,
      id: getFileId(file),
      isBeingUploaded: false,
      isUploadQueued: false,
    }));

    set((state) => ({
      filesToUpload: [...state.filesToUpload, ...newFilesMapped],
    }));
  },
  removeFileToUpload: (id) => {
    if (id === get().currentUploadFileId) get().abortUpload();

    set((state) => ({
      filesToUpload: state.filesToUpload.filter((file) => file.id !== id),
    }));
  },
  closeUploadModal: () => {
    get().abortUpload();
    set(() => ({ filesToUpload: [], isOpenUploadModal: false }));
  },
  startUpload: (uploadFn, queueFiles = true) => {
    // If there are no files to upload close the modal
    if (get().filesToUpload.length === 0) {
      get().closeUploadModal();
      return;
    }

    if (queueFiles)
      set((state) => ({
        filesToUpload: state.filesToUpload.map((file) => ({
          ...file,
          isUploadQueued: true,
        })),
      }));

    // Start new upload if there is no ongoing upload
    if (get().currentUploadFileId) return;

    const firstToUpload = get().filesToUpload.find(
      (file) => file.isUploadQueued
    );
    // Exit if there are not queued files
    if (!firstToUpload) return;

    set({ currentUploadFileId: firstToUpload.id, uploadProgress: null });
    uploadFn(firstToUpload);
  },
  finishUpload: (uploadFn) => {
    // Remove uploaded file and start next upload
    set((state) => ({
      currentUploadFileId: null,
      filesToUpload: state.filesToUpload.filter(
        (file) => file.id !== state.currentUploadFileId
      ),
    }));

    get().startUpload(uploadFn);
  },
  setUploadProgress: (uploadProgress) => {
    set({ uploadProgress: uploadProgress });
  },
  abortUpload: () => {
    set((state) => {
      state.uploadAbortController.abort();
      return { uploadAbortController: new AbortController() };
    });
  },
  setNoteText: (noteText) => {
    set({
      noteText,
    });
  },
});
