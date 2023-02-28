import { create } from "zustand";
import { UploadSlice, createUploadSlice } from "./uploadSlice";
import { UiSlice, createUiSlice } from "./uiSlice";

// This is named "StoreState" so that the auto import doesn't conflict with zustand "State" import
export type StoreState = UploadSlice & UiSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createUploadSlice(...a),
  ...createUiSlice(...a),
}));
