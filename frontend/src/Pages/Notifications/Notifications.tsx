import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useJobStore } from '../../store/JobStore';
import { useApplicationStore } from '../../store/ApplicationStore';
import JobListTile from '../../components/Job/JobListTile';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';

const Notifications = () => {
  const updateJobList = useJobStore((state) => state.updateJobList);
  const jobList = useJobStore((state) => state.jobList);

  const updateApplicationList = useApplicationStore((state) => state.updateApplicationList);
  const applicationList = useApplicationStore((state) => state.applicationList);

  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [isAcceptedVisible, setIsAcceptedVisible] = useState(true);
  const [isRejectedVisible, setIsRejectedVisible] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/users/fetchapplications')
      .then((res) => {
        if (res.status !== 200) {
          toast.error('Error fetching applications');
          return;
        }
        updateApplicationList(res.data.application);
      });

    axios.get('http://localhost:8000/api/v1/users', { params: { page: 1, limit: 25 } })
      .then((res) => {
        if (res.status !== 200) {
          toast.error('Error fetching jobs');
          return;
        }
        updateJobList(res.data.jobs);
      });
  }, []);

  useEffect(() => {
    const acceptedApplications = applicationList.filter(app => app.status === 'accepted');
    const acceptedJobIds = acceptedApplications.map(app => app.jobid);
    const acceptedJobList = jobList.filter(job => acceptedJobIds.includes(job._id));
    setAcceptedJobs(acceptedJobList);

    const rejectedApplications = applicationList.filter(app => app.status === 'rejected');
    const rejectedJobIds = rejectedApplications.map(app => app.jobid);
    const rejectedJobList = jobList.filter(job => rejectedJobIds.includes(job._id));
    setRejectedJobs(rejectedJobList);
  }, [applicationList, jobList]);

  const handleJobClick = (jobId) => {
    navigate('/dashboard', { state: { selectedJobId: jobId } });
  };

  const toggleAcceptedVisibility = () => {
    setIsAcceptedVisible(!isAcceptedVisible);
  };

  const toggleRejectedVisibility = () => {
    setIsRejectedVisible(!isRejectedVisible);
  };

  return (
    <div
      className="notifications-page flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
    >
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
        <NotificationSection
          title="Accepted Jobs"
          jobs={acceptedJobs}
          isVisible={isAcceptedVisible}
          toggleVisibility={toggleAcceptedVisibility}
          handleJobClick={handleJobClick}
        />

        <NotificationSection
          title="Rejected Jobs"
          jobs={rejectedJobs}
          isVisible={isRejectedVisible}
          toggleVisibility={toggleRejectedVisibility}
          handleJobClick={handleJobClick}
        />
      </div>
    </div>
  );
};

// Component for rendering each section (Accepted/Rejected Jobs)
const NotificationSection = ({ title, jobs, isVisible, toggleVisibility, handleJobClick }) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold mb-2 flex items-center justify-between cursor-pointer" onClick={toggleVisibility}>
      {title} ({jobs.length})
      <span>
        {isVisible ? <AiOutlineUp className="text-lg" /> : <AiOutlineDown className="text-lg" />}
      </span>
    </h2>
    {isVisible && (
      <div className="notifications-list">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <div key={job._id} onClick={() => handleJobClick(job._id)} className="mb-2 hover:bg-gray-100 rounded-lg p-2">
              <JobListTile data={job} action="view-details" />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No {title.toLowerCase()} notifications.</p>
        )}
      </div>
    )}
  </div>
);

export default Notifications;