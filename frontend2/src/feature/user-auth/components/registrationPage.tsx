import { InputLabel } from "../../../core/forms/inputRow";
import { useRegistrationStore } from "../controller/registrationController";

export function RegistrationPage() {
  const name = useRegistrationStore((state) => state.name);
  const email = useRegistrationStore((state) => state.email);
  const password = useRegistrationStore((state) => state.password);
  const confirmPassword = useRegistrationStore(
    (state) => state.confirmPassword
  );
  const role = useRegistrationStore((state) => state.role);

  const updateName = useRegistrationStore((state) => state.updateName);
  const updateEmail = useRegistrationStore((state) => state.updateEmail);
  const updatePassword = useRegistrationStore((state) => state.updatePassword);
  const updateConfirmPassword = useRegistrationStore(
    (state) => state.updateConfirmPassword
  );
  const updateRole = useRegistrationStore((state) => state.updateRole);

  return (
    <>
      <form>
        <div className="w-full pt-4">
          <div className="p-4 m-1 flex flex-col  w-96 mx-auto my-auto border rounded">
            <div className="flex text-4xl justify-center text-red-400 mb-2 ">
              Registration
            </div>

            <InputLabel title="Name" />
            <input
              className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
              onChange={(e) => {
                updateName(e.target.value);
              }}
              value={name}
              type="text"
            />

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

            <InputLabel title="Confirm Password" />
            <input
              className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
              onChange={(e) => {
                updateConfirmPassword(e.target.value);
              }}
              value={confirmPassword}
              type="password"
            />

            <InputLabel title="Role" />
            <select
              value={role}
              onChange={(e) => {
                updateRole(e.target.value);
              }}
              className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
            >
              <option value="Manager">Manager</option>
              <option value="Applicant">Applicant</option>
            </select>

            <button className="mx-1 my-2 py-1 bg-red-400 rounded text-white text-xl hover:bg-red-500/90">
              Register
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
