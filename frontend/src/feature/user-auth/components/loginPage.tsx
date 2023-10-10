import { useNavigate } from "react-router-dom";
import { login } from "../../../core/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, TextField, Button } from "@mui/material";
// import { DevTool } from "@hookform/devtools";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup
    .string()
    .email("Email format is not valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export function LoginPage() {
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });
  // const { control } = form;
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("form submitted");
    console.log(data);
    login(data.email, data.password, navigate);
  };

  return (
    <>
      <div className="w-full pt-4">
        <div className="p-4 m-1 flex flex-col  w-96 mx-auto my-auto border rounded">
          <div className="flex text-4xl justify-center text-red-400 mb-2 ">
            Login
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2} width={400}>
              <TextField
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Stack>
          </form>
        </div>
      </div>
      {/* <DevTool control={control}></DevTool> */}
    </>
  );
}
