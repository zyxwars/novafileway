import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Needed as the same file uploaded twice is not considered equal
const getFileId = (file: File) => {
  return file.name;
};

// TODO: Check proper interface naming
export interface SelectedFile {
  data: File;
  id: string;
  isBeingUploaded: boolean;
  isUploadQueued: boolean;
}

interface State {
  selectedFiles: SelectedFile[];
  uploadProgress: number;
}

export const useUploadStore = create<State>()(
  devtools((set, get) => ({
    selectedFiles: [],
    uploadProgress: 0,
  }))
);
