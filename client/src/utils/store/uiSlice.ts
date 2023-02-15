import { StateCreator } from "zustand";
import { StoreState } from "./store";

export interface UiSlice {
  isOpenUploadModal: boolean;
  isOpenNoteModal: boolean;

  setIsOpenUploadModal: (show: boolean) => void;
  setIsOpenNoteModal: (show: boolean) => void;
}

export const createUiSlice: StateCreator<StoreState, [], [], UiSlice> = (
  set
) => ({
  isOpenUploadModal: false,
  isOpenNoteModal: false,

  setIsOpenUploadModal: (show: boolean) => {
    set({ isOpenUploadModal: show });
  },
  setIsOpenNoteModal: (show: boolean) => {
    set({ isOpenNoteModal: show });
  },
});
