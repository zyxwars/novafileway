import { useState } from "react";

export const Upload = () => {
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

            fetch("http://localhost:8080/files", {
              method: "POST",
              body: formData,
            });
          });
        }}
      >
        Upload
      </button>
    </div>
  );
};
