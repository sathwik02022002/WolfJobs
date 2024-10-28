import { useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const JobRating = (props: any) => {
  const { jobData }: { jobData: Job } = props;
  const [displayList, setDisplayList] = useState<Application[]>([]);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null);
  const [interviewEvents, setInterviewEvents] = useState([]);

  const applicationList = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "rating"
      )
    );
  }, [jobData._id, applicationList]);

  const handleAccept = (applicantid: string) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";
    const body = { applicationId: applicantid, status: "accepted" };

    axios.post(url, body).then((res) => {
      if (res.status === 200) {
        toast.success("Accepted candidate");
        location.reload();
      } else {
        toast.error("Failed to accept candidate");
      }
    });
  };

  const handleReject = (applicantid: string) => {
    const url = "http://localhost:8000/api/v1/users/modifyApplication";
    const body = { applicationId: applicantid, status: "rejected" };

    axios.post(url, body).then((res) => {
      if (res.status === 200) {
        toast.success("Rejected candidate");
        location.reload();
      } else {
        toast.error("Failed to reject candidate");
      }
    });
  };

  const openCalendar = (applicant: Application) => {
    setSelectedApplicant(applicant);
    setCalendarOpen(true);
  };

  const scheduleInterview = (slotInfo) => {
    if (!selectedApplicant) return;
    const { start, end } = slotInfo;

    const event = {
      title: `Interview with ${selectedApplicant.applicantname}`,
      start,
      end,
      allDay: false,
    };

    setInterviewEvents([...interviewEvents, event]);
    setCalendarOpen(false);

    const notificationUrl = "http://localhost:8000/api/v1/users/notifyApplicant";
    const notificationData = {
      applicantId: selectedApplicant._id,
      jobId: jobData._id,
      interviewDate: start,
    };

    axios.post(notificationUrl, notificationData).then((res) => {
      if (res.status === 200) {
        toast.success("Interview scheduled, notification sent to applicant");
      } else {
        toast.error("Failed to send notification");
      }
    });
  };

  return (
    <>
      <div className="text-xl">Rating</div>
      {displayList.length === 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {displayList.map((item: Application) => {
        return (
          <div className="p-1" key={item._id}>
            <div className="bg-white my-2 mx-1 p-2 rounded-lg shadow-md">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <div>
                    <span className="font-bold">Name: </span>
                    {item.applicantname}
                  </div>
                  {!!item.phonenumber && <div>Phone: {item.phonenumber}</div>}
                  <div>
                    <span className="font-bold">Email: </span>
                    {item.applicantemail}
                  </div>
                  {!!item.applicantSkills && (
                    <div>
                      <span className="font-bold">Skills: </span>
                      {item.applicantSkills}
                    </div>
                  )}
                  <div>
                    <span className="font-bold">Rating: </span>
                    {item.rating || "0"}
                  </div>
                </div>
                <div className="flex flex-row">
                  <Button
                    onClick={() => openCalendar(item)}
                    style={{ color: "#FF5353" }}
                  >
                    Schedule Interview
                  </Button>
                  <Button
                    onClick={() => handleAccept(item._id)}
                    style={{ color: "#FF5353" }}
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleReject(item._id)}
                    style={{ color: "#FF5353" }}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Dialog open={isCalendarOpen} onClose={() => setCalendarOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Schedule Interview</DialogTitle>
        <DialogContent>
          <Calendar
            localizer={localizer}
            events={interviewEvents}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={scheduleInterview}
            style={{ height: 400 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCalendarOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default JobRating;
