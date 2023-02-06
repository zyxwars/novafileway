import { useState } from "react";
import { motion } from "framer-motion";
import { Modal } from "./Modal";

export const UploadModal = () => {
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);

  const [showUpload, setShowUpload] = useState(false);

  // const handleUpload = () => {
  //   filesToUpload.forEach((file) => {
  //     // TODO: get progress

  //     const formData = new FormData();
  //     formData.append("file", file);

  //     axios.postForm("http://127.0.0.1:8080/files", formData, {
  //       onUploadProgress: (e) => {
  //         console.log(e);
  //       },
  //     });
  //   });

  // TODO: Pack into mutation after progress bar is done
  // TODO: Invalidate after await all queries?, use the mutation?

  const handleAddFiles = (files: FileList | null) => {
    const fileArray = files ? Array.from(files) : [];
    setFilesToUpload(fileArray);
  };

  return (
    <Modal>
      <div
        className="grid h-full w-full grid-flow-row"
        style={{ gridTemplateRows: "4rem 1fr 0.5rem 4rem" }}
      >
        {/* TODO: Pass clicks through? */}
        <div></div>
        <motion.div
          className="flex min-h-0 w-full flex-grow flex-col bg-zinc-900"
          // initial={{ y: "100vh" }}
          // animate={{ y: "0" }}
          // exit={{}}
          // transition={{ type: "spring", duration: 1 }}
        >
          <div className="flex w-full flex-grow flex-col overflow-y-auto px-4">
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
              necessitatibus architecto harum vel nisi maxime doloribus a
              excepturi quam tempore, odio et mollitia nam ut expedita maiores
              sit eaque corrupti. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Hic Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Hic Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Hic Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Hic Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Hic Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Hic Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Hic Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Hic Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Hic Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Hic necessitatibus architecto harum vel nisi
              maxime doloribus a excepturi quam tempore, odio et mollitia nam ut
              expedita maiores sit eaque corrupti. necessitatibus architecto
              harum vel nisi maxime doloribus a excepturi quam tempore, odio et
              mollitia nam ut expedita maiores sit eaque corrupti.
              necessitatibus architecto harum vel nisi maxime doloribus a
              excepturi quam tempore, odio et mollitia nam ut expedita maiores
              sit eaque corrupti. necessitatibus architecto harum vel nisi
              maxime doloribus a excepturi quam tempore, odio et mollitia nam ut
              expedita maiores sit eaque corrupti. necessitatibus architecto
              harum vel nisi maxime doloribus a excepturi quam tempore, odio et
              mollitia nam ut expedita maiores sit eaque corrupti.
              necessitatibus architecto harum vel nisi maxime doloribus a
              excepturi quam tempore, odio et mollitia nam ut expedita maiores
              sit eaque corrupti. necessitatibus architecto harum vel nisi
              maxime doloribus a excepturi quam tempore, odio et mollitia nam ut
              expedita maiores sit eaque corrupti. necessitatibus architecto
              harum vel nisi maxime doloribus a excepturi quam tempore, odio et
              mollitia nam ut expedita maiores sit eaque corrupti.
              necessitatibus architecto harum vel nisi maxime doloribus a
              excepturi quam tempore, odio et mollitia nam ut expedita maiores
              sit eaque corrupti. necessitatibus architecto harum vel nisi
              maxime doloribus a excepturi quam tempore, odio et mollitia nam ut
              expedita maiores sit eaque corrupti.
            </div>
            {/* {filesToUpload.map((file, i) => (
              <div className="mb-4 flex flex-none items-center rounded-sm bg-zinc-800 p-3 font-semibold text-white first:mt-4">
                <div className="flex-1">{file.name}</div>
                <div className="flex-none pl-2">
                  <span className="material-symbols-outlined rounded-sm bg-zinc-900 p-2">
                    close
                  </span>
                </div>
              </div>
            ))} */}
          </div>
        </motion.div>

        <div className="bg-gradient-to-r from-cyan-500 to-blue-500"></div>

        <div className="flex items-center justify-end bg-zinc-900 px-4">
          <button className="rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 py-2 px-4 text-lg font-semibold text-white ">
            Upload
          </button>
        </div>
      </div>
    </Modal>
  );
};

{
}
