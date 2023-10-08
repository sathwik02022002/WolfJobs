import { useNavigate } from "react-router-dom";
import { InputLabel } from "../../../core/components/inputLabel";
import { useLoginStore } from "../controller/loginController";
import { login } from "../../../core/auth";

export function LoginPage() {
  const email = useLoginStore((state) => state.email);
  const password = useLoginStore((state) => state.password);

  const updateEmail = useLoginStore((state) => state.updateEmail);
  const updatePassword = useLoginStore((state) => state.updatePassword);
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full pt-4">
        <div className="p-4 m-1 flex flex-col  w-96 mx-auto my-auto border rounded">
          <div className="flex text-4xl justify-center text-red-400 mb-2 ">
            Login
          </div>
          <InputLabel title="Email" />
          <input
            className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
            onChange={(e) => {
              updateEmail(e.target.value);
            }}
            value={email}
            type="email"
          />

          <InputLabel title="Password" />
          <input
            className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
            onChange={(e) => {
              updatePassword(e.target.value);
            }}
            value={password}
            type="password"
          />

          <button
            className="mx-1 my-2 py-1 bg-red-400 rounded text-white text-xl hover:bg-red-500/90"
            onClick={(e) => {
              e.preventDefault();
              // TODO show error message
              login(email, password, navigate);
            }}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}
