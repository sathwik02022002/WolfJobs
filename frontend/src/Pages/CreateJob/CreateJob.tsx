import { useState } from "react";
import { useNavigate } from "react-router";
import { AiFillCheckCircle } from "react-icons/ai";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

type FormValues = {
  role: string;
  jobtype: string;
  location: string;
  pay: string;
  requiredSkills: string;
  description: string;
};

const CreateJob = () => {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    defaultValues: {
      role: "",
      jobtype: "full-time",
      location: "",
      pay: "",
      description: "",
      requiredSkills: "",
    },
  });

  const { register, handleSubmit, formState, setValue } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    navigate("/job_questionnaire", {
      state: data,
    });
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
            <StepIndicator label="Add Details" active />
            <StepIndicator label="Fill Questionnaire" />
            <StepIndicator label="Preview" />
            <StepIndicator label="Confirm" />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={4}>
            <QuestionCard>
              <TextField
                label="Job Role"
                type="text"
                fullWidth
                {...register("role", {
                  required: "Job role is required",
                })}
                error={!!errors.role}
                helperText={errors.role?.message}
              />
            </QuestionCard>

            <QuestionCard>
              <FormControl fullWidth>
                <InputLabel id="job-type-label">Job Type</InputLabel>
                <Select
                  {...register("jobtype", {
                    required: "Job type is required",
                  })}
                  labelId="job-type-label"
                  label="Job Type"
                  defaultValue="full-time"
                  onChange={(e: SelectChangeEvent) => setValue("jobtype", e.target.value)}
                >
                  <MenuItem value="full-time">Full Time</MenuItem>
                  <MenuItem value="part-time">Part Time</MenuItem>
                </Select>
              </FormControl>
            </QuestionCard>

            <QuestionCard>
              <TextField
                label="Location"
                type="text"
                fullWidth
                {...register("location", {
                  required: "Location is required",
                })}
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            </QuestionCard>

            <QuestionCard>
              <TextField
                label="Pay"
                type="number"
                fullWidth
                {...register("pay", {
                  required: "Job pay is required",
                })}
                error={!!errors.pay}
                helperText={errors.pay?.message}
              />
            </QuestionCard>

            <QuestionCard>
              <TextField
                label="Job Description"
                type="text"
                fullWidth
                multiline
                minRows={3}
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </QuestionCard>

            <QuestionCard>
              <TextField
                label="Required Skills"
                type="text"
                fullWidth
                {...register("requiredSkills", {
                  required: "Skills are required",
                })}
                error={!!errors.requiredSkills}
                helperText={errors.requiredSkills?.message}
              />
            </QuestionCard>

            <div className="flex justify-center">
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
const StepIndicator = ({ label, active = false }) => (
  <div className={`flex items-center space-x-2 ${active ? "text-gray-800" : "text-gray-400"}`}>
    <AiFillCheckCircle size="20px" color={active ? "#1E1E1E" : "#CBCBCB"} />
    <span className={`text-lg ${active ? "font-semibold" : ""}`}>{label}</span>
  </div>
);

// Helper component for each question card
const QuestionCard = ({ children }) => (
  <div className="bg-white p-4 rounded-md border border-gray-300 shadow-sm">
    {children}
  </div>
);

export default CreateJob;
