import { useState } from "react";

const CreateJob = () => {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [pay, setPay] = useState("");
  const [schedule, setSchedule] = useState("");

  return (
    <>
      <h1>Create Job</h1>
      <br />
      <h2 className="text-xl mx-1">Name</h2>
      <input
        className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        value={name}
      />
      <br />
      <h2 className="text-xl mx-1">Skill</h2>

      <input
        className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
        onChange={(e) => {
          setSkill(e.target.value);
        }}
        type="text"
        value={skill}
      />
      <br />
      <h2 className="text-xl mx-1">Location</h2>
      <input
        className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        type="text"
        value={location}
      />
      <br />
      <h2 className="text-xl mx-1">Description</h2>
      <input
        className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        type="text"
        value={description}
      />
      <br />
      <h2 className="text-xl mx-1">Pay</h2>
      <input
        className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
        onChange={(e) => {
          setPay(e.target.value);
        }}
        type="text"
        value={pay}
      />
      <br />
      <h2 className="text-xl mx-1">Schedule</h2>
      <input
        className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
        onChange={(e) => {
          setSchedule(e.target.value);
        }}
        type="text"
        value={schedule}
      />
      <br />
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Create Job
      </button>
    </>
  );
};

export default CreateJob;
