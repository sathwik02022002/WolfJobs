// src/Pages/Interview/Interview.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApplicationStore } from '../../store/ApplicationStore';
import { useJobStore } from '../../store/JobStore';
import { format } from 'date-fns';
import { Button } from '@mui/material';

interface Interview {
  _id: string;
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

  // Fetch applications with "interview_scheduled" status and associated jobs
  const fetchInterviewDetails = async () => {
    try {
      const applicationsRes = await axios.get('http://localhost:8000/api/v1/users/fetchapplications');
      if (applicationsRes.status === 200) {
        // Filter applications based on "interview_scheduled" status
        const updatedApplications = applicationsRes.data.application.filter((app) => app.status === "interview_scheduled");
        
        // Map applications to include job title, interview date, etc.
        setInterviews(updatedApplications.map((app) => ({
          _id: app._id,
          applicantId: app.applicantid,
          jobTitle: jobList.find((job) => job._id === app.jobid)?.name || 'Job Title',
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

  useEffect(() => {
    fetchInterviewDetails();
  }, [applicationList, jobList]);

  // Redirect to job details on interview item click
  const handleInterviewClick = (jobId: string) => {
    navigate(`/dashboard?jobId=${jobId}`);
  };

  // Accept interview
  const handleAcceptInterview = async (interviewId: string) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/users/acceptInterview`, {
        applicationId: interviewId,
      });
      if (res.status === 200) {
        toast.success("Interview accepted!");
        setInterviews(interviews.filter((interview) => interview._id !== interviewId));
      } else {
        toast.error("Failed to accept interview.");
      }
    } catch (error) {
      toast.error("Error while accepting the interview.");
    }
  };

  // Decline interview
  const handleDeclineInterview = async (interviewId: string) => {
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/users/declineInterview`, {
        applicationId: interviewId,
      });
      if (res.status === 200) {
        toast.success("Interview declined and moved to rejected.");
        setInterviews(interviews.filter((interview) => interview._id !== interviewId));
      } else {
        toast.error("Failed to decline interview.");
      }
    } catch (error) {
      toast.error("Error while declining the interview.");
    }
  };

  return (
    <div className="interview-page flex items-center justify-center min-h-screen" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}>
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Scheduled Interviews</h2>
        {interviews.length > 0 ? (
          <div className="interview-list">
            {interviews.map((interview) => (
              <div
                key={interview._id}
                className="mb-4 p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-200"
              >
                <h3 className="text-lg font-medium">{interview.jobTitle}</h3>
                <p className="text-gray-700">
                  Date: {format(new Date(interview.interviewDate), 'MMMM d, yyyy')}
                </p>
                <p className="text-gray-700">
                  Time: {format(new Date(interview.interviewDate), 'hh:mm a')}
                </p>
                <div className="flex justify-end mt-3 space-x-3">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAcceptInterview(interview._id)}
                    style={{ backgroundColor: "#4CAF50", color: "#fff" }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDeclineInterview(interview._id)}
                    style={{ borderColor: "#FF5353", color: "#FF5353" }}
                  >
                    Decline
                  </Button>
                </div>
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
