import React from "react";
import { useQuery } from "react-query";

export const Files = () => {
  const {
    isLoading,
    error,
    data: files,
  } = useQuery({
    queryKey: ["files"],
    queryFn: () =>
      fetch("http://127.0.0.1:8080/files").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  console.log(files);

  return (
    <>
      {files.map((file) => (
        <h1 key={file.id}>{file.originalname}</h1>
      ))}
    </>
  );
};
