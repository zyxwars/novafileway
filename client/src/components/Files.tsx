import React from "react";
import { useQuery } from "react-query";
import { IFile } from "../types";
import { Button, Card, CardBody, CardFooter } from "@chakra-ui/react";

export const Files = () => {
  const {
    isLoading,
    error,
    data: files,
  } = useQuery<IFile[]>({
    queryKey: ["files"],
    queryFn: () =>
      fetch("http://127.0.0.1:8080/files").then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  if (!files) return <div>No files</div>;

  return (
    <div>
      {files.map((file) => (
        <Card key={file.id}>
          <CardBody>{file.originalname}</CardBody>
        </Card>
      ))}
    </div>
  );
};
