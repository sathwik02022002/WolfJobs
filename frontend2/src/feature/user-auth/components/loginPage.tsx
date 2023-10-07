import { InputLabel } from "../../../core/forms/inputRow";
import { InputBox } from "../../../core/primities/inputBox";

export function LoginPage() {
  return (
    <>
      <div className="w-full pt-4 bg-slate-200">
        <div className="p-4 m-1 flex flex-col  w-96 mx-auto my-auto border rounded">
          <div className="flex text-4xl justify-center text-red-400 mb-2 ">
            Login
          </div>
          <InputLabel title="Email" />
          <InputBox />

          <InputLabel title="Password" />
          <InputBox />
          <button className="mx-1 my-2 py-1 bg-red-400 rounded text-white text-xl hover:bg-red-500/90">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
