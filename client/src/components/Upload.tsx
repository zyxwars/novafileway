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
          // TODO: send as form data
          filesToUpload.forEach((file) => {
            fetch("http://localhost:8080/files", {
              method: "POST",
              body: file,
              headers: {
                "content-type": file.type,
                "content-length": `${file.size}`,
              },
            });
          });
        }}
      >
        Upload
      </button>
    </div>
  );
};
