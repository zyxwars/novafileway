import { useState } from "react";

export const Upload = () => {
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  return (
    <input
      type="file"
      multiple
      directory=""
      webkitdirectory=""
      mozdirectory=""
    />
  );
};
