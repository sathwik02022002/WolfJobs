import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-toastify";
import JobsListView from "../../components/Job/JobListView";
import JobDetailView from "../../components/Job/JobDetailView";
import { useJobStore } from "../../store/JobStore";
import { useApplicationStore } from "../../store/ApplicationStore";

const Explore = () => {
  const navigate = useNavigate();

  // Store update functions
  const updateName = useUserStore((state) => state.updateName);
  const updateAddress = useUserStore((state) => state.updateAddress);
  const updateRole = useUserStore((state) => state.updateRole);
  const updateDob = useUserStore((state) => state.updateDob);
  const updateSkills = useUserStore((state) => state.updateSkills);
  const updatePhonenumber = useUserStore((state) => state.updatePhonenumber);
  const updateId = useUserStore((state) => state.updateId);
  const updateAvailability = useUserStore((state) => state.updateAvailability);
  const updateGender = useUserStore((state) => state.updateGender);
  const updateHours = useUserStore((state) => state.updateHours);
  const updateIsLoggedIn = useUserStore((state) => state.updateIsLoggedIn);
  const updateResume = useUserStore((state) => state.updateResume);
  const updateResumeId = useUserStore((state) => state.updateResumeId);
  const updateApplicationList = useApplicationStore((state) => state.updateApplicationList);
  const updateEmail = useUserStore((state) => state.updateEmail);
  const updateJobList = useJobStore((state) => state.updateJobList);
  const jobList = useJobStore((state) => state.jobList);

  // Local state for filtering and sorting jobs
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobList, setFilteredJobList] = useState([]);
  const [sortHighestPay, setSortHighestPay] = useState(false);
  const [sortAlphabeticallyByCity, setSortAlphabeticallyByCity] = useState(false);
  const [sortByEmploymentType, setSortByEmploymentType] = useState(false);
  const [showOpenJobs, setShowOpenJobs] = useState(true);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleSortChange = () => setSortHighestPay(!sortHighestPay);
  const handleSortCityChange = () => setSortAlphabeticallyByCity(!sortAlphabeticallyByCity);
  const handleSortEmploymenyTypeChange = () => setSortByEmploymentType(!sortByEmploymentType);
  const toggleJobStatus = () => setShowOpenJobs(!showOpenJobs);

  // Authenticate user and update store
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const tokenInfo = token.split(".");
      const userInfo = JSON.parse(atob(tokenInfo[1]));

      // Check for user info properties before updating store
      updateName(userInfo.name || "");
      updateEmail(userInfo.email || "");
      updateAddress(userInfo.address || "");
      updateRole(userInfo.role || "");
      updateDob(userInfo.dob || "");
      updateSkills(userInfo.skills || []);
      updatePhonenumber(userInfo.phonenumber || "");
      updateId(userInfo._id || "");
      updateAvailability(userInfo.availability || "");
      updateGender(userInfo.gender || "");
      updateHours(userInfo.hours || 0);
      updateIsLoggedIn(true);
      updateResume(userInfo.resume || "");
      updateResumeId(userInfo.resumeId || "");
    } catch (error) {
      console.error("Error parsing token:", error);
      toast.error("Invalid token. Please log in again.");
      navigate("/login");
    }
  }, []);

  // Fetch applications and jobs
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/users/fetchapplications")
      .then((res) => {
        if (res.status === 200) {
          updateApplicationList(res.data.application || []);
        } else {
          toast.error("Error fetching applications");
        }
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
        toast.error("Error fetching applications");
      });

    axios
      .get("http://localhost:8000/api/v1/users", { params: { page: 1, limit: 25 } })
      .then((res) => {
        if (res.status === 200) {
          updateJobList(res.data.jobs || []);
        } else {
          toast.error("Error fetching jobs");
        }
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        toast.error("Error fetching jobs");
      });
  }, []);

  // Filter and sort job list
  useEffect(() => {
    let updatedList = jobList;

    if (searchTerm) {
      updatedList = updatedList.filter((job) =>
        job.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortHighestPay) {
      updatedList = [...updatedList].sort((a, b) => parseFloat(b.pay) - parseFloat(a.pay));
    }

    if (sortAlphabeticallyByCity) {
      updatedList = [...updatedList].sort((a, b) => a.location.localeCompare(b.location));
    }

    if (sortByEmploymentType) {
      updatedList = [...updatedList].sort((a, b) => a.type.localeCompare(b.type));
    }

    updatedList = updatedList.filter((job) => (showOpenJobs ? job.status === "open" : job.status === "closed"));
    setFilteredJobList(updatedList);
  }, [searchTerm, jobList, sortHighestPay, sortAlphabeticallyByCity, sortByEmploymentType, showOpenJobs]);

  return (
    <>
      <div className="content" style={{ backgroundColor: "rgba(255, 255, 255, 0.6)", minHeight: "100vh" }}>
        <div className="flex flex-col">
          <div className="p-4 search-bar-container">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2"
            />
          </div>
          <div className="flex space-x-2">
            <button onClick={handleSortChange} className="p-2 border rounded bg-white shadow">
              {sortHighestPay ? "Sort by High Pay : On" : "Sort by Highest Pay : Off"}
            </button>
            <button onClick={handleSortCityChange} className="p-2 border rounded bg-white shadow">
              {sortAlphabeticallyByCity ? "Sort by City : On" : "Sort by City : Off"}
            </button>
            <button onClick={handleSortEmploymenyTypeChange} className="p-2 border rounded bg-white shadow">
              {sortByEmploymentType ? "Sort by Employment Type : On" : "Sort by Employment Type : Off"}
            </button>
            <button onClick={toggleJobStatus} className="p-2 border rounded bg-white shadow">
              {showOpenJobs ? "Show Closed Jobs" : "Show Open Jobs"}
            </button>
          </div>
        </div>
        <div className="flex flex-row" style={{ height: "calc(100vh - 72px)" }}>
          <JobsListView jobsList={filteredJobList} />
          <JobDetailView />
        </div>
      </div>
    </>
  );
};

export default Explore;
