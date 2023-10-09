import { useState } from "react";
import { InputLabel } from "../../../core/components/inputLabel";

export const CreateJob = () => {
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
      <InputLabel title="Name" />
      <input
        className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
        onChange={(e) => {
          setName(e.target.value);
        }}
        type="text"
        value={name}
      />
      <br />
      <InputLabel title="Skill" />
      <input
        className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
        onChange={(e) => {
          setSkill(e.target.value);
        }}
        type="text"
        value={skill}
      />
      <br />
      <InputLabel title="Location" />
      <input
        className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        type="text"
        value={location}
      />
      <br />
      <InputLabel title="Description" />
      <input
        className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        type="text"
        value={description}
      />
      <br />
      <InputLabel title="Pay" />
      <input
        className="mx-1 bg-slate-100 border decoration-slate-300 px-2 py-1 rounded hover:bg-slate-200/60"
        onChange={(e) => {
          setPay(e.target.value);
        }}
        type="text"
        value={pay}
      />
      <br />
      <InputLabel title="Schedule" />
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
