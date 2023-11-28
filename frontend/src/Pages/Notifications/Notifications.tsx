import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUserStore } from '../../store/UserStore';
import { useJobStore } from '../../store/JobStore';
import { useApplicationStore } from '../../store/ApplicationStore';
import JobListTile from '../../components/Job/JobListTile';

const Notifications = () => {
  const updateJobList = useJobStore((state) => state.updateJobList);
  const jobList = useJobStore((state) => state.jobList);

  const updateApplicationList = useApplicationStore((state) => state.updateApplicationList);
  const applicationList = useApplicationStore((state) => state.applicationList);

  const [acceptedJobs, setAcceptedJobs] = useState([]);

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
  }, [applicationList, jobList]);

  return (
    <div className="notifications-page">
      <h1>Accepted Job Notifications</h1>
      <div className="notifications-list">
        {acceptedJobs.length > 0 ? (
          acceptedJobs.map(job => (
            <JobListTile key={job._id} data={job} action="view-details" />
          ))
        ) : (
          <p>No accepted job notifications.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
