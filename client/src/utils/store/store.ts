import { create } from "zustand";
import { UploadSlice, createUploadSlice } from "./uploadSlice";
import { UiSlice, createUiSlice } from "./uiSlice";

// const generateId = (file: File) => {
//   return file.name;
// };

// // TODO: Check proper interface naming
// export interface IUploadableFile {
//   data: File;
//   id: string;
//   uploadProgress?: number;
//   isBeingUploaded: boolean;
//   isUploadQueued: boolean;
// }

// interface State {
//   filesToUpload: IUploadableFile[];
//   isUploading: boolean;

//   isOpenUploadModal: boolean;
//   isOpenNoteModal: boolean;
// }

// interface Actions {
//   // File upload
//   addFilesToUpload: (files: FileList | null) => void;
//   removeFileToUpload: (
//     id: string,
//     isBeingUploaded?: boolean,
//     abortController?: AbortController
//   ) => void;
//   // TODO: Add abort controller
//   removeAllFilesToUpload: () => void;
//   queueFilesToUpload: () => void;
//   setFileUploadProgress: (
//     id: string,
//     uploadProgress: number | undefined
//   ) => void;
//   setUploading: (id: string) => void;
//   setFree: () => void;

//   // Ui
//   setIsOpenUploadModal: (show: boolean) => void;
//   setIsOpenNoteModal: (show: boolean) => void;
// }

// export const useStore = create<State & Actions>()(
//   devtools((set, get) => ({
//     filesToUpload: [],
//     isUploading: false,
//     addFilesToUpload: (files) => {
//       if (!files) return;

//       let filesToAdd = Array.from(files);

//       // Don't add files that are already added
//       filesToAdd = filesToAdd.filter(
//         (fileToAdd) =>
//           !get().filesToUpload.find((file) => file.id === generateId(fileToAdd))
//       );

//       // Add required fields
//       const filesToAddComplete: IUploadableFile[] = filesToAdd.map((file) => ({
//         data: file,
//         id: generateId(file),
//         isBeingUploaded: false,
//         isUploadQueued: false,
//       }));

//       set((state) => ({
//         filesToUpload: [...state.filesToUpload, ...filesToAddComplete],
//       }));
//     },
//     removeFileToUpload: (id, isBeingUploaded, abortController) => {
//       if (isBeingUploaded) {
//         abortController?.abort();
//       }

//       set((state) => ({
//         filesToUpload: state.filesToUpload.filter((file) => file.id !== id),
//       }));
//     },
//     removeAllFilesToUpload: () => {
//       set(() => ({ filesToUpload: [] }));
//     },
//     queueFilesToUpload: () => {
//       set((state) => ({
//         filesToUpload: state.filesToUpload.map((file) => ({
//           ...file,
//           isUploadQueued: true,
//         })),
//       }));
//     },
//     setUploading: (id) => {
//       set((state) => ({
//         filesToUpload: state.filesToUpload.map((file) => {
//           if (file.id !== id) return file;

//           return { ...file, isBeingUploaded: true };
//         }),
//         isUploading: true,
//       }));
//     },
//     setFree: () => {
//       set((state) => ({ isUploading: false }));
//     },
//     setFileUploadProgress: (id, uploadProgress) => {
//       set((state) => ({
//         filesToUpload: state.filesToUpload.map((file) => {
//           if (file.id !== id) return file;

//           return { ...file, uploadProgress };
//         }),
//       }));
//     },

//     isOpenUploadModal: false,
//     setIsOpenUploadModal: (show: boolean) => {
//       set({ isOpenUploadModal: show });
//     },

//     isOpenNoteModal: false,
//     setIsOpenNoteModal: (show: boolean) => {
//       set({ isOpenNoteModal: show });
//     },
//   }))
// );

// This is named StoreState so that the auto import doesn't conflict with zustand State import
export type StoreState = UploadSlice & UiSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createUploadSlice(...a),
  ...createUiSlice(...a),
}));
