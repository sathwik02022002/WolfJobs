import { InputRow } from "../../../core/forms/inputRow";

export function RegistrationPage() {
  return (
    <>
      <div className="w-full pt-4">
        <div className="p-4 m-1 flex flex-col  w-96 mx-auto my-auto border rounded">
          <div className="flex text-4xl justify-center text-red-400 mb-2 ">
            Registration
          </div>
          <InputRow title="Name" />
          <InputRow title="Email" />
          <InputRow title="Password" />
          <InputRow title="Confirm Password" />
          <InputRow title="Role" />

          <button className="mx-1 my-2 py-1 bg-red-400 rounded text-white text-xl hover:bg-red-500/90">
            Register
          </button>
        </div>
      </div>
    </>
  );
}
