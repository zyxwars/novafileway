import { StateCreator } from "zustand";
import { StoreState } from "./store";

export interface UiSlice {
  isOpenUploadModal: boolean;
  isOpenNoteModal: boolean;
  isDeleting: boolean;

  setIsOpenUploadModal: (show: boolean) => void;
  setIsOpenNoteModal: (show: boolean) => void;
  setIsDeleting: (show: boolean) => void;
}

export const createUiSlice: StateCreator<StoreState, [], [], UiSlice> = (
  set
) => ({
  isOpenUploadModal: false,
  isOpenNoteModal: false,
  isDeleting: false,

  setIsOpenUploadModal: (show) => {
    set({ isOpenUploadModal: show });
  },
  setIsOpenNoteModal: (show) => {
    set({ isOpenNoteModal: show });
  },
  setIsDeleting: (show) => {
    set({ isDeleting: show });
  },
});
