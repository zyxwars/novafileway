import { StateCreator } from "zustand";
import { StoreState } from "./store";

export interface UiSlice {
  isOpenUploadModal: boolean;
  isOpenNoteModal: boolean;
  isDeleting: boolean;
  isFilesAndNotesEmpty: boolean;
  isDownloadInline: boolean;

  setIsOpenUploadModal: (isOpenUploadModal: boolean) => void;
  setIsOpenNoteModal: (isOpenNoteModal: boolean) => void;
  setIsDeleting: (isDeleting: boolean) => void;
  setIsFilesAndNotesEmpty: (isFilesAndNotesEmpty: boolean) => void;
  setIsDownloadInline: (isDownloadInline: boolean) => void;
}

export const createUiSlice: StateCreator<StoreState, [], [], UiSlice> = (
  set
) => ({
  isOpenUploadModal: false,
  isOpenNoteModal: false,
  isDeleting: false,
  isFilesAndNotesEmpty: false,
  isDownloadInline: true,

  setIsOpenUploadModal: (isOpenUploadModal) => {
    set({ isOpenUploadModal });
  },
  setIsOpenNoteModal: (isOpenNoteModal) => {
    set({ isOpenNoteModal });
  },
  setIsDeleting: (isDeleting) => {
    set({ isDeleting });
  },
  setIsFilesAndNotesEmpty: (isFilesAndNotesEmpty) =>
    set({ isFilesAndNotesEmpty }),
  setIsDownloadInline: (isDownloadInline) => set({ isDownloadInline }),
});
