import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";

type FormValues = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
};

const JobQuestionnaire = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    defaultValues: {
      question1: "",
      question2: "",
      question3: "",
      question4: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    const body = {
      state: {
        details: state,
        questions: data,
      },
    };
    navigate("/job_preview", body);
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen py-10"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.6)" }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <div className="border-b pb-4 mb-6">
          <h2 className="text-3xl font-semibold mb-2 text-gray-800">Create New Job Listing</h2>
          <div className="flex space-x-6 mt-2">
            <StepIndicator label="Add Details" completed />
            <StepIndicator label="Fill Questionnaire" active />
            <StepIndicator label="Preview" />
            <StepIndicator label="Confirm" />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={4}>
            <QuestionCard>
              <TextField
                label="Question 1"
                type="text"
                fullWidth
                {...register("question1", {
                  required: "This question is required",
                })}
                error={!!errors.question1}
                helperText={errors.question1?.message}
              />
            </QuestionCard>

            <QuestionCard>
              <TextField
                label="Question 2"
                type="text"
                fullWidth
                {...register("question2", {
                  required: "This question is required",
                })}
                error={!!errors.question2}
                helperText={errors.question2?.message}
              />
            </QuestionCard>

            <QuestionCard>
              <TextField
                label="Question 3"
                type="text"
                fullWidth
                {...register("question3", {
                  required: "This question is required",
                })}
                error={!!errors.question3}
                helperText={errors.question3?.message}
              />
            </QuestionCard>

            <QuestionCard>
              <TextField
                label="Question 4"
                type="text"
                fullWidth
                {...register("question4", {
                  required: "This question is required",
                })}
                error={!!errors.question4}
                helperText={errors.question4?.message}
              />
            </QuestionCard>

            <div className="flex justify-between">
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
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#FF5353",
                  color: "#FFF",
                  fontSize: "16px",
                  width: "200px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#FF4343",
                  },
                }}
              >
                Proceed
              </Button>
            </div>
          </Stack>
        </form>
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

// Helper component for each question card
const QuestionCard = ({ children }) => (
  <div className="bg-white p-4 rounded-md border border-gray-300 shadow-sm">
    {children}
  </div>
);

export default JobQuestionnaire;
