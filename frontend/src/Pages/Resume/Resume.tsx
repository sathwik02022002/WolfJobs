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
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <ResumeDropzone
          onFileUpload={(acceptedFiles) => setFile(acceptedFiles[0])}
        />
        <div className="flex flex-row gap-4 mt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
          >
            Upload Resume
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex-1 px-4 py-2 font-bold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>

        {resumeName && (
          <div className="mt-6">
            <p className="text-gray-700">Current Resume: <strong>{resumeName}</strong></p>
            <div className="flex flex-row gap-4 mt-4">
              <a
                href={`/resumeviewer/${userId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 text-center"
              >
                View
              </a>
              <button
                onClick={() => window.history.back()}
                className="flex-1 px-4 py-2 font-bold text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resume;