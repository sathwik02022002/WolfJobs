import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { Button, Stack } from "@mui/material";
import { AiFillCheckCircle } from "react-icons/ai";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type FormValuesQuestions = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
};

type FormValuesDetails = {
  role: string;
  jobtype: string;
  location: string;
  pay: string;
  description: string;
  requiredSkills: string;
};

const JobPreview = () => {
  const location = useLocation();
  const { state } = location;
  const {
    details,
    questions,
  }: { details: FormValuesDetails; questions: FormValuesQuestions } = state;

  const navigate = useNavigate();
  const userId = useUserStore((state) => state.id);

  const onSubmit = (e: any) => {
    e.preventDefault();

    const url = `http://localhost:8000/api/v1/users/createjob`;
    const body = {
      id: userId,
      name: details.role,
      type: details.jobtype,
      location: details.location,
      description: details.description,
      pay: details.pay,
      question1: questions.question1,
      question2: questions.question2,
      question3: questions.question3,
      question4: questions.question4,
      requiredSkills: details.requiredSkills,
    };

    axios.post(url, body).then((res) => {
      if (res.status !== 200) {
        toast.error("Job posting failed");
        return;
      }
      toast.success("Job created");
      navigate("/dashboard");
    });
  };

  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <div
      className="flex flex-col items-center min-h-screen py-10"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl flex">
        <div className="w-1/3 pr-8 border-r">
          <h2 className="text-2xl font-semibold mb-6">Create New Job Listing</h2>
          <div className="flex flex-col space-y-4">
            <StepIndicator label="Add Details" completed />
            <StepIndicator label="Fill Questionnaire" completed />
            <StepIndicator label="Preview" active />
            <StepIndicator label="Confirm" />
          </div>
        </div>

        <div className="w-2/3 pl-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Job Details</h2>
          <div className="space-y-2 text-gray-700">
            <div>
              <span className="font-semibold">Role:</span> {details.role}
            </div>
            <div>
              <span className="font-semibold">Job Status:</span>{" "}
              <span className="capitalize text-green-500">open</span>
            </div>
            <div>
              <span className="font-semibold">Type:</span> {details.jobtype.replace("-", " ")}
            </div>
            <div>
              <span className="font-semibold">Location:</span> {details.location}
            </div>
            <div>
              <span className="font-semibold">Pay:</span> {details.pay}$/hr
            </div>
          </div>

          <h2 className="text-lg font-bold mt-6 mb-2 border-b pb-2">Description</h2>
          <p className="text-gray-600 mb-4">{details.description}</p>

          <h2 className="text-lg font-bold mt-6 mb-2 border-b pb-2">Required Skills</h2>
          <p className="text-gray-600 mb-4">{details.requiredSkills}</p>

          <h2 className="text-lg font-bold mt-6 mb-2 border-b pb-2">Questions</h2>
          <div className="text-gray-600 space-y-2">
            <div>1: {questions.question1}</div>
            <div>2: {questions.question2}</div>
            <div>3: {questions.question3}</div>
            <div>4: {questions.question4}</div>
          </div>

          <Stack direction="row" spacing={2} className="mt-6">
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              style={{
                color: "#FF5353",
                borderColor: "#FF5353",
                textTransform: "none",
                fontSize: "16px",
                minWidth: "100px",
              }}
            >
              Back
            </Button>
            <Button
              onClick={onSubmit}
              type="submit"
              variant="contained"
              style={{
                background: "#FF5353",
                color: "#FFF",
                textTransform: "none",
                fontSize: "16px",
                minWidth: "200px",
              }}
            >
              Add Listing
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};

// Helper component for each step indicator
const StepIndicator = ({ label, active = false, completed = false }) => (
  <div
    className={`flex items-center space-x-2 ${
      active ? "text-gray-800" : completed ? "text-green-600" : "text-gray-400"
    }`}
  >
    <AiFillCheckCircle
      size="20px"
      color={active ? "#1E1E1E" : completed ? "#008000" : "#CBCBCB"}
    />
    <span className={`text-lg ${active ? "font-semibold" : ""}`}>{label}</span>
  </div>
);

export default JobPreview;