import React, { useState } from 'react';
import axios from 'axios';
import ResumeDropzone from '../../components/Resume/ResumeDropzone';

// Assuming you have a type for the resume data
type ResumeData = {
  filename: string;
  url: string; // URL to access the resume
};

const Resume: React.FC = () => {
  // State to store the uploaded file
  const [file, setFile] = useState<File | null>(null);

  // State to store the current resume
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);

  // Fetch and display the current resume when the component mounts
  // For now, we'll mock this with a placeholder PDF URL
  useState(() => {
    const fetchCurrentResume = async () => {
      // Replace with your actual fetch logic here
      const mockResumeData: ResumeData = {
        filename: 'current_resume.pdf',
        url: '/path/to/current_resume.pdf', // Mock URL
      };
      setCurrentResume(mockResumeData);
    };

    fetchCurrentResume();
  });

  // Function to handle file submission
  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);

      try {
        // Replace with your actual endpoint
        const response = await axios.post('/fake-upload-endpoint', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle the response accordingly
        if (response.status === 200) {
          console.log('Resume uploaded successfully');
          // Update the current resume state if needed
        }
      } catch (error) {
        console.error('Error uploading the resume', error);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-1/3">
          <ResumeDropzone onFileUpload={(acceptedFiles) => setFile(acceptedFiles[0])} />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded"
          >
            Upload Resume
          </button>
          {currentResume && (
            <div className="mt-4">
              <p>Current Resume: {currentResume.filename}</p>
              <a href={currentResume.url} target="_blank" rel="noopener noreferrer">
                View / Download
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Resume;
