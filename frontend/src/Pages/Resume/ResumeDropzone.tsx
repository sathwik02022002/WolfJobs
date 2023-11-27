import React, { useCallback } from 'react';
import { useDropzone, DropzoneOptions, FileRejection } from 'react-dropzone';

const ResumeDropzone: React.FC = () => {
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    // Handle accepted files
    console.log(acceptedFiles);

    // Handle any file rejections
    fileRejections.forEach((file) => {
      console.error(`File rejected: ${file.file.name}`);
    });
  }, []);

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: {  "application/pdf": [".pdf"] },
    maxSize: 15 * 1024 * 1024, // limit the size to 15mb max to agree with the backend
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropzoneOptions);

  return (
    <div {...getRootProps()} className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p className="text-gray-700">Drop the files here ...</p> :
          <p className="text-gray-700">Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );
};

export default ResumeDropzone;
