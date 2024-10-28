// src/Pages/Interview/Interview.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApplicationStore } from '../../store/ApplicationStore';
import { useJobStore } from '../../store/JobStore';
import { format } from 'date-fns';

interface Interview {
  applicantId: string;
  jobTitle: string;
  interviewDate: string;
  jobId: string;
}

const Interview = () => {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const navigate = useNavigate();
  const applicationList = useApplicationStore((state) => state.applicationList);
  const jobList = useJobStore((state) => state.jobList);

  // Fetch applications and jobs to gather interview data
  useEffect(() => {
    const fetchInterviewDetails = async () => {
      try {
        const applicationsRes = await axios.get('http://localhost:8000/api/v1/users/fetchapplications');
        if (applicationsRes.status === 200) {
          const updatedApplications = applicationsRes.data.application.filter((app) => app.interviewDate);
          setInterviews(updatedApplications.map((app) => ({
            applicantId: app.applicantid,
            jobTitle: jobList.find((job) => job._id === app.jobid)?.title || 'Job Title',
            interviewDate: app.interviewDate,
            jobId: app.jobid,
          })));
        } else {
          toast.error('Error fetching interviews');
        }
      } catch (error) {
        toast.error('Failed to load interview details');
      }
    };
    fetchInterviewDetails();
  }, [applicationList, jobList]);

  // Redirect to job details on interview item click
  const handleInterviewClick = (jobId: string) => {
    navigate(`/dashboard?jobId=${jobId}`);
  };

  return (
    <div className="interview-page flex items-center justify-center min-h-screen" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Scheduled Interviews</h2>
        {interviews.length > 0 ? (
          <div className="interview-list">
            {interviews.map((interview) => (
              <div
                key={interview.jobId}
                onClick={() => handleInterviewClick(interview.jobId)}
                className="mb-4 p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-200"
              >
                <h3 className="text-lg font-medium">{interview.jobTitle}</h3>
                <p className="text-gray-700">
                  Date: {format(new Date(interview.interviewDate), 'MMMM d, yyyy')}
                </p>
                <p className="text-gray-700">
                  Time: {format(new Date(interview.interviewDate), 'hh:mm a')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No scheduled interviews at this time.</p>
        )}
      </div>
    </div>
  );
};

export default Interview;
