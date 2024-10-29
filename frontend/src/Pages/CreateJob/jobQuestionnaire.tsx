import { Button, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

type FormValues = {
  questions: string[];
};

const JobQuestionnaire = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([""]);

  const form = useForm<FormValues>({
    defaultValues: {
      questions: questions,
    },
  });

  const { control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    const body = {
      state: {
        details: state,
        questions: {
          questions: data.questions,
        },
      },
    };
    // console.log(questions)
    navigate("/job_preview", body);
    
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="flex flex-row">
      <div
        className="w-3/12 pt-10 border-r"
        style={{ height: "calc(100vh - 72px)" }}
      >
        <div className="text-2xl translate-x-10">Create New Job Listing</div>
        <div className="flex flex-col items-start ml-10 mt-10">
          {["Add details", "Fill Questionnaire", "Preview", "Confirm"].map(
            (step, idx) => (
              <div key={idx} className="inline-flex items-center flex-row">
                <AiFillCheckCircle
                  color={idx === 0 ? "#008000" : idx === 1 ? "#1E1E1E" : "#CBCBCB"}
                  size="20px"
                />
                <span
                  className={`ml-2 text-xl ${idx === 0 ? "text-[#008000]" : idx === 1 ? "text-[#1E1E1E]" : "text-[#CBCBCB]"
                    }`}
                >
                  {step}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      <div
        className="w-9/12 pt-10 pl-10"
        style={{ height: "calc(100vh - 72px)" }}
      >
        <div className="text-2xl translate-x-10">Fill Questionnaire</div>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="m-4 mx-10">
          <Stack spacing={2} width={600}>
            {questions.map((question, index) => (
              <Controller
                key={index}
                name={`questions.${index}`}
                control={control}
                defaultValue={question}
                rules={{ required: "Question is required" }}
                render={({ field }) => (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <TextField
                      {...field}
                      label={`Question ${index + 1}`}
                      fullWidth
                      error={!!errors.questions?.[index]}
                      helperText={errors.questions?.[index]?.message}
                      sx={{
                        "& label": { paddingLeft: (theme) => theme.spacing(1) },
                        "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                        "& fieldset": {
                          paddingLeft: (theme) => theme.spacing(1.5),
                          borderRadius: "10px",
                        },
                      }}
                    />
                    {questions.length > 1 && (
                      <Button
                        onClick={() => removeQuestion(index)}
                        variant="outlined"
                        color="error"
                      >
                        Delete
                      </Button>
                    )}
                  </Stack>
                )}
              />
            ))}
            <Button
              onClick={addQuestion}
              variant="outlined"
              style={{
                color: "#1E1E1E",
                borderColor: "#1E1E1E",
                textTransform: "none",
                fontSize: "16px",
                minWidth: "200px",
              }}
            >
              Add Question
            </Button>
            <Stack direction="row" spacing={2}>
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
            </Stack>
          </Stack>
        </form>
      </div>
    </div>
  );
};

export default JobQuestionnaire;
