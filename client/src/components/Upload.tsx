import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

export const Upload = () => {
  const queryClient = useQueryClient();

  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  return (
    <div>
      <input
        type="file"
        multiple
        // directory=""
        // webkitdirectory=""
        // mozdirectory=""
        onChange={(e) => {
          const fileArray = e.target.files ? Array.from(e.target.files) : [];
          setFilesToUpload(fileArray);
        }}
      />

      <button
        onClick={() => {
          filesToUpload.forEach((file) => {
            // TODO: get progress

            const formData = new FormData();
            formData.append("file", file);

            axios.postForm("http://127.0.0.1:8080/files", formData, {
              onUploadProgress: (e) => {
                console.log(e);
              },
            });
          });

          // TODO: Pack into mutation after progress bar is done
          // TODO: Invalidate after await all queries?, use the mutation?

          queryClient.invalidateQueries("files");
        }}
      >
        Upload
      </button>
    </div>
  );
};
