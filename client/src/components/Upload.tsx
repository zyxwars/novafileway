import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { UploadFileCard } from "./UploadFileCard";

export const Upload = () => {
  const queryClient = useQueryClient();

  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  const handleUpload = () => {
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
  };

  return (
    <div className="w-full grid grid-flow-row">
      <div className="bg-white w-full h-full flex justify-center items-center flex-col">
        <div className="w-full h-60 relative flex justify-center items-center">
          <input
            className="absolute left-0 top-0 w-full h-full opacity-25"
            type="file"
            multiple
            // directory=""
            // webkitdirectory=""
            // mozdirectory=""
            onChange={(e) => {
              const fileArray = e.target.files
                ? Array.from(e.target.files)
                : [];
              setFilesToUpload(fileArray);
            }}
          />
          <div className="">Drag and drop files</div>
        </div>

        <Button className="w-full" onClick={handleUpload}>
          Upload
        </Button>
      </div>

      {filesToUpload.map((file) => (
        <UploadFileCard file={file} />
      ))}
    </div>
  );
};
