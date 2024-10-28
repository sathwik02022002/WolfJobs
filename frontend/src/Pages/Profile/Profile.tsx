import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useUserStore } from "../../store/UserStore";
import { useState } from "react";
import ProfileEdit from "./ProfileEdit";

const Profile = () => {
  const name = useUserStore((state) => state.name);
  const email = useUserStore((state) => state.email);
  const address = useUserStore((state) => state.address);
  const role = useUserStore((state) => state.role);
  const skills = useUserStore((state) => state.skills);
  const phonenumber = useUserStore((state) => state.phonenumber);
  const affiliation = useUserStore((state) => state.affiliation);
  const availability = useUserStore((state) => state.availability);
  const gender = useUserStore((state) => state.gender);
  const hours = useUserStore((state) => state.hours);
  const resume = useUserStore((state) => state.resume);

  const [editMode, setEditMode] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.6)", height: "calc(100vh - 72px)" }}
    >
      <div
        className="relative flex flex-col p-6 overflow-y-auto bg-white rounded-xl shadow-lg"
        style={{ width: "90%", maxWidth: "700px", maxHeight: "85vh" }}
      >
        <div className="absolute top-4 right-4 cursor-pointer">
          {editMode ? (
            <AiOutlineClose
              onClick={() => setEditMode(false)}
              className="text-xl text-gray-600 hover:text-gray-800"
            />
          ) : (
            <BiSolidPencil
              onClick={() => setEditMode(true)}
              className="text-xl text-gray-600 hover:text-gray-800"
            />
          )}
        </div>
        <div className="my-4 text-2xl font-semibold border-b">Profile</div>
        {!editMode ? (
          <>
            <ProfileDetail label="Name" value={name} />
            <ProfileDetail label="Email" value={email} />
            <ProfileDetail label="Role" value={role} />
            <ProfileDetail label="Address" value={address} />
            <ProfileDetail label="Skills" value={skills} />
            <ProfileDetail label="Phone Number" value={phonenumber} />
            <ProfileDetail label="Affiliation" value={affiliation} />
            <ProfileDetail label="Availability" value={availability} />
            <ProfileDetail label="Gender" value={gender} />
            <ProfileDetail label="Resume" value={resume} />
          </>
        ) : (
          <ProfileEdit
            props={{
              name,
              email,
              address,
              role,
              skills,
              phonenumber,
              affiliation,
              availability,
              gender,
              hours,
            }}
          />
        )}
      </div>
    </div>
  );
};

// Helper component to display each profile detail
const ProfileDetail = ({ label, value }) => (
  <div className="my-2">
    <span className="text-lg font-medium">{label}: </span>
    <span className="text-gray-600">{value || " -- "}</span>
  </div>
);

export default Profile;
