import React, { useState } from "react";
import axios from "axios";
import ResumeDropzone from "../../components/Resume/ResumeDropzone";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-toastify";

const Resume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const resumeName = useUserStore((state) => state.resume);
  const userId = useUserStore((state) => state.id);
  const updateResume = useUserStore((state) => state.updateResume);
  const updateResumeId = useUserStore((state) => state.updateResumeId);

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("id", userId);

      try {
        const response = await axios.post(
          "http://localhost:8000/users/uploadresume",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          console.log("Resume uploaded successfully");
          toast.success("Resume Uploaded Successfully. Sign out and sign back in to see changes!");
        }
      } catch (error) {
        console.error("Error uploading the resume", error);
        toast.error("Resume could not be uploaded");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-1/3">
          <ResumeDropzone
            onFileUpload={(acceptedFiles) => setFile(acceptedFiles[0])}
          />
          <div className="flex flex-row">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded"
            >
              Upload Resume
            </button>
            <button
    onClick={() => window.history.back()}
    className="px-4 py-2 mt-4 font-bold text-white bg-gray-500 rounded"
  >
    Cancel
  </button>
          </div>

          {resumeName && (
            <div className="mt-4 flex flex-row items-center gap-4">
              <p>Current Resume: {resumeName}</p>
              <a
                href={`/resumeviewer/${userId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded"
              >
                View
              </a>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 mt-2 font-bold text-white bg-gray-500 rounded"
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Resume;