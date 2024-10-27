import { useNavigate } from "react-router-dom";
import { login } from "../../deprecateded/auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

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

const LoginPage = () => {
  const navigate = useNavigate();
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");

  const form = useForm<FormValues>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await login(data.email, data.password);

      if (response.success) {
        if (response.userId) {
          setUserId(response.userId);        // Store user ID for OTP verification
          setShowOtpInput(true);             // Show OTP input form
          await sendOtpEmail(response.userId); // Send OTP email
        } else {
          setMessage("Login failed, user ID not found.");
        }
      } else {
        setMessage("Login failed, please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Login failed, please try again.");
    }
  };

  const sendOtpEmail = async (userId: string) => {
    try {
      const response = await axios.post('/api/v1/users/generate-Otp', { userId });
      console.log("OTP Send Response:", response);

      if (response.data && response.data.success) {
        setMessage("OTP sent to your email. Please check your inbox.");
      } else {
        setMessage("Failed to send OTP, please try again.");
      }
    } catch (error) {
      console.error("OTP sending failed:", error);
      setMessage("Failed to send OTP, please try again.");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/users/verify-otp', { userId, otp });
      if (response.data.success) {
        setMessage("OTP verified, redirecting...");
        navigate('/dashboard'); // Redirect upon successful OTP verification
      } else {
        setMessage("OTP verification failed, please try again.");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      setMessage("OTP verification failed, please try again.");
    }
  };

  return (
    <>
      <div className="mx-auto bg-slate-50 content flex flex-col justify-center items-center">
        <div className="p-4 border rounded bg-white">
          <div className="text-xl justify-center text-black mb-4">
            {showOtpInput ? "Enter OTP" : "Sign In to your Account"}
          </div>
          {!showOtpInput ? (
            // Login Form
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2} width={400}>
                <TextField
                  label="Email Id"
                  type="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
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
                  label="Password"
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{
                    "& label": {
                      paddingLeft: (theme) => theme.spacing(1),
                    },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{
                    background: "#FF5353",
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  Login
                </Button>
              </Stack>
            </form>
          ) : (
            // OTP Form
            <form onSubmit={handleOtpSubmit} noValidate>
              <Stack spacing={2} width={400}>
                <TextField
                  label="Enter OTP"
                  type="text"
                  value={otp} // No fallback value needed
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  sx={{
                    "& label": { paddingLeft: (theme) => theme.spacing(1) },
                    "& input": { paddingLeft: (theme) => theme.spacing(2.5) },
                    "& fieldset": {
                      paddingLeft: (theme) => theme.spacing(1.5),
                      borderRadius: "10px",
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{
                    borderRadius: "10px",
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  Verify OTP
                </Button>
              </Stack>
            </form>
          )}
          {message && <p>{message}</p>}
          {!showOtpInput && (
            <>
              <div className="mx-auto"></div>
              <br />
              <div className="mv-1 border-t mx-16" />
              <div className="flex justify-center">
                <p className="-mt-3 bg-white px-3 text-[#CCCCCC]">OR</p>
              </div>
              <br />
              <p
                className="text-[#656565] text-center"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Create a new account
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LoginPage;