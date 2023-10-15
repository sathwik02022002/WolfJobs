import { useState } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "../../store/UserStore";

const CreateJob = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [pay, setPay] = useState("");
  const [type, setType] = useState("");


  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          position: "absolute",
          width: "767px",
          height: "0px",
          left: "40px",
          top: "500px",
          border: "1px solid #DFDFDF",
          transform: "rotate(90deg)",
          borderRight: "2px solid #000",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          width: "276px",
          height: "36px",
          left: "48px",
          top: "154px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "24px",
          lineHeight: "36px",
          color: "#000000",
        }}
      >
        Create New Job Listing
      </div>

      <p
        style={{
          position: "absolute",
          height: "20px",
          left: "3.33%",
          right: "95.28%",
          top: "54%",
          transform: "translateY(-50%)",
          marginTop: "-135.5px",
          background: "white",
        }}
      >
        <img src="/images/Vector.png" alt="Vector Image" />
      </p>
      <div
        style={{
          position: "absolute",
          width: "81px",
          height: "19px",
          left: "80px",
          top: "232px",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "19px",
          color: "#1E1E1E",
        }}
      >
        Add Details
      </div>

      <p
        style={{
          position: "absolute",
          height: "20px",
          left: "3.33%",
          right: "95.28%",
          top: "60%",
          transform: "translateY(-50%)",
          marginTop: "-135.5px",
          background: "white",
        }}
      >
        <img src="/images/Vector2.png" alt="Vector Image" />
      </p>
      <div
        style={{
          position: "absolute",
          width: "109px",
          height: "19px",
          left: "80px",
          top: "272px",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "19px",
          color: "#CBCBCB",
          whiteSpace: "nowrap",
        }}
      >
        Fill Questionnaire
      </div>

      <p
        style={{
          position: "absolute",
          height: "20px",
          left: "3.33%",
          right: "95.28%",
          top: "65.5%",
          transform: "translateY(-50%)",
          marginTop: "-135.5px",
          background: "white",
        }}
      >
        <img src="/images/Vector2.png" alt="Vector Image" />
      </p>
      <div
        style={{
          position: "absolute",
          width: "109px",
          height: "19px",
          left: "80px",
          top: "312px",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "19px",
          color: "#CBCBCB",
          whiteSpace: "nowrap",
        }}
      >
        Preview
      </div>

      <p
        style={{
          position: "absolute",
          height: "20px",
          left: "3.33%",
          right: "95.28%",
          top: "71.5%",
          transform: "translateY(-50%)",
          marginTop: "-135.5px",
          background: "white",
        }}
      >
        <img src="/images/Vector2.png" alt="Vector Image" />
      </p>
      <div
        style={{
          position: "absolute",
          width: "109px",
          height: "19px",
          left: "80px",
          top: "352px",
          fontFamily: "Urbanist",
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: "16px",
          lineHeight: "19px",
          color: "#CBCBCB",
          whiteSpace: "nowrap",
        }}
      >
        Confirm
      </div>

      <div
        style={{
          position: "absolute",
          width: "138px",
          height: "36px",
          left: "548px",
          top: "154px",
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "24px",
          lineHeight: "36px",
          color: "#000000",
        }}
      >
        Add Details
      </div>

      <div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "344px",
          height: "50px",
          left: "548px",
          top: "220px",
          background: "#FFFFFF",
          border: "1px solid #CBCBCB",
          borderRadius: "10px",
        }}
      >
        <input
          style={{
            position: "absolute",
            width: "300px",
            height: "40px",
            left: "10px",
            top: "2px",
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "19px",
            color: "black",
          }}
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          placeholder="Job Role"
        />
      </div>

      <div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "344px",
          height: "50px",
          left: "548px",
          top: "289px",
          background: "#FFFFFF",
          border: "1px solid #CBCBCB",
          borderRadius: "10px",
        }}
      >
        <select
          style={{
            position: "absolute",
            width: "300px",
            height: "40px",
            left: "10px",
            top: "2px",
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "19px",
            color: type ? "black" : "#999",
          }}
          onChange={(e) => {
            setType(e.target.value);
          }}
          value={type}
        >
          <option value="" disabled selected hidden>
            Job Type
          </option>
          <option value="full-time">Full-Time</option>
          <option value="parttime">Part-Time</option>
        </select>
      </div>

      <div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "344px",
          height: "50px",
          left: "548px",
          top: "357px",
          background: "#FFFFFF",
          border: "1px solid #CBCBCB",
          borderRadius: "10px",
        }}
      >
        <input
          style={{
            position: "absolute",
            width: "300px",
            height: "40px",
            left: "10px",
            top: "2px",
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "19px",
            color: "black",
          }}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          value={location}
          placeholder="Location"
        />
      </div>

      <div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "344px",
          height: "50px",
          left: "548px",
          top: "425px",
          background: "#FFFFFF",
          border: "1px solid #CBCBCB",
          borderRadius: "10px",
        }}
      >
        <input
          style={{
            position: "absolute",
            width: "300px",
            height: "40px",
            left: "10px",
            top: "2px",
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "19px",
            color: "black",
          }}
          onChange={(e) => {
            setPay(e.target.value);
          }}
          value={pay}
          placeholder="Pay"
        />
      </div>

      <div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "344px",
          height: "233px",
          left: "548px",
          top: "494px",
          background: "#FFFFFF",
          border: "1px solid #CBCBCB",
          borderRadius: "10px",
        }}
      >
        <input
          style={{
            position: "absolute",
            width: "300px",
            height: "40px",
            left: "10px",
            top: "2px",
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "19px",
            color: "black",
          }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          placeholder="Job Description"
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          navigate("/job_questionnaire", {
            state: {
              name,
              location,
              description,
              pay,
              type,
            },
          });
        }}
        type="button"
        style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "344px",
          height: "50px",
          left: "548px",
          top: "747px",
          background: "#FFFFFF",
          border: "1px solid #FF5353",
          borderRadius: "10px",
        }}
      >
        <p
          style={{
            position: "absolute",
            width: "300px",
            height: "40px",
            left: "10px",
            top: "10px",
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "22px",
            color: "#FF5353",
          }}
        >
          Proceed
        </p>
      </button>
    </>
  );
};

export default CreateJob;
