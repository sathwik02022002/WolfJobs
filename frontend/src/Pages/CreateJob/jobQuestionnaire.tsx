import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function JobQuestionnaire() {
  const location = useLocation();
  const { state } = location;

  const [question1, setQues1] = useState("");
  const [question2, setQues2] = useState("");
  const [question3, setQues3] = useState("");
  const [question4, setQues4] = useState("");

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
        <img src="/images/Vector.png" alt="Vector Image" />
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
          color: "#1E1E1E",
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
          whiteSpace: "nowrap",
        }}
      >
        Application Questions
      </div>

      <div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "756px",
          height: "80px",
          left: "548px",
          top: "246px",
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
            setQues1(e.target.value);
          }}
          value={question1}
          placeholder="Question 1"
        />
      </div>

      <div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "756px",
          height: "80px",
          left: "548px",
          top: "342px",
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
            setQues2(e.target.value);
          }}
          value={question2}
          placeholder="Question 2"
        />
      </div>

      <div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "756px",
          height: "80px",
          left: "548px",
          top: "438px",
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
            setQues3(e.target.value);
          }}
          value={question3}
          placeholder="Question 3"
        />
      </div>

      <div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          width: "756px",
          height: "80px",
          left: "548px",
          top: "534px",
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
            setQues4(e.target.value);
          }}
          value={question4}
          placeholder="Question 4"
        />
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          navigate("/job_preview", {
            state: {
              details: state,
              questions: {
                question1,
                question2,
                question3,
                question4,
              },
            },
          });
        }}
        type="button"
        style={{
          position: "absolute",
          width: "231px",
          height: "50px",
          left: "548px",
          top: "686px",
          background: "#FF5353",
          borderRadius: "10px",
        }}
      >
        <p
          style={{
            position: "absolute",
            width: "231px",
            height: "50px",
            left: "0px",
            top: "13px",
            fontFamily: "Urbanist",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "18px",
            lineHeight: "22px",
            color: "#FFFFFF",
          }}
        >
          Preview
        </p>
      </button>
    </>
  );
}
