import { Button, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

type FormValues = {
  // question1: string;
  // question2: string;
  // question3: string;
  // question4: string;
  questions: string[];
};

const JobQuestionnaire = () => {
  const location = useLocation();
  const { state } = location;

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([""]);

  // const form = useForm<FormValues>({
  //   defaultValues: {
  //     question1: "",
  //     question2: "",
  //     question3: "",
  //     question4: "",
     
  //   },
  // });
  const form = useForm<FormValues>({
    defaultValues: {
      questions: questions,
    },
  });

  // const { register, handleSubmit, formState } = form;
  const { control, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    const body = {
      state: {
        details: state,
        questions: {
          // question1: data.question1,
          // question2: data.question2,
          // question3: data.question3,
          // question4: data.question4,
          questions: data.questions,
        },
      },
    };
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
    <>
      <div className="flex flex-row">
        <div
          className="w-3/12  pt-10 border-r"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <div className="text-2xl  translate-x-10">Create New Job Listing</div>
          <div className="flex flex-col items-start  ml-10  mt-10 ">
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#008000" size="20px" />
              <span className="ml-2 text-xl text-[#008000]">Add details</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">
                Fill Questionnaire
              </span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">Preview</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">Confirm</span>
            </div>
          </div>
        </div>
        <div
          className="w-9/12 pt-10 pl-10"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <div className="text-2xl translate-x-10">Fill Questionnaire</div>
          <div className="flex flex-col">
            {/* <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="m-4 mx-10"
            >
              <Stack spacing={2} width={600}>
                <TextField
                  label="Question 1"
                  type="text"
                  {...register("question1", {
                    required: "Question is required",
                  })}
                  error={!!errors.question1}
                  helperText={errors.question1?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                <TextField
                  label="Question 2"
                  type="text"
                  {...register("question2", {
                    required: "Question is required",
                  })}
                  error={!!errors.question2}
                  helperText={errors.question2?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                <TextField
                  label="Question 3"
                  type="text"
                  {...register("question3", {
                    required: "Question is required",
                  })}
                  error={!!errors.question3}
                  helperText={errors.question3?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                <TextField
                  label="Question 4"
                  type="text"
                  {...register("question4", {
                    required: "Question is required",
                  })}
                  error={!!errors.question4}
                  helperText={errors.question4?.message}
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                </Stack>
                <Stack spacing={2} width={600} marginTop={4}>
                <Button
                  type="submit"
                  variant="outlined"
                  style={{
                    color: "#FF5353",
                    borderColor: "#FF5353",
                    textTransform: "none",
                    fontSize: "16px",
                    minWidth: "200px",
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
                marginBottom: "16px",
              }}
            >
              Back
            </Button>
              </Stack>
            </form> */}
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
                          "& fieldset": { paddingLeft: (theme) => theme.spacing(1.5), borderRadius: "10px" },
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

              <Button
                type="submit"
                variant="outlined"
                style={{
                  color: "#FF5353",
                  borderColor: "#FF5353",
                  textTransform: "none",
                  fontSize: "16px",
                  minWidth: "200px",
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
                  marginBottom: "16px",
                }}
              >
                Back
              </Button>
            </Stack>
          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobQuestionnaire;
